import { Action } from './actions'
import { v4 as uuidv4 } from 'uuid';
import { moveItem } from '../utils/moveItem';
import { findItemIndexById, removeItemAtIndex } from '../utils/arrayUtils';
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
    case 'MOVE_TASK': {
      const {
        draggedItemId,
        hoveredItemId,
        sourceColumnId,
        targetColumnId,
      } = action.payload;

      const sourceListIndex = findItemIndexById(
        draft.lists,
        sourceColumnId,
      );

      const targetListIndex = findItemIndexById(
        draft.lists,
        targetColumnId,
      );

      const dragIndex = findItemIndexById(
        draft.lists[sourceListIndex].tasks,
        draggedItemId,
      )
      // ...
      const hoverIndex = hoveredItemId
        ? findItemIndexById(
          draft.lists[targetListIndex].tasks,
          hoveredItemId,
        )
        : 0

      const item = draft.lists[sourceListIndex].tasks[dragIndex]

      // Remove the task from the source list
      draft.lists[sourceListIndex].tasks.splice( dragIndex, 1 )

      // Add the task to the target list
      draft.lists[targetListIndex].tasks.splice( hoverIndex, 0, item )

      break
    }
    case 'SET_DRAGGED_ITEM': {
      draft.draggedItem = action.payload
      break
    }
    case 'DEL_ITEM': {
      const indexList = findItemIndexById( draft.lists, action.payload.listId )
      const indexItem = findItemIndexById( draft.lists[indexList].tasks, action.payload.itemId )
      draft.lists[indexList].tasks = removeItemAtIndex(draft.lists[indexList].tasks, indexItem)
      break;
    }
    // default: {
    //   return draft
    // }
  }
}
