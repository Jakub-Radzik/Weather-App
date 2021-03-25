import React, {useContext, useEffect, useState} from 'react';
import CanvasJSReact from "./canvasjs.react";
import {currentCityContext, languageContext} from "../../../App";
import {addMinutes} from "../../../Functions/AddMinutes";

let CanvasJSChart = CanvasJSReact.CanvasJSChart;
let dps = []

function WaterChart(props){

    const [warning, setWarning] = useState("Brak opadów w ciągu najblizszej godziny")
    const currentCityId = useContext(currentCityContext)
    const langCtx = useContext(languageContext);

    const options = {
        title: {
            text: langCtx.language['rainHeading'][langCtx.lang]
        },
        theme: "dark1",
        axisY:{
            minimum: 0,
        },
        data: [{
            color: "#237ccd",
            type: "column",
            dataPoints: dps
        }]
    }

    const getLabel = () =>{
        let dataPoints = []
        setWarning("Brak opadów w ciągu najblizszej godziny");
        console.log("minutely", props.minutely)
        if(props.minutely!==undefined){
            console.log("propsy zdefiniowane")
            for (let i = 0; i < props.minutely.length; i++) {
                let date = new Date(props.minutely[i].dt * 1000);
                let label = `${date.getHours()}:${date.getMinutes()<10?"0"+date.getMinutes():date.getMinutes()}`
                let precipitation = props.minutely[i].precipitation;
                if(precipitation!==0){
                    console.log("opady")
                    setWarning("")
                }
                let item = {label: label,  y: precipitation, x:i}
                dataPoints.push(item);
            }
            console.log("dataPointsNew: ", dataPoints)
        }else{
            //generowanie pustych data pointów
            let date = new Date();
            dataPoints.push({label: `${date.getHours()}:${date.getMinutes()}`,y:0, x:0})
            for (let i = 1; i < 60; i++) {
                date = addMinutes(date, 1);
                dataPoints.push({label: `${date.getHours()}:${date.getMinutes()}`, y:0, x:i})
            }
        }
        dps = dataPoints
    }

    const [forceRefresh, setForceRefresh] = useState(false);

    useEffect(() => {
        setForceRefresh(false)
        getLabel();
        setForceRefresh(true)
    },[props])

    useEffect(() => {
        setWarning(langCtx.language['noRain'][langCtx.lang]);
    },[langCtx])

    return (
        <div className={"fall"}>
            <div className="scrollWrapper">
                <div className={`chart ${currentCityId}`}>
                    {forceRefresh && <CanvasJSChart options = {options} className={currentCityId} onLoad={console.log("wykres", options)}/>}
                </div>
            </div>
            {warning!==""?<div className={"warning"}>{warning}</div>:null}
        </div>
    );
}

export default React.memo(WaterChart);