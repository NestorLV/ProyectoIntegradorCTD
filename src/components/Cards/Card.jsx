import React from 'react';
import './styles.css';
import iconWifi from "./img/iconWifi.svg";
import iconHeart from "./img/iconHeart.svg";
import iconStar from "./img/iconStar.svg";
import iconEight from "./img/iconEight.svg";
import iconRectangle from "./img/iconRectangle.svg";
import iconLocation from "./img/IconLocation.svg";
import iconSwimming from "./img/iconSwimming.svg";

function Card(props) {
    const { img, category, title, location, description } = props;
    return (
        <div className="cardBox">
            <div className="cardImage">
                <img className="image" src={img} alt="" />

                <img className="iconHeart" src={iconHeart} alt="" />
                {/* Coloqué la imagen svg acá en html para ver el icono del corazón de alguna forma, pero es provisorio" */}
                <svg width="25" height="23" viewBox="0 0 25 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g filter="url(#filter0_d_139:1019)">
                        <path d="M12.5 19L10.9718 17.6394C9.23005 16.0844 7.96479 14.9344 7.17606 14.1893C6.38732 13.4442 5.5 12.5209 4.51408 11.4194C3.56103 10.318 2.90376 9.32992 2.54225 8.45524C2.18075 7.54817 2 6.62489 2 5.68542C2 4.09804 2.54225 2.75362 3.62676 1.65217C4.74413 0.550725 6.12441 0 7.76761 0C9.67371 0 11.2512 0.7289 12.5 2.1867C13.7488 0.7289 15.3263 0 17.2324 0C18.8756 0 20.2394 0.550725 21.3239 1.65217C22.4413 2.75362 23 4.09804 23 5.68542C23 6.94885 22.5728 8.26087 21.7183 9.62148C20.8638 10.9821 19.9272 12.1645 18.9084 13.1688C17.9225 14.1731 16.2958 15.6795 14.0282 17.688L12.5 19Z" fill="white" />
                    </g>
                    <defs>
                        <filter id="filter0_d_139:1019" x="0" y="0" width="25" height="23" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                            <feFlood flood-opacity="0" result="BackgroundImageFix" />
                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                            <feOffset dy="2" />
                            <feGaussianBlur stdDeviation="1" />
                            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_139:1019" />
                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_139:1019" result="shape" />
                        </filter>
                    </defs>
                </svg>
            </div>

            <div className="cardInfo">
                <div className="cardHeaderBox">
                    <div className="cardHeadline">
                        <div className="cardCategory">
                            <p>{category}</p>
                            <img src={iconStar} alt="" />
                            <img src={iconStar} alt="" />
                            <img src={iconStar} alt="" />
                            <img src={iconStar} alt="" />
                            <img src={iconStar} alt="" />
                        </div>
                        <div className="cardName">{title}</div>
                    </div>
                    <div className="cardScore">
                        <div className="cardScoreNumber">
                            <img className="iconEight" src={iconEight} alt="" />
                            <img className="iconRectangle" src={iconRectangle} alt="" />
                        </div>
                        <div className="cardScoreWords">Muy Bueno</div>
                    </div>
                </div>
                <div className="cardLocation">
                    <img class="iconLocation" src={iconLocation} alt="" />
                    {location}
                    <span>mostrar en el mapa</span>
                </div>
                <div className="cardIcons">
                    <img src={iconWifi} alt="" />
                    <img className="iconSwimming" src={iconSwimming} alt="" />
                </div>
                <div className="cardDescription">
                    En el corazón de San Telmo, disfruta de un albergue inspirado en las pasiones de Buenos Aires.
                    <span>más...</span>
                </div>
                <button className="cardButton2">Ver más</button>
            </div>
        </div>
    );
}

export default Card;