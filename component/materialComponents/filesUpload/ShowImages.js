import React from 'react'
import styles from '../../admin/CrudComponent/product/product.module.scss'
import { CSS } from "@dnd-kit/utilities"
import {
    useSortable,
  } from "@dnd-kit/sortable"

const ShowImages = ({ image, id }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition
    } = useSortable({ id: image })
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    }

    return (
        <div key={id} ref={setNodeRef} style={style} {...listeners} {...attributes}>
            <div className={`${styles.image}`}>
                <img src={image} className="img-fluid" />
            </div>
        </div>
    )
}

export default ShowImages