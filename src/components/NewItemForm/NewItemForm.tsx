import React, { useState } from 'react'
import { NewItemButton, NewItemFormContainer, NewItemInput } from '../../styles'
import { useFocus } from '../../utils/useFocus'
import { INewItemFormProps } from './NewItemForm.props'

export const NewItemForm = ({ onAdd }: INewItemFormProps) => {
  const [ text, setText ] = useState( '' )
  const handleAddText = (ev: React.KeyboardEvent<HTMLInputElement>) => {
    if ( ev.key === 'Enter' ) {
      onAdd( text )
    }
  }
  const inputRef = useFocus()
  return (
    <NewItemFormContainer>
      <NewItemInput
        ref={ inputRef }
        value={ text }
        onChange={ e => setText( e.target.value ) }
        onKeyPress={handleAddText}
      />
      <NewItemButton onClick={ () => onAdd( text ) }>
        Create
      </NewItemButton>
    </NewItemFormContainer>
  )
}

