import StylesApp from "../../App.module.css";
import Styles from "./styles.module.css";
import Icons from "./icons/Icons"

function FeaturesBar(props) {
    return (
        <div className={`${Styles.featuresBar} ${StylesApp.delimiter}`}>
            <div className={`${Styles.featuresBarChild} ${StylesApp.delimiterChild}`}>
                <h2>¿Qué ofrece este lugar?</h2>
                <div className={Styles.icons}>
                    {props.features.map((e) =>
                        <div className={Styles.featureBox} key={e.id}>
                            <div className={Styles.featureIcon}>{Icons(e.id - 1, "#F0572D")} </div>
                            <p className={Styles.featureTitle}>{e.title}</p>
                        </div>)
                    }
                </div>
            </div>
        </div>
    )
}

export default FeaturesBar;