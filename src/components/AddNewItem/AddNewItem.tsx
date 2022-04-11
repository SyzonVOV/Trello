import React, { useState } from 'react'
import { AddItemButton } from '../../styles'
import { NewItemForm } from '../NewItemForm/';
import { IAddNewItemProps } from './AddNewItem.props';

export const AddNewItem = (props: IAddNewItemProps): JSX.Element => {
  const [ showForm, setShowForm ] = useState( false );
  const { onAdd, toggleButtonText, dark } = props;
  if ( showForm ) {
    return (
      <NewItemForm
        onAdd={ text => {
          onAdd( text )
          setShowForm( false )
        } }/>
    )
  }

  return (
    <AddItemButton
      dark={ dark }
      onClick={ () => setShowForm( true ) }
    >
      { toggleButtonText }
    </AddItemButton>
  )
}