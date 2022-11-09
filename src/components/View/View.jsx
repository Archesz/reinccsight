import React from 'react'
import Boxplot from '../../graphs/Boxplot/Boxplot'
import Scatter from '../../graphs/Scatter/Scatter'
import Table from '../../graphs/Table/Table'
import Painel from '../Painel/Painel'
import Histogram from '../../graphs/Histogram/Histogram'

import './View.scss'
import Violin from '../../graphs/Violin/Violin'


let parcellation = {"Watershed": {"Witelson": [0.74236, 0.707348, 0.726156, 0.711431, 0.756921], "Hofer": [0.00001, 0.00001, 0.00001, 0.00001, 0.00001],
                                  "Chao": [0.00002,0.00002, 0.00002, 0.00002, 0.00002], "Freesurfer": [0.00003, 0.00003, 0.00003, 0.00003, 0.00003]}, 
                    "ROQS": {"Witelson": [0.641286, 0.585289, 0.593242, 0.584628, 0.672122], "Hofer": [0.00001, 0.00001, 0.00001, 0.00001, 0.00001],
                                  "Chao": [0.00002,0.00002, 0.00002, 0.00002, 0.00002], "Freesurfer": [0.00003, 0.00003, 0.00003, 0.00003, 0.00003]}}

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
    
    let segmWatershed = [0, 0, 0, 0]
    let segmROQS = [0, 0, 0, 0]

    // let segmWatershed = [0.739772, 0.000383, 0.001655, 0.000807]
    // let segmROQS = [0.632888, 0.000586, 0.001704, 0.000959]

    data.map((subject) => {
        for(let i = 0; i != 4; i++){
            segmWatershed[i] += subject["Segmentation"]["Watershed"][i]
            segmROQS[i] += subject["Segmentation"]["ROQS"][i]
        }
    })

    for(let i = 0; i != 4; i++){
        segmWatershed[i] = Number(segmWatershed[i] / data.length).toFixed(6)
        segmROQS[i] = Number(segmROQS[i] / data.length).toFixed(6)
    }

    let segmentation = {"Watershed": segmWatershed, "ROQS": segmROQS}

    return segmentation
}

function View(props) {
    
    let [errorRoqs, errorWatershed] = getErrorSubject(props.data)
    let segmentation = getSegmentation(props.data)

    return (
        <div className='view-container'>

            <div className='tables-area'>

                <Painel subjects={{"ROQS": errorRoqs,
                               "Watershed": errorWatershed}}/>

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
                        <Boxplot title={"FA"} data={props.data} size="medium"/>
                        <Boxplot title={"MD"} data={props.data} size="medium"/>
                        <Boxplot title={"RD"} data={props.data} size="medium"/>
                        <Boxplot title={"AD"} data={props.data} size="medium"/>
                    </div>

                    <span>Parcellation Boxplot</span>
                    <div className='boxplot-row'>
                        <Boxplot title={"P1"} size="small"/>
                        <Boxplot title={"P2"} size="small"/>
                        <Boxplot title={"P3"} size="small"/>
                        <Boxplot title={"P4"} size="small"/>
                        <Boxplot title={"P5"} size="small"/>

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
                    <Histogram />
                    <Scatter scalarX={"FA"} scalarY={"MD"}/>

                    <div className='options-row'>

                        <div className='select-group'>
                            <label>Scalar Y: </label>
                            <select>
                                <option>FA</option>
                                <option>RD</option>
                                <option>AD</option>
                                <option>MD</option>
                            </select>
                        </div>

                        <div className='select-group'>
                            <label>Scalar X: </label>
                            <select>
                                <option>FA</option>
                                <option>RD</option>
                                <option>AD</option>
                                <option>MD</option>
                            </select>
                        </div>

                    </div>

                </div>

            </div>

        </div>
    )
}

export default View