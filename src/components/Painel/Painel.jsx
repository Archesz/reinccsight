import React, {useState} from 'react'
import SubjectImage from '../../graphs/SubjectImage/SubjectImage'
import './Painel.scss'

function Painel(props) {
    
    const [method, setMethod] = useState("ROQS")

    function changeTab(name){
        let tabRoqs = document.querySelector("#tab_ROQS")
        let tabWatershed = document.querySelector("#tab_Watershed")
        if(name == "ROQS"){
            tabRoqs.classList.add("active")
            tabWatershed.classList.remove("active")
            setMethod("ROQS")
        } else{
            tabRoqs.classList.remove("active")
            tabWatershed.classList.add("active")
            setMethod("Watershed")
        }
    }

    function closePainel(){
        let painel = document.querySelector("#painel-container")
        let call = document.querySelector("#painel-call")
        painel.style.display = "None"
        call.style.display = "flex"
    }

    return (
        <div id='painel-container'>

            <div className='painel-header'>

                <div className='row'>
                    <span className='painel-title'>Quality Evaluation</span>
                    <span className='close-icon' onClick={closePainel}>X</span>                    
                </div>

                <div className='input-group'>
                    
                    <label>Threshold: </label>
                    <select>
                        <option>0.3</option>
                        <option>0.4</option>
                        <option>0.5</option>
                        <option>0.6</option>
                        <option>0.7</option>
                    </select>

                    <button>REMOVE SELECTED</button>

                </div>

                <div className='painel-tabs'>
                    <span id="tab_ROQS" className='tab active' onClick={() => changeTab("ROQS")}>ROQS</span>
                    <span id="tab_Watershed" className='tab' onClick={() => changeTab("Watershed")}>Watershed</span>
                </div>

            </div>

            <div className='painel-body'>

                {props.subjects[method].map((subject) => {
                    return(
                        <SubjectImage name={subject} method={method}/>
                    )
                })}

            </div>

        </div>
    )
}

export default Painel