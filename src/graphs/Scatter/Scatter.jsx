import React from 'react'
import Plot from 'react-plotly.js'
import './Scatter.scss'

var y0 = [];
var x0 = [];
var y1 = [];
var x1 = [];
for (var i = 0; i < 500; i ++) {
	y0[i] = Math.random();
	y1[i] = Math.random() + 0.5;
	x0[i] = Math.random();
	x1[i] = Math.random() + 0.1;
}

function Scatter(props) {
    
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