import StylesApp from "../../App.module.css";
import Styles from "./styles.module.css";
import Map from "./Map"

function MapBar(props) {
    return (
        <div className={`${Styles.mapBar} ${StylesApp.delimiter}`}>
            <div className={`${Styles.mapBarChild} ${StylesApp.delimiterChild}`}>
                <h2>¿Dónde vas a estar?</h2>
                <p>{props.city.name + " , " + props.city.country}</p>
                <div className={Styles.map}>
                    <Map latitude={props.latitude} longitude={props.longitude} zoom={15} name={props.name} address={props.address} />
                </div>
            </div>
        </div>

    )
}

export default MapBar;