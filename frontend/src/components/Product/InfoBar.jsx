import StylesApp from "../../App.module.css";
import Styles from "./styles.module.css";

function InfoBar(props) {
    return(
        <div className={`${Styles.infoBar} ${StylesApp.delimiter}`}>
            <div className={`${Styles.infoBarChild} ${StylesApp.delimiterChild}`}>
                <h2>¿Qué tenés que saber?</h2>
                <div className={Styles.info}>
                    <div >
                        <h3>Normas de la casa</h3>
                        {props.rules.split(',').map((e,index)=><p key={index}>{e}</p>)}
                    </div>
                    <div >
                        <h3>Salud y Seguridad</h3>
                        {props.health.split(',').map((e,index)=><p key={index}>{e}</p>)}
                    </div>
                    <div >
                        <h3>Política de Cancelación</h3>
                        {props.politics.split(',').map((e,index)=><p key={index}>{e}</p>)} 
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InfoBar;