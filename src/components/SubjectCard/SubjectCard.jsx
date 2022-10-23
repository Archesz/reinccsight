import React from 'react'
import './SubjectCard.scss'

function SubjectCard(props) {
    return (
        <div className='subject-card'>
            {props.name}
        </div>
    )
}

export default SubjectCard