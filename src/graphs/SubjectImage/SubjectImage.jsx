import React from 'react'
import './SubjectImage.scss'

import Plot from 'react-plotly.js';


function SubjectImage(props) {

    return (
        <div className='subjectImage-container'>
            
            <span>
                <input type="checkbox"/> 
                {props.name} - Method: {props.method}
            </span>

            <img src='https://www.valleyradiologync.com/sites/default/files/brain-scan-MRI-500x282.png' className='img-subject'/>

        </div>
    )
}

export default SubjectImage