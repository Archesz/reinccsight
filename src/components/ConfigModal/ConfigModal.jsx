import React from 'react'
import './ConfigModal.scss'
import {AiOutlineClose} from 'react-icons/ai'

function closeModal(root){
    root.unmount();
}

function ConfigModal(props) {

    const graphs = ["Scatter", "Line", "Bar", "Pie", "Bubble", "Table", "Sankey", "Boxplot", "Error Bar"]

    return (
        <div id='modal-area'>
            
            <div className='modal-container'>
                
                <AiOutlineClose onClick={() => {closeModal(props.root)}} className="close-icon"/>

                <div className='modal-body'>

                    <div className='modal-left'>
                        <span>Graphs and View</span>
                        <span>Methods</span>
                    </div>

                    <div className='modal-right'>

                        <div className='modal-right-view'>

                            <div className='input-group'>

                                <label>Type of Graph</label>
                                <select>
                                    {graphs.map((graph) => {
                                        return(
                                            <option value={graph}>{graph}</option>
                                        )
                                    })}
                                </select>

                            </div>

                            <div className='input-group'>
                                <label>Name</label>
                                <input type="text"/>
                            </div>

                            <button className='btn-apply'>Apply and Save</button>

                        </div>

                    </div>
                                            
                </div>

            </div>

        </div>
    )
}

export default ConfigModal