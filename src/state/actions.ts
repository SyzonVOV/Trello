import { DragItem } from '../DragItem';


//The technique we are using here is called discriminated union.
//Each interface has a type property. This property will be our discriminant. It means
//that Typescript can look at this property and tell what will be the other fields of the
//interface.
export type Action =
  | {
  type: 'ADD_LIST'
  payload: string
}
  | {
  type: 'ADD_TASK'
  payload: {
    text: string
    listId: string
  }
}
  | {
  type: 'MOVE_LIST'
  payload: {
    draggedId: string
    hoverId: string
  }
}
  | {
  type: 'SET_DRAGGED_ITEM'
  payload: DragItem | null
}
  | {
  type: 'MOVE_TASK'
  payload: {
    draggedItemId: string
    hoveredItemId: string | null
    sourceColumnId: string
    targetColumnId: string
  }
}
| {
  type: 'DEL_ITEM'
  payload: {
    listId: string
    itemId: string
  }
}


export const addTask = (text: string, listId: string): Action => ({
  type: 'ADD_TASK',
  payload: {
    text,
    listId,
  },
})

export const addList = (text: string): Action => ({
  type: 'ADD_LIST',
  payload: text,
})

export const moveList = (draggedId: string, hoverId: string): Action => ({
  type: 'MOVE_LIST',
  payload: {
    draggedId,
    hoverId,
  },
})

export const setDraggedItem = (draggedItem: DragItem | null): Action => ({
  type: 'SET_DRAGGED_ITEM',
  payload: draggedItem,
})

export const moveTask = (
  draggedItemId: string,
  hoveredItemId: string | null,
  sourceColumnId: string,
  targetColumnId: string,
): Action => ({
  type: 'MOVE_TASK',
  payload: {
    draggedItemId,
    hoveredItemId,
    sourceColumnId,
    targetColumnId,
  },
})

export const removeItem = (listId: string, itemId: string): Action => ({
  type: 'DEL_ITEM',
  payload: {
    listId,
    itemId
  },
})