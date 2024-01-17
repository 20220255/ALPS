import React, { useContext, useEffect, useState } from 'react'
import FeedbackContext from '../context/FeedbackContext'

function PointsSelect({selectRating, myRating, maxRating = 5 }) {

    const { editedFeedback } = useContext(FeedbackContext)

    const [selected, setSelected] = useState()      

    useEffect(() => {
        setSelected(editedFeedback.item.rating)
    }, [editedFeedback])

    useEffect(() => {
        setSelected(myRating)
    }, [myRating])

    const numRating = maxRating

    const getRating = (selected) => {
        let rating = [];
        for (let i = 1; i <= numRating; i++) {
            rating.push(
                <li key={`rating-${i}`}>
                <input
                    type='radio'
                    id={`num${i}`}
                    name='rating'
                    value={i}
                    onChange={handleChange}
                    checked={selected === i}
                />
                <label htmlFor={`num${i}`}>{i}</label>
            </li>
            )
        }
        return rating
    }
    
    const handleChange = (e) => {
        setSelected(+e.target.value)
        selectRating(+e.target.value)
    }

    return (
        <ul className='rating'>
            {getRating(selected)}
        </ul>
    )
}

export default PointsSelect
