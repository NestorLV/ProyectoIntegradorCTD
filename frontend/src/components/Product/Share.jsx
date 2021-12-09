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
            return [`mailto:?Subject=Mira este alojamiento worldguestbooking.com.ar/product/${props.id}`,
            `https://www.facebook.com/sharer/sharer.php?u=[worldguestbooking.com.ar/product/${props.id}]`, `https://twitter.com/intent/tweet?text=[Mira este producto ]&url=[worldguestbooking.com.ar/product/${props.id}]&hashtags=[GranAlojamiento]`,
            `https://api.whatsapp.com/send?text=[Mira este alojamiento: worldguestbooking.com.ar/product/${props.id}]`]
        }
        else if (props.placeShareCall === "footer") {
            return [`mailto:?Subject=Mira esta aplicación worldguestbooking.com.ar`,
                `https://www.facebook.com/sharer/sharer.php?u=[worldguestbooking.com.ar]`, `https://twitter.com/intent/tweet?text=[Mira esta aplicación ]&url=[worldguestbooking.com.ar]&hashtags=[GranAlojamiento]`,
                `https://api.whatsapp.com/send?text=[Mira esta aplicación: worldguestbooking.com.ar]`]
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