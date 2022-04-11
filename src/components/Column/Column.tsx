import React, { useRef } from 'react'
import { useDrop } from 'react-dnd'
import { throttle } from 'throttle-debounce-ts'

import { ColumnContainer, ColumnTitle } from '../../styles'
import { IColumnProps } from './Column.props';
import { Card } from '../Card/';
import { AddNewItem } from '../AddNewItem';

import { useAppState } from '../../state/AppStateContext';
import { addTask, moveList } from '../../state/actions';
import { useItemDrag } from '../../utils/useItemDrag';
import { isHidden } from '../../utils/isHidden';


export const Column = ({ text, id, isPreview }: IColumnProps): JSX.Element => {
  const { draggedItem, getTasksByListId, dispatch } = useAppState()
  const tasks = getTasksByListId( id )
  const ref = useRef<HTMLDivElement>( null )
  const [ , drop ] = useDrop( {
    accept: 'COLUMN',
    hover: throttle( 200, () => {
      if ( !draggedItem ) return

      if ( draggedItem.type === 'COLUMN' ) {
        if ( draggedItem.id === id ) return

        dispatch( moveList( draggedItem.id, id ) )
      }
    } ),
  } )

  const { drag } = useItemDrag( { type: 'COLUMN', id, text } )

  drag( drop( ref ) )
  return (
    <ColumnContainer
      ref={ ref }
      isPreview={ isPreview }
      isHidden={ isHidden( draggedItem, 'COLUMN', id, isPreview ) }
    >
      <ColumnTitle>{ text }</ColumnTitle>
      { tasks.map( (task) => (
        <Card text={ task.text } key={ task.id } id={ task.id }/>
      ) ) }
      <AddNewItem
        toggleButtonText="+ Add another card"
        onAdd={ (text) => dispatch( addTask( text, id ) ) }
        dark
      />
    </ColumnContainer>
  )
}