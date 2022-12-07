import React, {useState} from 'react'

/* Data */
import subjects from '../data/mydata.json'

/* Componentes */
import SubjectCard from '../components/SubjectCard/SubjectCard'
import ConfigModal from '../components/ConfigModal/ConfigModal'
import TableSegmentation from '../graphs/Table/TableSegmentation'
import TableParcellation from '../graphs/Table/TableParcellation'
import BoxplotSegmentation from '../graphs/Boxplot/BoxplotSegmentation'
import BoxplotParcellation from '../graphs/Boxplot/BoxplotParcellation'
import Scatter from '../graphs/Scatter/Scatter'
import Midline from '../graphs/Line/Midline'
/* Icones */
import {BsGear} from 'react-icons/bs'
import { createRoot } from 'react-dom/client';

import '../styles/main.scss'
import Radar from '../graphs/Radar/Radar'

function showConfigs(){
    const container = document.querySelector('#modalArea');
    const root = createRoot(container); // createRoot(container!) if you use TypeScript

    root.render(<ConfigModal root={root}/>)
}

function Main() {
    
    const [filter, setFilter] = useState("")
    const [data, setData] = useState(subjects)

    function filterSubject(){
        let value = document.querySelector("#filter").value
        setFilter(value)
    }

    /* Função que seleciona um sujeito com o Card */

    function selectSubject(name){
        if(name == "All"){
            setData(subjects)
        } else{
            const selecteds = []
            data.map((subject) => {if(subject["Id"] == name){
                selecteds.push(subject);
            }})
            setData(selecteds);
        }
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
                        <SubjectCard name="All" onClick={selectSubject}/>

                        {data.map((subject, index) => {
                            if(subject["Id"].includes(filter)){
                                return(
                                    <SubjectCard name={subject["Id"]} id={index} key={index} onClick={selectSubject}/>
                                )
                            }
                        })}

                    </div>
                    
                </div>
                
                <div className='square-field'>
                    <div>
                        <span className="qnt">{data.length}</span>
                        <span className="label">Subjects</span>
                    </div>
                </div>

                <BsGear className='gear-icon' onClick={showConfigs}/>

            </div>

            <div className='area-view'>
            
                <div className='area-table'>
                    <TableSegmentation data={data}/>
                    <TableParcellation data={data}/>
                </div>
                    
                <div className='area-boxplot'>
                    <BoxplotSegmentation data={data} />
                    <BoxplotParcellation data={data} />
                </div>

                <div className='area-scatter'>
                    <Scatter data={data}/>
                </div>

                <div className='area-midline'>
                    <Midline data={data}/>
                    <Radar data={data}/>
                </div>

            </div>

        </div>
    )
}

export default Main