import React, { useEffect, useState } from 'react'
import { AppState } from './state/appStateReducer'
import { load } from './api';
import { FlexContainer, Spinner } from './styles';

type InjectedProps = {
  initialState: AppState
}

type PropsWithoutInjected<TBaseProps> = Omit<TBaseProps,
  keyof InjectedProps>

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
  draggedItem: null,
}

//We removed the injected props, and then added them back. This might look tautological,
// but it is necessary to let TypeScript know that the wrapped component will accept the
// InjectedProps. TypeScript is very cautious with generic types and if we wouldn't
// perform this trick it wouldn't let us pass the fields defined in the InjectedProps type
// to our component.

export function withInitialState<TProps>(
  WrappedComponent: React.ComponentType<PropsWithoutInjected<TProps> & InjectedProps>,
){
  return (props: PropsWithoutInjected<TProps>) => {
    const [ initialState, setInitialState ] = useState<AppState>( {
      lists: [],
      draggedItem: null,
    } )

    const [ isLoading, setIsLoading ] = useState( true )
    const [ error, setError ] = useState<Error | undefined>()

    useEffect( () => {
      const fetchInitialState = async () => {
        try {
          const data = await load()
          setInitialState( data )
        } catch (e) {
          setInitialState( appData )
          /*if ( e instanceof Error ) {
            setError( e )
          }*/
        }
        setIsLoading( false )
      }
      fetchInitialState()
    }, [] )

    if ( isLoading ) {
      return <FlexContainer><Spinner/></FlexContainer>
    }

    if ( error ) {
      return <div>{ error.message }</div>
    }

    return <WrappedComponent { ...props } initialState={ initialState }/>
  }
}