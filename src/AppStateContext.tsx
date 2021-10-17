import React, {createContext, useContext, useReducer} from "react"
import {findItemIndexById} from "./utils/findItemIndexById";
import {v4 as uuidv4} from 'uuid';
import { moveItem } from "./utils/moveItem";
import { DragItem } from "./DragItem";

interface Task {
    id: string
    text: string
}

interface List {
    id: string
    text: string
    tasks: Task[]
}

interface AppState {
    lists: List[]
    draggedItem: DragItem | undefined
}

interface AppStateContextProps {
    state: AppState
    dispatch: any
}

//The technique we are using here is called discriminated union.
//Each interface has a type property. This property will be our discriminant. It means
//that Typescript can look at this property and tell what will be the other fields of the
//interface.

type Action =
    | {
        type: "ADD_LIST"
        payload: string
}
    | {
        type: "ADD_TASK"
        payload: {
            text: string
            taskId: string
        }
    }
    | {
        type: "MOVE_LIST"
        payload: {
            dragIndex: number
            hoverIndex: number
        }
    }
    | {
        type: "SET_DRAGGED_ITEM"
        payload: DragItem | undefined
    }

//React wants us to provide the default value for our context. This value will only
//be used if we don't wrap our application into our AppStateProvider. So we can
//omit it. To do it pass an empty object that we'll cast to AppStateContextProps to
//createContext function. Here we use an as operator to make Typescript think that
//our empty object actually has AppStateContextProps type:

const AppStateContext = createContext<AppStateContextProps>({} as AppStateContextProps)

const appData: AppState = {
    lists: [
        {
            id: "0",
            text: "To Do",
            tasks: [{id: "c0", text: "Generate app scaffold"}]
        },
        {
            id: "1",
            text: "In Progress",
            tasks: [{id: "c2", text: "Learn Typescript"}]
        },
        {
            id: "2",
            text: "Done",
            tasks: [{id: "c3", text: "Begin to use static typing"}]
        }
    ],
    draggedItem: undefined
}
//
const appStateReducer = (state: AppState, action: Action): AppState => {
    switch (action.type) {
        case "ADD_LIST": {
// Reducer logic here...
            return {
                ...state,
                lists: [
                    ...state.lists,
                    {id: uuidv4(), text: action.payload, tasks: []}
                ]
            }
        }
        case "ADD_TASK": {
            const targetLaneIndex = findItemIndexById(
                state.lists,
                action.payload.taskId
            )
            state.lists[targetLaneIndex].tasks.push({
                id: uuidv4(),
                text: action.payload.text
            })
            return {
                ...state
            }
        }
        case "MOVE_LIST": {
            const { dragIndex, hoverIndex } = action.payload
            state.lists = moveItem(state.lists, dragIndex, hoverIndex)
            return { ...state }
        }
        case "SET_DRAGGED_ITEM": {
            return { ...state, draggedItem: action.payload }
        }
        default: {
            return state
        }
    }
}

//We use React.propsWithChildren type.
//It requires one generic argument, but we don't want to have any other props
//so we pass an empty object to it.

export const AppStateProvider = ({children}: React.PropsWithChildren<{}>) => {
    const [state, dispatch] = useReducer(appStateReducer, appData)

    return (
        <AppStateContext.Provider value={{state, dispatch}}>
            {children}
        </AppStateContext.Provider>
    )
}

export const useAppState = () => {
    return useContext(AppStateContext)
}