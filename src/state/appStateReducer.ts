import { Action } from './actions'
import { v4 as uuidv4 } from 'uuid';
import { moveItem } from '../utils/moveItem';
import { findItemIndexById } from '../utils/arrayUtils';
import { DragItem } from '../DragItem';

export interface Task {
  id: string
  text: string
}

export interface List {
  id: string
  text: string
  tasks: Task[]
}

export interface AppState {
  lists: List[]
  draggedItem: DragItem | null
}


// Here we call the state a draft, because we are using Immer and we’ll mutate this
// object directly. This way we remind ourselves that it is not a regular reducer state
// and we don’t have to worry about the immutability.
export const appStateReducer = (draft: AppState, action: Action): AppState | void => {
  switch (action.type) {
    case 'ADD_LIST': {
      draft.lists.push( { id: uuidv4(), text: action.payload, tasks: [] } )
      break
    }
    case 'ADD_TASK': {
      const { text, listId } = action.payload
      const targetListIndex = findItemIndexById( draft.lists, listId )

      draft.lists[targetListIndex].tasks.push( {
        id: uuidv4(),
        text,
      } )
      break
    }
    case 'MOVE_LIST': {
      const { draggedId, hoverId } = action.payload
      const dragIndex = findItemIndexById( draft.lists, draggedId )
      const hoverIndex = findItemIndexById( draft.lists, hoverId )
      draft.lists = moveItem( draft.lists, dragIndex, hoverIndex )
      break
    }
    case 'SET_DRAGGED_ITEM': {
      draft.draggedItem = action.payload
      break
    }
    // default: {
    //   return draft
    // }
  }
}
