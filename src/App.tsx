import React from 'react'
import { AppContainer } from './styles'
import { Column } from './components/Column/';
import { AddNewItem } from './components/AddNewItem/';
import { useAppState } from './state/AppStateContext';
import { addList } from "./state/actions"
import { CustomDragLayer } from './CustomDragLayer';

const App = () => {
  const { lists , dispatch } = useAppState()

  return (
    <AppContainer>
      <CustomDragLayer />
      { lists.map( (list) => (
        <Column text={ list.text } key={ list.id } id={ list.id }/>
      ) ) }
      <AddNewItem
        toggleButtonText="+ Add another list"
        onAdd={(text) => dispatch(addList(text))}
      />
    </AppContainer>
  )
}

export default App;