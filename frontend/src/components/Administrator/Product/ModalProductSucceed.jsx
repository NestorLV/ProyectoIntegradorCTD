
import Styles from "./Styles.module.css"

export default function ProductModalSucceed ({title, message, closeModal, icon}){   
    return (
        <div className={Styles.containerCreateModal}>
            <div className={icon === "X" ? Styles.cruz : null}> {icon === "X"? icon : <img src={icon} alt="icon"/>}</div>
            <h3 >{title}</h3>
            <p>{message}</p>
            <button onClick={closeModal}>Ok</button>
        </div>
    )
}