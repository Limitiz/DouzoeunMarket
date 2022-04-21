import React, { useEffect } from "react";
import "./Location.css";

const { kakao } = window;

const Location = ({ deliver }) => {
  const { locationX, locationY } = deliver;
  console.log(locationX);

  useEffect(() => {
    const container = document.getElementById("map");
    const options = {
      center: new kakao.maps.LatLng(locationX, locationY),
      level: 3,
    };

    const map = new kakao.maps.Map(container, options);
    const markerPosition = new kakao.maps.LatLng(locationX, locationY);
    const marker = new kakao.maps.Marker({
      position: markerPosition,
    });
    marker.setMap(map);
  });

  return (
    <div>
      <div id="map" style={{ width: "500px", height: "400px" }}></div>
    </div>
  );
};

export default Location;
