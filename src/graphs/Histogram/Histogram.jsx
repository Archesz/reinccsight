import React from 'react'
import Plot from 'react-plotly.js'
import './Histogram.scss'

var x = [];
var x2 = []
for (var i = 0; i < 500; i ++) {
	x[i] = Math.random();
    x2[i] = Math.random();
}

function getData(data, X){
    let lista1 = []
    let lista2 = []

    data.map((subject) => {
        lista1.push(subject["Segmentation"]["Watershed"][X])
        lista2.push(subject["Segmentation"]["ROQS"][X])

    })
    
    return [lista1, lista2]
}


function Histogram(props) {
    
    let [x1, x2] = getData(props.data, props.scalarX)

    let data = [{
        x: x1,
        type: "histogram",
        name: "Watershed",
        opacity: 0.5,
    },{
        x: x2,
        type: "histogram",
        name: "ROQS",
        opacity: 0.5,
    }]
    
    let layout = {
                    barmode: "overlay", 
                    width: 600, height: 350, 
                    plot_bgcolor: "#E5ECF6", 
                    margin: {b: 2},
                    yaxis: {
                        showticklabels: false
                    },
                    legend: {
                        x: 0,
                        y: 1.2,
                        orientation: "h"
                    },
                    bargap: 0,
                    autosize: false, 
                    hovermode: 'closest'
                };

    return (
        <Plot data={data} layout={layout}/>
    )
}

export default Histogram