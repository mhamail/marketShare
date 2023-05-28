import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router';
//action
import { isAuth, getCookie } from '../../actions/auth';
import { productRating } from '../../actions/product';

import StarRatings from 'react-star-ratings';

const StarRatingsComponent = ({ ratings, _id, refreshPage, toast }) => {
    const router = useRouter()
    const token = getCookie("token")
    const [rating, setRating] = useState(0)

    useEffect(() => {
        if (ratings && ratings.length > 0 && isAuth()) {
            let existingRatingObject = ratings.find(
                (ele) => ele.postedBy === isAuth()._id)
            if (existingRatingObject) {
                setRating(existingRatingObject.star)
            }
        }
    }, [isAuth()])

    const handleRating = (rate, productId) => {
        isAuth() ?
            productRating(productId, rate, token)
                .then(res => {
                    refreshPage()
                    setRating(rate)
                })
                .catch(err => console.log(err))
            :
            <>
                {toast.error("sigin to rating")}
                {router.push({
                    pathname: "/auth/signin",
                    query: { from: `/shop/${router.query.slug}` }
                })}
            </>
    }
    return (
        <StarRatings
            rating={rating}
            starEmptyColor=""
            starRatedColor="red"
            changeRating={handleRating}
            numberOfStars={5}
            name={_id}
            starDimension="15px"
        />
    )
}

export default StarRatingsComponent