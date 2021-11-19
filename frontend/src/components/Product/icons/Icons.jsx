import wifi from './wifi.svg';
import pool from './pool.svg';
import kitchen from './kitchen.svg';
import tv from './tv.svg';
import ac from './ac.svg';
import pet from './pet.svg';
import parking from './parking.svg';
import creditCard from './creditCard.svg';
import smoke from './smoke.svg';
import party from './party.svg';
import checkin from './checkIn.svg';
import noSmoke from './noSmoke.svg';

export default function Icons(n){
    let iconsList = [
        <img src={wifi} alt=""/>,
        <img src={pool} alt=""/>,
        <img src={kitchen} alt=""/>,
        <img src={tv} alt=""/>,
        <img src={ac} alt=""/>,
        <img src={pet} alt=""/>,
        <img src={parking} alt=""/>,
        <img src={creditCard} alt=""/>,
        <img src={smoke} alt=""/>,
        <img src={party} alt=""/>,
        <img src={checkin} alt=""/>,
        <img src={noSmoke} alt=""/>
    ]
    return iconsList[n];
}
