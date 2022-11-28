import React from 'react'
import './SubjectImage.scss'

import Plot from 'react-plotly.js';


function SubjectImage(props) {

    return (
        <div className='subjectImage-container'>
            
            <span>
                {props.name}
            </span>

            <img src='https://www.valleyradiologync.com/sites/default/files/brain-scan-MRI-500x282.png' className='img-subject'/>

            <button className='remove-row'>
                <input type="checkbox"/>
                <span>Remove</span>
            </button>

        </div>
    )
}

export default SubjectImage