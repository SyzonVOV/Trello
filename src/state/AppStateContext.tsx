import React, { createContext, useContext } from 'react'
import { useImmerReducer } from 'use-immer'
import { Action } from './actions';
import { AppState, appStateReducer, List, Task } from './appStateReducer';
import { DragItem } from '../DragItem';


type AppStateContextProps = {
  lists: Array<List>
  draggedItem: DragItem | null
  getTasksByListId(id: string): Array<Task>
  dispatch: React.Dispatch<Action>
}

const appData: AppState = {
  lists: [
    {
      id: '0',
      text: 'To Do',
      tasks: [ { id: 'c0', text: 'Generate app scaffold' } ],
    },
    {
      id: '1',
      text: 'In Progress',
      tasks: [ { id: 'c2', text: 'Learn Typescript' } ],
    },
    {
      id: '2',
      text: 'Done',
      tasks: [ { id: 'c3', text: 'Begin to use static typing' } ],
    },
  ],
  draggedItem: null
}

//React wants us to provide the default value for our context. This value will only
//be used if we don't wrap our application into our AppStateProvider. So we can
//omit it. To do it pass an empty object that we'll cast to AppStateContextProps to
//createContext function. Here we use an as operator to make Typescript think that
//our empty object actually has AppStateContextProps type:
const AppStateContext = createContext<AppStateContextProps>( {} as AppStateContextProps )

//We use React.propsWithChildren type.
//It requires one generic argument, but we don't want to have any other props
//so we pass an empty object to it.

export const AppStateProvider = ({ children }: React.PropsWithChildren<{}>) => {

  const [ state, dispatch ] = useImmerReducer( appStateReducer, appData )
  const { draggedItem, lists } = state

  const getTasksByListId = (id: string) => {
    return lists.find( (list) => list.id === id )?.tasks || []
  }
  return (
    <AppStateContext.Provider value={ { draggedItem, lists, getTasksByListId, dispatch } }>
      { children }
    </AppStateContext.Provider>
  )
}

export const useAppState = () => {
  return useContext( AppStateContext )
}