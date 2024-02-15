import React from 'react'
import { img_300, unavailable } from '../config/config.js'
import ContentModal from './ContentModal/ContentModal.tsx'
import '../styles//Card.scss'
import { Badge } from '@mui/material'

const CardItem = (props) => {
    return (
        <ContentModal contentStyle="card" type={props.type} id={props.id} faves={props.faves}>
            <Badge badgeContent={props.rating} color={props.rating>6 ? 'primary':'secondary'} />
            <img src={props.poster ? `${img_300}${props.poster}`: unavailable}  alt='' className="poster"/>
                <h2>{props.title}</h2>
                <div className="card-footer">
                    <span className="span-dark">{props.type}</span>
                    <span className="span-dark">{props.release_date}</span>
                </div>
        </ContentModal>
    )
}

export default CardItem
