import React, {useState} from 'react'
import SubjectCard from '../components/SubjectCard/SubjectCard'
import View from '../components/View/View'
import {BsGear} from 'react-icons/bs'
import { createRoot } from 'react-dom/client';


import '../styles/main.scss'
import ConfigModal from '../components/ConfigModal/ConfigModal';

const subjects = ['subject_0', 'subject_1', 'subject_2', 'subject_3', 'subject_4', 'subject_5', 'subject_6', 'subject_7', 'subject_8', 'subject_9', 'subject_10', 'subject_11', 'subject_12', 'subject_13', 'subject_14', 'subject_15', 'subject_16', 'subject_17', 'subject_18', 'subject_19', 'subject_20', 'subject_21', 'subject_22', 'subject_23', 'subject_24', 'subject_25', 'subject_26', 'subject_27', 'subject_28', 'subject_29', 'subject_30', 'subject_31', 'subject_32', 'subject_33', 'subject_34', 'subject_35', 'subject_36', 'subject_37', 'subject_38', 'subject_39', 'subject_40', 'subject_41', 'subject_42', 'subject_43', 'subject_44', 'subject_45', 'subject_46', 'subject_47', 'subject_48', 'subject_49']

function showConfigs(){
    const container = document.querySelector('#modalArea');
    const root = createRoot(container); // createRoot(container!) if you use TypeScript

    root.render(<ConfigModal root={root}/>)
}

function Main() {
    
    const [filter, setFilter] = useState("")

    function filterSubject(){
        let value = document.querySelector("#filter").value
        setFilter(value)
    }

    return (
        <div className='container'>

            <div id="modalArea">

            </div>

            <div className='header'>

                <div className='banner'>   

                    <div className='img-logo'></div>

                    <span className='banner-span'>This is data exploration and visualization tool for diffusion tensor images of the corpus callosum. Upload data folders to begin. Further information can be found here.</span>

                    <div className='banner-selects'>

                        <div className='input-group'>
                            <label>Category: </label>
                            <select>
                                <option>Method</option>
                                <option>Folder</option>
                            </select>
                        </div>

                        <div className='input-group'>
                            <label>Segm. Method: </label>
                            <select>
                                <option>ROQS</option>
                                <option>Watershed</option>
                            </select>
                        </div>

                    </div>

                    <button className='btn-check'>Check Quality [0]</button>

                </div>

                <div className='subjects-list'>

                    <label>Subjects</label>

                    <input placeholder='E.g: Subject_00002' id="filter" onChange={filterSubject}/>

                    <div className='subjects'>

                        {subjects.map((subject, index) => {
                            if(subject.includes(filter)){
                                return(
                                    <SubjectCard name={subject} key={index}/>
                                )
                            }
                        })}

                    </div>
                    
                </div>
                
                <div className='square-field'>
                    <div>
                        <span className="qnt">{subjects.length}</span>
                        <span className="label">Subjects</span>
                    </div>
                    <div>
                        <span className="qnt">1</span>
                        <span className="label">Folders</span>
                    </div>
                </div>

                <BsGear className='gear-icon' onClick={showConfigs}/>

            </div>

            <View />

        </div>
    )
}

export default Main