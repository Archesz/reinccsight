import React from 'react'
import './InputGroup.scss'

export default function InputGroup(props) {
    return (
        <div className='path-group'>

            <div className='input-group-path'>
                <label className='label-input'>Folder path</label>
                <input type='text' className='inputText' placeholder='Ex: C:\Users\User\Desktop\Study\Male' id={`path_${props.id}`}/>
            </div>
            <div className='input-group-name'>
                <label className='label-input'>Group name</label>
                <input type='text' className='inputText' placeholder="Ex: Man's" id={`${props.id}`}/>
            </div>

        </div>
    )
}