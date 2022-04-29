import React, { useRef, useState } from 'react'
import { CardContainer, StyledSVGPencil, StyledSVGTrash } from '../../styles'
import { ICardProps } from './Card.props';
import { useAppState } from '../../state/AppStateContext';
import { isHidden } from '../../utils/isHidden';
import { useItemDrag } from '../../utils/useItemDrag';
import { useDrop } from 'react-dnd';
import { moveTask, removeItem, setDraggedItem } from '../../state/actions';
import { throttle } from 'throttle-debounce-ts';


export const Card = ({ text, id, columnId, isPreview }: ICardProps): JSX.Element => {
  const [show, setShow] = useState(false);
  const { draggedItem, dispatch } = useAppState()
  const ref = useRef<HTMLDivElement>( null )

  const { drag } = useItemDrag( {
    type: 'CARD',
    id,
    text,
    columnId,
  } )

  const [ , drop ] = useDrop( {
    accept: 'CARD',
    hover: throttle( 200, () => {
      if ( !draggedItem ) {
        return
      }
      if ( draggedItem.type !== 'CARD' ) {
        return
      }
      if ( draggedItem.id === id ) {
        return
      }

      dispatch(
        moveTask( draggedItem.id, id, draggedItem.columnId, columnId ),
      )
      dispatch( setDraggedItem( { ...draggedItem, columnId } ) )
    } ),
  } )

  drag(drop(ref))

  const handleShowEdit = () => {
    setShow( (prev) => !prev);
  }

  const handleDelete = (listId: string, itemId: string) => () => {
    console.log(`listId => ${listId}`);
    console.log(`itemId => ${itemId}`);
    dispatch(removeItem(listId, itemId))
  }

  return (
    <CardContainer
      isHidden={ isHidden( draggedItem, 'CARD', id, isPreview ) }
      isPreview={ isPreview }
      ref={ ref }
      onPointerEnter={handleShowEdit}
      onPointerLeave={handleShowEdit}
    >
      { text }
      { show && <div>
        <StyledSVGPencil/>
        <StyledSVGTrash onClick={handleDelete(columnId, id)}/>
      </div> }
    </CardContainer>
  )
}