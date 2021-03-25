import React, {useContext, useEffect, useState} from 'react';
import {currentCityContext, languageContext} from "../../App";
import {key} from "../keyAPI";
import axios from "axios";
import ReactLoading from 'react-loading';

import WaterChart from "./MinuteWeatherForOneLocationComponents/WaterChart";
import '../../Styles/MinuteWeatherForOneLocation/Chart.sass'

function MinuteWeatherForOneLocation(props){

    const [data, setData] = useState();
    const [loading, setLoading] = useState(true)
    const currentCityId = useContext(currentCityContext)
    const langCtx = useContext(languageContext)

    // minutowa prognoza przewiduje deszcz

    const part = 'daily,hourly,daily,current'
    //================================================

    const timer = () => {setLoading(false);}

    useEffect(() => {
        setLoading(true);
    },[currentCityId])

    useEffect(() =>{
        axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${props.coords.lat}&lon=${props.coords.lon}&lang=${langCtx.language['lang'][langCtx.lang]}&exclude=${part}&appid=${key}`)
            .then(response => {
                console.log(response.data); //delete comment if U want to see data from response
                setData(response.data);
                setTimeout(timer,1000);
            })
            .catch(error => {
                console.log(error);
            })

        return () => {
            clearTimeout(timer)
        }

    },[props.coords, langCtx])

    return(
        <div id={`map-${props.coords.lat}-${props.coords.lon}`}>
            {loading && <div className="boxLoader"><ReactLoading className="pageLoader" type="spinningBubbles" color="#4269f5" height={667} width={375} /></div>}
            {!loading && <WaterChart minutely={data.minutely} />}
        </div>
    )
}

export default MinuteWeatherForOneLocation;