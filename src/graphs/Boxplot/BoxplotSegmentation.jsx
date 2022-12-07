import React from 'react'
import Plot from 'react-plotly.js'
import Boxplot from './Boxplot'
import './BoxplotSegmentation.scss'

function getScalarValues(data, method, scalar){
    
    let values = data.map((subject) => {
                    return parseFloat(subject[method][scalar].toFixed(6))
                })

    return values
}

function BoxplotSegmentation(props) {

    return (
        <div className='boxplot-container'>
            <span className='boxplot-title'>Segmentation Boxplots</span>

            <div className='boxplot-row'>

                <Boxplot title="FA" watershed={getScalarValues(props.data, "Watershed_scalar", "FA")} roqs={getScalarValues(props.data, "ROQS_scalar", "FA")} width="375"/>
                <Boxplot title="MD" watershed={getScalarValues(props.data, "Watershed_scalar", "MD")} roqs={getScalarValues(props.data, "ROQS_scalar", "MD")} width="375"/>
                <Boxplot title="RD" watershed={getScalarValues(props.data, "Watershed_scalar", "RD")} roqs={getScalarValues(props.data, "ROQS_scalar", "RD")} width="375"/>
                <Boxplot title="AD" watershed={getScalarValues(props.data, "Watershed_scalar", "AD")} roqs={getScalarValues(props.data, "ROQS_scalar", "AD")} width="375"/>

            </div>

        </div>
    )
}

export default BoxplotSegmentation