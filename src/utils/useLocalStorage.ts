import * as React from 'react';
import { AppState } from '../state/appStateReducer';

type useLocalStorageType = (a: string, b: AppState) => [ AppState, React.Dispatch<React.SetStateAction<AppState>> ];

export const useLocalStorage: useLocalStorageType = (storageKey, fallbackState) => {
  const [ value, setValue ] = React.useState<AppState>( () => {
      const jsonValue = localStorage.getItem( storageKey )
      if ( jsonValue != null ) return JSON.parse( jsonValue )
      return fallbackState
    },
  );

  React.useEffect( () => {
    localStorage.setItem( storageKey, JSON.stringify( value ) );
  }, [ value, storageKey ] );

  return [ value, setValue ];
};