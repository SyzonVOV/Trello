import styled, { keyframes } from 'styled-components'
import {ReactComponent as Pencil} from './assets/images/pencil.svg';
import {ReactComponent as Trash} from './assets/images/trash.svg';

interface AddItemButtonProps {
  dark?: boolean
}

interface DragPreviewContainerProps {
  isHidden?: boolean
  isPreview?: boolean
}

type DragPreviewWrapperProps = {
  position: {
    x: number
    y: number
  }
}

export const DragPreviewContainer = styled.div<DragPreviewContainerProps>`
  transform: ${ (props) =>
          props.isPreview ? 'rotate(5deg)' : undefined };
  opacity: ${ props => (props.isHidden ? 0 : 1) };
`

export const AppContainer = styled.div`
  align-items: flex-start;
  background-color: #3179ba;
  display: flex;
  flex-direction: row;
  height: 100%;
  padding: 20px;
  width: 100%;
`

export const ColumnContainer = styled( DragPreviewContainer )`
  background-color: #ebecf0;
  width: 300px;
  min-height: 40px;
  margin-right: 20px;
  border-radius: 3px;
  padding: 8px 8px;
  flex-grow: 0;
`

export const ColumnTitle = styled.div`
  padding: 6px 16px 12px;
  font-weight: bold;
`

export const CardContainer = styled( DragPreviewContainer )`
  display: flex;
  justify-content: space-between;
  background-color: #fff;
  cursor: pointer;
  margin-bottom: 0.5rem;
  padding: 0.5rem 1rem;
  max-width: 300px;
  border-radius: 3px;
  box-shadow: #091e4240 0 1px 0 0;
`

export const AddItemButton = styled.button<AddItemButtonProps>`
  background-color: #ffffff3d;
  border-radius: 3px;
  border: none;
  color: ${ props => (props.dark ? '#000' : '#fff') };
  cursor: pointer;
  max-width: 300px;
  padding: 10px 12px;
  text-align: left;
  transition: background 85ms ease-in;
  width: 100%;

  &:hover {
    background-color: #ffffff52;
  }
`

export const NewItemFormContainer = styled.div`
  max-width: 300px;
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: flex-start;
`

export const NewItemButton = styled.button`
  background-color: #5aac44;
  border-radius: 3px;
  border: none;
  box-shadow: none;
  color: #fff;
  padding: 6px 12px;
  text-align: center;
`

export const NewItemInput = styled.input`
  border-radius: 3px;
  border: none;
  box-shadow: #091e4240 0 1px 0 0;
  margin-bottom: 0.5rem;
  padding: 0.5rem 1rem;
  width: 100%;
`

export const CustomDragLayerContainer = styled.div`
  height: 100%;
  left: 0;
  pointer-events: none;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 100;
`

export const DragPreviewWrapper = styled.div.attrs<DragPreviewWrapperProps>(
  ({ position: { x, y } }) => ({
    style: {
      transform: `translate(${ x }px, ${ y }px)`,
    },
  }),
)<DragPreviewWrapperProps>``

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const FlexContainer = styled.div`
  display: flex;
  
  width: 100vw;
  height: 100vh;
  
  align-items: center;
  justify-content: center;
`

export const Spinner = styled.div`
  animation: ${ rotate360 } 1s linear infinite;
  transform: translateZ(0);

  border-top: 2px solid hsl(190deg 70% 80%);;
  border-right: 2px solid hsl(190deg 70% 80%);;
  border-bottom: 2px solid hsl(190deg 70% 80%);
  border-left: 4px solid hsl(190deg 60% 40%);
  background: transparent;
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;
// todo: create buttons instead of SVG for semantic reasons
export const StyledSVGPencil = styled(Pencil)`
  width: 16px;
  height: 16px;
  fill: #8c8c8c;

  &:hover {
    fill: #333333;
  }
`;

export const StyledSVGTrash = styled(Trash)`
  margin-left: 0.2em;
  width: 16px;
  height: 16px;
  fill: #b33636;
  &:hover {
    fill: darkred;
  }
`;