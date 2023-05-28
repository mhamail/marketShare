import React from 'react'
import StarRatings from 'react-star-ratings';

export const AverageRating = (product) => {
    if (product && product.ratings) {
        let ratings = product.ratings.length && product.ratings
        let length = ratings.length;
        let total = [];
        ratings.map((item) => total.push(item.star));
        let totalReduced = total.reduce((accum, item) => accum + item, 0);

        let average = totalReduced / length
    
    return (
        <div>
            <StarRatings
                rating={average}
                starRatedColor="red"
                numberOfStars={5}
                starDimension="30px"
            />
            {" "}
            ({length})
        </div>
    )
}
}
