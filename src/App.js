import React, { useEffect } from "react";
import { useFetch } from "./hooks/useFetch";
import {scaleLinear} from "d3-scale";
import {extent, max, min} from "d3-array";

const App = () => {
    const [data, loading] = useFetch(
        "https://raw.githubusercontent.com/info474-sp21/lecture-4-15-wk3-b-eda/main/data/fatal-police-shootings-data.csv"
    );

    console.log("from hook", loading, data);

    const dataSample = data.slice(0, 300);

    const size = 500;
    const margin = 20;

    // max accepts an array
    // to get an array of IDs from an array of objects, use map() and return the id, which will create an array of IDs
    const maxValueofID = max(dataSample.map((shooting) => {
        return +shooting.id // convert string to number using '+'
    }))

    // const minValueofID = min(dataSample.map((shooting) => {
    //     return +shooting.id // convert string to number using '+'
    // }))

    // const minValueofID = min(dataSample, (d) => {
    //     return +d.id
    // })

    // oneline
    const minValueofID = min(dataSample, d => +d.id)

    console.log(maxValueofID, minValueofID)

    // extent returns an array of the min and max value
    // ex: [3, 883]
    const extentId  = extent(dataSample, d => +d.id) 
    console.log(extentId)

    const xScale = scaleLinear()
        .domain(extentId)
        .range([0, 250]) // pixels

    return (
        <div>
            <h1>Exploratory Data Analysis, Assignment 2</h1>
            {/* if loading is true, show 'Loading data!' */}
            <p>{loading && "Loading data!"}</p>
            <svg width={size} height={size} style={{ border: "1px solid black" }}>
                {/* {data.map((shooting, index) => {
                    // console.log("drawing circle");
                    return <circle key={index} cx={10} cy={shooting.id} r="3"/>
                })
                } */}

                {dataSample.map((shooting, index) => {
                    const highlight = shooting.armed !== "gun";
                    return (
                        <circle
                            key={index}
                            cx={highlight ? size / 2 : size / 2 - 20}
                            cy={size - margin - shooting.id}
                            r="3"
                            fill="none"
                            stroke={highlight ? "red" : "steelblue"}
                            strokeOpacity="0.2"
                        />)
                })
                }
            </svg>

            <svg width={size} height={size} style={{ border: "1px solid black" }}>
                <text x={size / 2 - 30} y={size - margin} textAnchor="end" style={{fontSize: 10, fontFamily: "Gill Sans, sans serif"}}>
                    0
                </text>
                <text x={size / 2 - 30} y={size - margin - 100} textAnchor="end" style={{fontSize: 10, fontFamily: "Gill Sans, sans serif"}}>
                    100
                </text>
                {dataSample.map((shooting, index) => {
                    const highlight = shooting.armed !== "gun";
                    return (
                        <line
                            key={index}
                            x1={size / 2}
                            y1={size - margin - shooting.id}
                            x2={size / 2 + 20}
                            y2={size - margin - shooting.id}
                            fill="none"
                            stroke={highlight ? "red" : "steelblue"}
                            strokeOpacity={highlight ? 1 : 0.1}
                        />)
                })
                }
            </svg>
        </div>
    );
}

export default App;