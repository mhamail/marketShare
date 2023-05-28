import React from 'react'
import { Skeleton } from 'antd';

const SkeletonCard = ({count,column}) => {
    const cards = () => {
        let totalCards = [];
        for (let i = 0; i < count; i++) {
            totalCards.push(
                <div className={`col-lg-${column} mb-4 shadow`} key={i}>
                    <Skeleton active />
                </div>
            )
        }
        return totalCards
    }
    return <div className='row'>{cards()}</div>
}

export default SkeletonCard