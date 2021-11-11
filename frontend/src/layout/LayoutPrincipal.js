import Styles from "./styles.module.css";
import { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";

export default function LayoutPrincipal(props) {
    const [showBurger, setShowBurger] = useState(false)

    return (
        <div className={showBurger === true ? Styles.opacity : null}>            
                <Header isLogged={props.isLogged} showBurger={showBurger} setShowBurger={setShowBurger} handleClean={props.handleClean} handleFavourite={props.handleFavourite}/>
                <main>
                    {props.children}
                </main>
                <Footer showBurger={showBurger} />           
        </div>
    )
}