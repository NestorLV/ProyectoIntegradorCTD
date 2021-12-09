import Map from "../Product/Map";
import Styles from "./styles.module.css";
import { Modal } from 'react-responsive-modal'
import 'react-responsive-modal/styles.css';

export default function MapModal({ mapIsOpen, latitude, longitude, closeMapModal, name, address }) {

    return (
        <Modal open={mapIsOpen} onClose={closeMapModal} center >
            <div className={Styles.containerModalMap}>
                <Map style= {{"width":"250px"}} latitude={latitude} longitude={longitude} zoom={15} name={name} address={address} />
            </div>

        </Modal>
    )
}

