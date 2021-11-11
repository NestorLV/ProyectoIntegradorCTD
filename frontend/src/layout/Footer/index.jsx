import React, {useState} from 'react';
import Styles from './styles.module.css';
import StylesApp from "../../App.module.css"
import StylesLayout from "../styles.module.css"
import logoFacebook from "./img/icon facebook.png";
import logoLinkedin from "./img/icon linkedin.png";
import logoTwitter from "./img/tweet.png";
import logoInstagram from "./img/icon ig.png"
import Share from '../../components/Product/Share';
import iconSocial from "./img/icon-social.svg"

function Footer({ showBurger }) {
    const [shareIsOpenFooter, setShareIsOpenFooter]= useState(false);
    const openShareModal = (() => { setShareIsOpenFooter(true)});
    let placeShareCall="footer"

    return (
        <footer className={`${Styles.footer} ${showBurger === true ? StylesLayout.opacity:null} ${StylesApp.delimiter}`} >
            <div className={`${Styles.delimiterChild} ${StylesApp.delimiterChild} `}>
                <div>
                    <h3 className={Styles.footerTittle} >2021 @ World Guest Booking</h3>
                </div>
                <div className={Styles.icons}>
                    <img src={iconSocial} alt="iconSocial" className={`${Styles.iconsImg}`} onClick={openShareModal} />
                    <Share shareIsOpen={shareIsOpenFooter} placeShareCall={placeShareCall} setShareIsOpen={setShareIsOpenFooter} />
                    <img className={Styles.iconsImg} src={logoFacebook} alt="" />
                    <img className={Styles.iconsImg} src={logoLinkedin} alt="" />
                    <img className={Styles.iconsImg} src={logoTwitter} alt="" />
                    <img className={Styles.iconsImg} src={logoInstagram} alt="" />
                </div>
            </div>

        </footer>
    );
}

export default Footer;