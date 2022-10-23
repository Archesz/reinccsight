import React from 'react'
import Boxplot from '../../graphs/Boxplot/Boxplot'
import Scatter from '../../graphs/Scatter/Scatter'
import Table from '../../graphs/Table/Table'
import Painel from '../Painel/Painel'
import Histogram from '../../graphs/Histogram/Histogram'

import './View.scss'
import Violin from '../../graphs/Violin/Violin'

let segmentation = {"Watershed": [0.739772, 0.000383, 0.001655, 0.000807], "ROQS": [0.632888, 0.000586, 0.001704, 0.000959]}

let parcellation = {"Watershed": {"Witelson": [0.74236, 0.707348, 0.726156, 0.711431, 0.756921], "Hofer": [0.00001, 0.00001, 0.00001, 0.00001, 0.00001],
                                  "Chao": [0.00002,0.00002, 0.00002, 0.00002, 0.00002], "Freesurfer": [0.00003, 0.00003, 0.00003, 0.00003, 0.00003]}, 
                    "ROQS": {"Witelson": [0.641286, 0.585289, 0.593242, 0.584628, 0.672122], "Hofer": [0.00001, 0.00001, 0.00001, 0.00001, 0.00001],
                                  "Chao": [0.00002,0.00002, 0.00002, 0.00002, 0.00002], "Freesurfer": [0.00003, 0.00003, 0.00003, 0.00003, 0.00003]}}

function View(props) {
    return (
        <div className='view-container'>

            <div className='tables-area'>

                <Painel subjects={{"ROQS": ["Subject_000256", "Subject_000139", "Subject_000758", "Subject_000986"],
                               "Watershed": ["Subject_000001", "Subject_000002", "Subject_000003", "Subject_000004"]}}/>

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
                        <Boxplot title={"FA"} size="medium"/>
                        <Boxplot title={"MD"} size="medium"/>
                        <Boxplot title={"RD"} size="medium"/>
                        <Boxplot title={"AD"} size="medium"/>
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