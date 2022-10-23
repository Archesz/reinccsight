import React from 'react'
import Plot from 'react-plotly.js'

import './Boxplot.scss'

var y0 = [];
var y1 = [];
for (var i = 0; i < 50; i ++) {
	y0[i] = Math.random();
	y1[i] = Math.random() + 1;
}

function getSize(size){
    let sizes = []
    if(size == "small"){
        sizes = [420, 190]
    } else if(size == "medium"){
        sizes = [420, 240]
    }
    return sizes
}

function Boxplot(props) {

    let data = [{
        y: y0,
        type: "box",
        name: "Watershed"
    }, {
        y: y1,
        type: "box",
        name: "ROQS"
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