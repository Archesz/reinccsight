import React, {useState} from 'react'
import Boxplot from '../../graphs/Boxplot/Boxplot'
import Scatter from '../../graphs/Scatter/Scatter'
import Table from '../../graphs/Table/Table'
import Painel from '../Painel/Painel'
import Histogram from '../../graphs/Histogram/Histogram'
import {AiOutlineEye} from 'react-icons/ai'

import './View.scss'
import Violin from '../../graphs/Violin/Violin'

let parcellation = {"Watershed": {"Witelson": [0.74236, 0.707348, 0.726156, 0.711431, 0.756921], "Hofer": [0.00001, 0.00001, 0.00001, 0.00001, 0.00001],
                                  "Chao": [0.00002,0.00002, 0.00002, 0.00002, 0.00002], "Freesurfer": [0.00003, 0.00003, 0.00003, 0.00003, 0.00003]}, 
                    "ROQS": {"Witelson": [0.641286, 0.585289, 0.593242, 0.584628, 0.672122], "Hofer": [0.00001, 0.00001, 0.00001, 0.00001, 0.00001],
                                  "Chao": [0.00002,0.00002, 0.00002, 0.00002, 0.00002], "Freesurfer": [0.00003, 0.00003, 0.00003, 0.00003, 0.00003]}}

function callPainel(){
    let painel = document.querySelector("#painel-container")
    let call = document.querySelector("#painel-call")
    painel.style.display = "flex"
    call.style.display = "None"
}

function getErrorSubject(data){

    let roqs = []
    let watershed = []

    data.map((subject) => {
        if(subject["Flag_watershed"] == 1){
            watershed.push(subject["Name"])
        }
        if(subject["Flag_ROQS"] == 1){
            roqs.push(subject["Name"])
        }
    })

    return [roqs, watershed]
}

function getSegmentation(data){
    
    let segmWatershed = {"FA": 0, "RD": 0, "AD": 0, "MD": 0}
    let segmROQS = {"FA": 0, "RD": 0, "AD": 0, "MD": 0}

    let keys = Object.keys(segmWatershed)

    data.map((subject) => {
        for(let i = 0; i != keys.length; i++){
            segmWatershed[keys[i]] += subject["Segmentation"]["Watershed"][keys[i]]
            segmROQS[keys[i]] += subject["Segmentation"]["ROQS"][keys[i]]
        }  
    })

    for(let i = 0; i != keys.length; i++){
        segmWatershed[keys[i]] = Number(segmWatershed[keys[i]] / data.length).toFixed(6)
        segmROQS[keys[i]] = Number(segmROQS[keys[i]] / data.length).toFixed(6)
    }  
    segmWatershed = [segmWatershed["FA"], segmWatershed["RD"], segmWatershed["AD"], segmWatershed["MD"]]
    segmROQS = [segmROQS["FA"], segmROQS["RD"], segmROQS["AD"], segmROQS["MD"]
]
    let segmentation = {"Watershed": segmWatershed, "ROQS": segmROQS}

    return segmentation
}

function View(props) {
    
    let [scalarX, setScalarX] = useState("FA")
    let [scalarY, setScalarY] = useState("FA")

    function changeScalarX(axis){
        let value = document.querySelector(`#scalarX`).value
        setScalarX(value)
    }

    function changeScalarY(axis){
        let value = document.querySelector(`#scalarY`).value
        setScalarY(value)
    }

    let [errorRoqs, errorWatershed] = getErrorSubject(props.data)
    let segmentation = getSegmentation(props.data)

    return (
        <div className='view-container'>
            
            <div className='painel-field'>
                <Painel subjects={{"ROQS": errorRoqs,
                                   "Watershed": errorWatershed}}/>
            </div>
            
            <div className='painel-call' id='painel-call'>
                <AiOutlineEye onClick={callPainel}/>
            </div>

            <div className='area-view'>


                <div className='tables-area'>

                    <Table 
                    headers={["Method", "FA", "RD", "AD", "MD"]} data={segmentation} title="Segmentation Data"
                    type="segmentation"
                    />

                    <Table 
                    headers={["Method", "P1", "P2", "P3", "P4", "P5"]} data={parcellation} title="Parcellation Data"
                    type="parcellation"
                    methods={Object.keys(parcellation["Watershed"])}
                    options={["Mode", "Parcellation Method", "Scalar"]}
                    />

                </div>

                <div className='view-row'>
                    <div className='boxplot-area'>

                        <span>Segmentation Boxplot</span>
                        <div className='boxplot-row'>
                            <Boxplot title={"FA"} type="Segmentation" data={props.data} size="medium"/>
                            <Boxplot title={"MD"} type="Segmentation" data={props.data} size="medium"/>
                            <Boxplot title={"RD"} type="Segmentation" data={props.data} size="medium"/>
                            <Boxplot title={"AD"} type="Segmentation" data={props.data} size="medium"/>
                        </div>

                        <span>Parcellation Boxplot</span>
                        <div className='boxplot-row'>
                            <Boxplot title={"P1"} type="Parcellation" size="small"/>
                            <Boxplot title={"P2"} type="Parcellation" size="small"/>
                            <Boxplot title={"P3"} type="Parcellation" size="small"/>
                            <Boxplot title={"P4"} type="Parcellation" size="small"/>
                            <Boxplot title={"P5"} type="Parcellation" size="small"/>

                        </div>

                        <div className='options-row'>

                            <div className='select-group'>
                                <label>Parcellation Method: </label>
                                <select>
                                    <option>Witelson</option>
                                    <option>Hofer</option>
                                    <option>Chao</option>
                                    <option>Freesurfer</option>
                                </select>
                            </div>

                            <div className='select-group'>
                                <label>Scalar: </label>
                                <select>
                                    <option>FA</option>
                                    <option>RD</option>
                                    <option>AD</option>
                                    <option>MD</option>
                                </select>
                            </div>

                        </div>

                    </div>

                    <div className='scatter-area'>
                        <Histogram data={props.data} scalarX={scalarX}/>
                        <Scatter data={props.data} scalarX={scalarX} scalarY={scalarY}/>

                        <div className='options-row'>

                            <div className='select-group'>
                                <label>Scalar Y: </label>
                                <select id='scalarY' onChange={changeScalarY}>
                                    <option value="FA">FA</option>
                                    <option value="MD">RD</option>
                                    <option value="RD">AD</option>
                                    <option value="AD">MD</option>
                                </select>
                            </div>

                            <div className='select-group'>
                                <label>Scalar X: </label>
                                <select id='scalarX' onChange={changeScalarX}>
                                    <option value="FA">FA</option>
                                    <option value="MD">RD</option>
                                    <option value="RD">AD</option>
                                    <option value="AD">MD</option>
                                </select>
                            </div>

                        </div>

                    </div>

                </div>

            </div>


        </div>
    )
}

export default View