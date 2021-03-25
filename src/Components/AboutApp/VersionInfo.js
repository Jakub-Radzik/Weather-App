import React from 'react';
import {version} from '../../../package.json'
import '../../Styles/HomePage/Version.sass'

function VersionInfo(){

    const displayInfo = {
        "0.6.0 [air]" : ["Widget zanieczyszczenia powietrza"],
        "0.5.0 [search]" : ["Wyszukiwarka miejscowości (200 000 miejscowości)", "Fix pobierania danych", "Mapa wyboru miejscowości"],
        "0.4.0 [thunder]" : ["Prognoza ogólna na tydzień","Przetłumaczenie do 6 wersji językowych", "Optymalizacja menu"],
        "0.3.0 [forecast]" : ["Prognoza ogólna na 2 dni","Pamiętanie wybranej ostatnio lokacji", "Naprawienie map i wykresów"],
        "0.2.0 [rain]" : ["Prognoza deszczu na 2 godziny","Usprawnienie ładowania map", "Dodanie strony informacyjnej"],
        "0.1.0 [sunrise]" : ["Pogoda dla jednej lokalizacji","Wygląd i struktura", "Routing"]
    }

    return(
        <div className={"version-component"}>
            <div className="current-version">Aktualna wersja aplikacji: {version}</div>
            <div>Strona wyłącznie w polskiej wersji językowej</div>
            <div className="updates">
                {
                    Object.keys(displayInfo).map((key) =>{
                        return(
                            <div className={`version ${key}`} key={key}>
                                <div className="version-title">{key}</div>
                                <ul>
                                    {
                                        displayInfo[key].map((el) =>{
                                            return(
                                                <li>{el}</li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default VersionInfo;