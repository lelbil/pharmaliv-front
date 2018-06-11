import React from "react";
import { compose, withProps } from "recompose";
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker
} from "react-google-maps";
import { GOOGLE_API_KEY } from '../JS/constants'

export default compose(
    withProps({
        googleMapURL:
            `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}&v=3.exp&libraries=geometry,drawing,places`,
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `30vh` }} />,
        mapElement: <div style={{ height: `100%` }} />
    }),
    withScriptjs,
    withGoogleMap
)(props => (
    <GoogleMap defaultZoom={8} defaultCenter={{ lat: 48.8566, lng: 2.3522 }}>
        {
            props.pharmacies.map((location, index) => <Marker key={index} position={location}/>)
        }
    </GoogleMap>
));
