import React from 'react'
import Plot from 'react-plotly.js'
import './Histogram.scss'

var x = [];
var x2 = []
for (var i = 0; i < 500; i ++) {
	x[i] = Math.random();
    x2[i] = Math.random();
}

function Histogram(props) {
    
    let data = [{
        x: x, 
        type: "histogram",
        name: "Watershed",
        opacity: 0.5
    },{
        x: x2,
        type: "histogram",
        name: "ROQS",
        opacity: 0.5
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
                    }
                };

    return (
        <Plot data={data} layout={layout}/>
    )
}

export default Histogram