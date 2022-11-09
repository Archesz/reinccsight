import React from 'react'
import Plot from 'react-plotly.js'

import './Boxplot.scss'

function getSize(size){
    let sizes = []
    if(size == "small"){
        sizes = [420, 190]
    } else if(size == "medium"){
        sizes = [420, 240]
    }
    return sizes
}

function getData(data, name, scalar){
    let lista = []

    data.map((subject) => {
        lista.push(subject["Segmentation"][name][scalar])
    })
    
    return lista
}

function Boxplot(props) {

    let y0 = []
    let y1 = []

    if(props.type == "Segmentation"){
        y0 = getData(props.data, "ROQS", props.title)
        y1 = getData(props.data, "Watershed", props.title)
    } else{
        y0 = [0.627737, 0.558148, 0.662261, 0.661749]
        y1 = [0.75123, 0.683594, 0.759836, 0.754661]    
    }

    let data = [{
        y: y0,
        type: "box",
        name: "ROQS"
    }, {
        y: y1,
        type: "box",
        name: "Watershed"
        }
    ]

    let sizes = getSize(props.size)

    let layout = {title: props.title, height: sizes[0], width: sizes[1], margin: {l: 10, r: 10}, legend: {orientation: "h"}}

    return (
        <div className='boxplot-field'>

            <Plot data={data} layout={layout}/>

        </div>
    )
}

export default Boxplot