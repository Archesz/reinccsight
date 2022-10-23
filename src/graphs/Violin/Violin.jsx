import React from 'react'
import Plot from 'react-plotly.js'

var y0 = [];
var x0 = [];
var y1 = [];
var x1 = [];
for (var i = 0; i < 50; i ++) {
	y0[i] = Math.random();
	x0[i] = Math.random();
    y1[i] = Math.random() + 1;
	x1[i] = Math.random() + 1;
}

function Violin(props) {

    let data = [{
        hoveron: "points+kde",
        points: "all",
        pointpos: 0,
        jitter: 0,
        scalemode: "count",
        showlegend: true,
        type: "violin",
        y0: "Thursday",
        x: x0,
        y: y0,
        name: "Watershed"
    }, {
        hoveron: "points+kde",
        points: "all",
        pointpos: 0,
        jitter: 0,
        scalemode: "count",
        showlegend: true,
        type: "violin",
        y0: "Thursday",
        x: x1,
        y: y1,
        name: "ROQS"
    }]

    let layout = {  title: "ok",
    yaxis: {
      zeroline: false
    }}

    return (
        <Plot data={data} layout={layout}/>
    )
}

export default Violin