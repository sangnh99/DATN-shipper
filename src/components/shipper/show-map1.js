import React from "react";
import GoogleMapReact from 'google-map-react';

const coordinates = {lat : 16.0038912, lng: 108.199936};
export default function ShowMap1(props) {
    return (
        <div style={{marginLeft : props.marginLeft, marginBottom : props.marginBottom, height: props.height, width: props.width }}>
            <GoogleMapReact 
            bootstrapURLKeys={{key: 'AIzaSyAyvTvIJSyOspJ6_GHlvL3klcnJEnzNVXw'}}
            defaultCenter={{
                lat : props.lat,
                lng : props.lng
            }}
            center={{
                lat : props.lat,
                lng : props.lng
            }}
            defaultZoom={18}
            margin={[50, 50, 50, 50]}
            options={''}
            // onChange={''}
            // onChildClick={''}
            
            >
            <Marker lat={props.lat} lng={props.lng} />
            </GoogleMapReact>
        </div>
    );
}


const Marker = props => {
    return <div className="SuperAwesomePin"><span style={{fontSize : 40, color : "orange"}}><i class="fas fa-map-marker-alt"></i></span></div>
  }