import Styles from "./styles.module.css";
import facebook from "./icons/facebook.svg";
import twitter from "./icons/twitter.svg";
import whatsapp from "./icons/whatsapp.svg";
import email from "./icons/email.png";
import { Modal } from 'react-responsive-modal'
import 'react-responsive-modal/styles.css';

export default function Share(props) {

    function urlValue() {
        if (props.placeShareCall === "producto") {
            return [`mailto:?Subject=Mira este alojamiento localhost:3000/product/${props.id}`,
            `https://www.facebook.com/sharer/sharer.php?u=[localhost:3000/product/${props.id}]`, `https://twitter.com/intent/tweet?text=[Mira este producto ]&url=[localhost:3000/product/${props.id}]&hashtags=[GranAlojamiento]`,
            `https://api.whatsapp.com/send?text=[Mira este alojamiento: localhost:3000/product/${props.id}]`]
        }
        else if (props.placeShareCall === "footer") {
            return [`mailto:?Subject=Mira esta aplicación localhost:3000`,
                `https://www.facebook.com/sharer/sharer.php?u=[localhost:3000]`, `https://twitter.com/intent/tweet?text=[Mira esta aplicación ]&url=[localhost:3000]&hashtags=[GranAlojamiento]`,
                `https://api.whatsapp.com/send?text=[Mira esta aplicación: localhost:3000]`]
        }
    }

    console.log();

    const closeShare = () => {
        props.setShareIsOpen(false);
    };
    return (
        <Modal open={props.shareIsOpen} onClose={closeShare} center>
            <div className={Styles.containerSharePrincipal}>
                <h3>Compartir</h3>
                <div className={Styles.containerShare}>
                    <div className={Styles.shareBlock}>
                        <div className={Styles.shareItem}>
                            <a href={urlValue()[0]} target="_blank" rel="noreferrer"><img src={email} alt="logo email" /></a>
                            <p>Correo</p>
                        </div>
                        <div className={Styles.shareItem}>
                        <a href={urlValue()[1]} target="_blank" rel="noreferrer"><img src={facebook} alt="logo facebook" /></a>
                            <p>Facebook</p>
                        </div>
                    </div>
                    <div className={Styles.shareBlock}>
                        <div className={Styles.shareItem}>
                        <a href={urlValue()[2]} target="_blank" rel="noreferrer"><img src={twitter} alt="logo twitter" /></a>
                            <p>Twitter</p>
                        </div>
                        <div className={Styles.shareItem}>
                        <a href={urlValue()[3]} target="_blank" rel="noreferrer"><img src={whatsapp} alt="logo whatsapp" /></a>
                            <p>Whatsapp</p>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    )
}