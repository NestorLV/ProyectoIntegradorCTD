import { Modal } from 'react-responsive-modal'
import { Carousel } from "react-responsive-carousel"
import "./carouselModal.css"
import "react-responsive-carousel/lib/styles/carousel.min.css";
import 'react-responsive-modal/styles.css';

export default function CarouselModal({setCurrentImage, setViewerIsOpen, viewerIsOpen, images}) {

    const closeLightbox = () => {
        setCurrentImage(0);
        setViewerIsOpen(false);
    };

    return (
        <Modal open={viewerIsOpen} onClose={closeLightbox} center>
            <div>
                <div className={`closeButton`} onClick={closeLightbox}>X</div>
                <Carousel
                    statusFormatter={(current, total) => `${current}/${total}`}
                    autoPlay={true}
                    showIndicators={false}
                    interval={3000}
                    thumbWidth={150}
                    stopOnHover={true}
                    emulateTouch={true}
                    infiniteLoop={true}
                    useKeyboardArrows={true}
                >
                    {images.map((image, index) => {
                        return (<div key={`image-${index}`}>
                            <img src={image.url} alt={`img-alojamiento-${index}`} />
                        </div>)
                    })}

                </Carousel>
            </div>
        </Modal>
    )
}

