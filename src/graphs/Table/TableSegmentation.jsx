import React, {useState} from 'react'
import Plot from 'react-plotly.js'
import './TableSegmentation.scss'

function getMeanValues(subjects, method, scalar){
    let value = 0
    subjects.map((subject) => {
        return(
            value += subject[method][scalar]
        )
    })

    value /= (subjects.length);
    return value.toFixed(6)
}

function TableSegmentation(props) {

    const [show, setShow] = useState("hide")

    function changeShow(){
        let value = document.querySelector("#show").value
        setShow(value)
    }

    let headers = []
    /* Selecionando os dados */
    let subjects = props.data
    if(show == "show"){
        headers = ["Method", "FA", "FA StdDev","MD", "MD StdDev", "RD", "RD StdDev", "AD", "AD StdDev"]
    } else if(show == "hide"){
        headers = ["Method", "FA", "MD", "RD", "AD"]
    }

    let cols = [["ROQS", "Watershed"]]

    for(let i = 1; i != headers.length; i++){
        let v1 = getMeanValues(subjects, "ROQS_scalar", headers[i])
        let v2 = getMeanValues(subjects, "Watershed_scalar", headers[i])
        cols.push([v1, v2])
    }
    
    /* Ajustes da tabela */

    let data = [{
        type: "table",
        header: {
            values: headers,
            align: ["center"],
            line: {width: 1, color: 'black'},
            fill: {color: "grey"},
            font: {family: "Arial", size: 14, color: "white"}
        },
        cells: {
            values: cols,
            height: 30,
            align: ["center", "center"],
            line: {width: 1, color: 'black'},
            font: {family: "Arial", size: 12, color: "black"}    
        }
    }]

    let layout = {width: "50%", height: 130, margin: {t: 10, b: 10, l: 10, r: 10}}

    return(

        <div className='table-field'>
                
            <div className='table-row'>
                <span className='table-title'>Segmentation Data</span>
                <button className='btn-export'>Export</button>
            </div>

            <Plot data={data} layout={layout}/>
        
            <div className='options-row'>  
        
                <div className='select-group'>
                    <label>Mode: </label>
                    <select>
                        <option>Overall</option>
                    </select>
                </div>
        
                <div className='select-group'>
                    <label>Std. Dev: </label>
                    <select onChange={changeShow} id="show">
                        <option value="hide">Hide</option>
                        <option value="show">Show</option>
                    </select>
                </div>
        
            </div>

        </div>

    )
}

export default TableSegmentation