import React, {useContext, useEffect, useState} from 'react';
import {currentCityContext, languageContext} from "../../App";
import {key} from "../keyAPI";
import axios from "axios";
import ReactLoading from 'react-loading';
import '../../Styles/MinuteWeatherForOneLocation/Chart.sass'
import HourComponent from "./TwoDaysWeatherComponents/HourComponent";
import '../../Styles/TwoDaysWeather/Hour.sass'

function TwoDaysWeather(props){

    const [data, setData] = useState({hourly:[]});
    const [loading, setLoading] = useState(true)
    const currentCityId = useContext(currentCityContext)
    const langCtx = useContext(languageContext)
    const part = 'daily,minutely,daily,current'

    // const [coords, setCoords] = useState({lon:0,lat:0})

    const timer = () => {setLoading(false);}

    useEffect(() => {
        setLoading(true);
        // setCoords(props.getCoordsByCityID(currentCityId))
    },[currentCityId])

    useEffect(() =>{
        axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${props.coords.lat}&lon=${props.coords.lon}&lang=${langCtx.language['lang'][langCtx.lang]}&exclude=${part}&appid=${key}`)
            .then(response => {
                // console.log(response.data); //delete comment if U want to see data from response
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
            {!loading &&
            <div className="scrollWrapperHour">
                {
                    data.hourly.map((el,idx) =>{
                        return <HourComponent data={data.hourly[idx]} key={idx}/>
                    })
                }
            </div>
            }
        </div>
    )
}

export default TwoDaysWeather;