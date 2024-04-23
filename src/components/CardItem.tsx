import React from 'react'
import { img_300, unavailable } from '../config/config.ts'
import ContentModal from './ContentModal/ContentModal.tsx'
import '../styles//Card.scss'
import { Badge, Skeleton } from '@mui/material'

interface Props{
    key: number;
    poster: string;
    title: string;
    summary: string;
    release_date: string;
    rating: number;
    faves: any;
    type: string;
    isSearch?: boolean;
    id: number;
}
const CardItem = (props: Props) => {
    return (
        <ContentModal contentStyle="card" type={props.type} id={props.id} title={props.title} faves={props.faves} isSearch={props.isSearch}>
            {props.rating && (<Badge badgeContent={props.rating} color={props.rating>6 ? 'primary':'secondary'} />)}
            {props.title ? 
                (<img src={props.poster ? `${img_300}${props.poster}`: unavailable} alt='' className="poster"/>): 
                (<Skeleton variant="rectangular" height={250}/> )}
            {props.title ? (<h2>{props.title}</h2>): (<Skeleton height={80} />)}
            {props.title ? 
                (<div className="card-footer">
                    <span className="span-dark film-type">{props.type}</span>
                    <span className="span-dark">{props.release_date}</span>
                </div>): (<Skeleton height={40}/>)}
        </ContentModal>
    )
}

export default CardItem
