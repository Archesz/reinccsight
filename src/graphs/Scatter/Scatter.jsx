import React from 'react'
import Plot from 'react-plotly.js'
import './Scatter.scss'

function getData(data, X, Y){
    let listaX0 = []
    let listaY0 = []
    let listaX1 = []
    let listaY1 = []

    data.map((subject) => {
        listaX0.push(subject["Segmentation"]["Watershed"][X])
        listaY0.push(subject["Segmentation"]["Watershed"][Y])
        listaX1.push(subject["Segmentation"]["ROQS"][X])
        listaY1.push(subject["Segmentation"]["ROQS"][Y])

    })
    
    return [listaX0, listaY0, listaX1, listaY1]
}

function Scatter(props) {
    
    let [x0, y0, x1, y1] = getData(props.data, props.scalarX, props.scalarY)

    let data = [{
        x: x0,
        y: y0,
        mode: "markers",
        type: "scatter",
        name: "Watershed"
    }, {
        x: x1,
        y: y1,
        mode: "markers",
        type: "scatter",
        name: "ROQS"
    }]

    let layout = {
                width: 600,
                height: 600,
                plot_bgcolor: "#E5ECF6", 
                xaxis: {title: props.scalarX}, yaxis: {title: props.scalarY},
                showlegend: false,
                margin: {t: 0}
            }

    return (
        <div>
            <Plot data={data} layout={layout}/>
        </div>
    )
}

export default Scatter