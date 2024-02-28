import React from "react";
import { MapMarker, Map } from "react-kakao-maps-sdk";

const KakaoMap = (props) => {
    return (
        <Map center={{ lat: props.lat, lng: props.lng }} 
        style={{ width: "800px", height: "350px", margin:"0 auto"}}>
            <MapMarker position={{ lat: props.lat, lng: props.lng }}>
                <div style={{ color: "#000" }} class='info-text'>{props.address}</div>
            </MapMarker>
        </Map>
    );
};  

export default KakaoMap;