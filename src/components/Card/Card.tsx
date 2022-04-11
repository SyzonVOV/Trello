import React from 'react'
import { CardContainer } from '../../styles'
import { ICardProps } from './Card.props';


export const Card = ({ text }: ICardProps): JSX.Element => {
  return <CardContainer>{text}</CardContainer>
}