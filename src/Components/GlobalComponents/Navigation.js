import React, {useEffect, useState} from 'react';
import Logo from "./Navigation/Logo";
import Menu from "./Form/Menu";
import cityListJSON from "../../DataJSON/myCities.json";
import MobileMenu from "./Form/MobileMenu";
import MenuLinks from "./Form/MenuLinks";
import {Link} from "react-router-dom";

function Navigation(props){

    //state formularza:
    const [cities, setCities] = useState([]);
    const [sortedCities, setSortedCities] = useState([]);

    //Resize okna, aby dynamicznie zmieniać stylowanie na mobilne
    //UseEffect na każdy resize zmienia informacje o tym czy okno jest mniejsze/ większe niż 1024px

    const mobileString = "(max-width: 1024px)";
    const [isMobile, setIsMobile] = useState({ mobile: window.matchMedia(mobileString).matches });

    useEffect(() => {
        const handler = () => {
            setIsMobile({mobile: window.matchMedia(mobileString).matches});
            console.log("resize",isMobile);
        };

        const mouseHandler= () =>{
            setIsMobile({mobile: window.matchMedia(mobileString).matches});
            window.removeEventListener('mousemove', mouseHandler);
        }
        window.addEventListener('resize', handler);
        window.addEventListener('mousemove', mouseHandler);

        return () => {
            window.removeEventListener('resize', handler);

        }
    },[])

    useEffect(() => {
        cityListJSON.map(elem => {
            setCities(prevState => ([
                ...prevState,
                {
                    id : elem.id,
                    city: elem.city
                }
            ]));
        })

    },[])

    useEffect(()=>{
        cities.sort(function(a, b){
            if(a.city < b.city) { return -1; }
            if(a.city > b.city) { return 1; }
            return 0;
        });
    },[cities])

    useEffect(() => {
        setSortedCities(cities);
    },[cities])

    //koniec sekcji state form


    return (
        <React.Fragment>
            {!isMobile.mobile && <nav className="desktop">
                <div className="responsive">
                    <Link to="/">
                        <Logo/>
                    </Link>
                    <Menu currentSelectedId={props.currentSelectedId} changeHandler={props.changeHandler} city={props.city}/>
                </div>
            </nav>}

            {isMobile.mobile && <React.Fragment>
                <nav className="mobile">
                    <Link to="/">
                        <Logo/>
                    </Link>
                    <MobileMenu currentSelectedId={props.currentSelectedId} changeHandler={props.changeHandler} city={props.city}/>
                </nav>
                <MenuLinks/>
            </React.Fragment>
            }
        </React.Fragment>
    )

}

export default Navigation;