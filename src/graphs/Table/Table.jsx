import React, {useState} from 'react'
import Plot from 'react-plotly.js'
import './Table.scss'

function Table(props) {

    const [method, setMethod] = useState("Chao")
    let size = Object.keys(props.data).length
    
    function getDataSegmentation(dict){
        let keys = Object.keys(dict)

        let cols = []
        let col1 = []

        for(let i = 0; i != keys.length; i++){
            col1.push(keys[i])
        }
        cols.push(col1)        

        for(let i = 0; i != dict[keys[0]].length; i++){
            let col = []
            for(let j = 0; j != keys.length; j++){
                let value = dict[keys[j]][i]
                col.push(value)
            }
            cols.push(col)
        }

        return cols
    }

    function getDataParcellation(dict, method){
        let keys = Object.keys(dict)
        let methods = Object.keys(dict[keys[0]])

        let cols = []
        let col1 = []


        for(let i = 0; i != keys.length; i++){
            col1.push(keys[i])
        }

        cols.push(col1)        

        for(let j = 0; j != dict[keys[0]][methods[0]].length; j++){
            let col = []
            for(let i = 0; i != col1.length; i++){
                let value = dict[keys[i]][method][j]
                col.push(value)
            }
            cols.push(col)
        }

        return cols
    }

    function changeMethod(){
        let value = document.querySelector("#methodSelect").value
        setMethod(value)
    }

    let data = [{
        type: "table",
        header: {
            values: props.headers.map((name) => {return(`<b>${name}</b>`)}),
            line: {width: 1, color: 'black'},
        },
        cells: {
            values: props.type == "segmentation" ? getDataSegmentation(props.data) : getDataParcellation(props.data, method),
            height: 30,
            align: ["center", "center"],
            line: {width: 1, color: 'black'},
    
        }
    }]

    let layout = {height: size * 55,margin: {t: 10, b: 2, l: 10, r: 10}}

    if(props.type == "segmentation"){
        return (
            <div className='table-field'>
                
                <div className='table-row'>
                    <span className='table-title'>{props.title}</span>
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
                        <select>
                            <option>Hide</option>
                        </select>
                    </div>
    
                </div>
    
            </div>
        )            
    } else if(props.type == "parcellation"){
        return (
            <div className='table-field'>
                
                <div className='table-row'>
                    <span className='table-title'>{props.title}</span>
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
                        <label>Parcellation Method: </label>
                        <select id="methodSelect" onChange={changeMethod}>
                            {props.methods.map((method, index) => {
                                return(
                                    <option value={method} key={index}>{method}</option>
                                )
                            })}
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
        )    
    }
}

export default Table