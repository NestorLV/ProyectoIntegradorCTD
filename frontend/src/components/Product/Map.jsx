import { useState, memo } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';

function Map(props) {
  const { latitude, longitude, zoom, name, address } = props;
  const center = { lat: latitude, lng: longitude };

  const containerStyle = { width: '100%', height: '400px' };

  const [visiblePopUp, setVisiblePopUp] = useState(false);
  const divStyle = { background: `white`, padding: 15 }

  return (
    /*<LoadScript googleMapsApiKey="AIzaSyDoTLld8oN8wZm0avj07nwEv0FXqdfiaOE" loadingElement={<p>Cargando</p>}>*/ 
    <LoadScript googleMapsApiKey="AIzaSyD6n6RMOFrebn6b3rWMi5B_xnAWXDmnr4k" loadingElement={<p>Cargando</p>}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={zoom} onClick={() => setVisiblePopUp(false)}>
        { /* Child components, such as markers, info windows, etc. */}
        <Marker position={{ lat: latitude, lng: longitude }} onClick={() => setVisiblePopUp(!visiblePopUp)} />
        {visiblePopUp ?
          <InfoWindow position={{ lat: latitude, lng: longitude }} onCloseClick={() => setVisiblePopUp(!visiblePopUp)}>
            <div style={divStyle}>
              <h1>{name}</h1>
              <p>{address}</p>
            </div>
          </InfoWindow>
          : null}

      </GoogleMap>
    </LoadScript>
  )
}

export default memo(Map)