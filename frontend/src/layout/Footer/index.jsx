import React, {useState} from 'react';
import Styles from './styles.module.css';
import StylesApp from "../../App.module.css"
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
        <footer className={`${Styles.footer} ${StylesApp.delimiter}`} >
            <div className={`${Styles.delimiterChild} ${StylesApp.delimiterChild} `}>
                <div>
                    <h3 className={Styles.footerTittle} >2021 @ World Guest Booking</h3>
                </div>
                <div className={Styles.icons}>
                    <a href="https://www.facebook.com/profile.php?id=100074545225635" target="_blank" rel="noreferrer"><img className={Styles.iconsImg} src={logoFacebook} alt="" /></a>
                    <a href="https://www.linkedin.com/in/world-guest-2b195b225/" target="_blank" rel="noreferrer"><img className={Styles.iconsImg} src={logoLinkedin} alt="" /></a>
                    <a href="https://twitter.com/WorldGuest2" target="_blank" rel="noreferrer"><img className={Styles.iconsImg} src={logoTwitter} alt="" /></a>
                    <a href="https://www.instagram.com/world_guest_booking/" target="_blank" rel="noreferrer"><img className={Styles.iconsImg} src={logoInstagram} alt="" /></a>
                    <img src={iconSocial} alt="iconSocial" className={`${Styles.iconsImg}`} onClick={openShareModal} />
                    <Share shareIsOpen={shareIsOpenFooter} placeShareCall={placeShareCall} setShareIsOpen={setShareIsOpenFooter} />
                </div>
            </div>
        </footer>
    );
}

export default Footer;