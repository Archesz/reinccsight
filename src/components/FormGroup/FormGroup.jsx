import React from 'react'
import InputGroup from '../InputGroup/InputGroup'
import './FormGroup.scss'

export default function FormGroup(props) {
    return (
        <div className='form' id='formGroups'>
            
            {props.groups.map((group, index) => <InputGroup id={`group_${index}`} key={index}/>)}

        </div>
    )
}