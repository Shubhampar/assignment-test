import React from 'react'
import Style from '../Styles/Card.module.css'
import { Heading } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

function Card({title,body,id}) {
  const Navigate= useNavigate()
  return (
    <div className={Style.cardWrapper} onClick={()=>Navigate(`/Post/${id}`)}>
        <Heading as='h4' size='md'  className={Style.cardTitle}>{title}</Heading>
        <p  className={Style.cardDesc}>{body}</p>
    </div>
  )
}

export default Card
