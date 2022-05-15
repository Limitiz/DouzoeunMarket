import React, { useEffect } from "react";
import "../../css/Location.scss";

const { kakao } = window;
const Location = ({ deliver }) => {
  const address = deliver.address;
  //console.log(locationX);

  useEffect(() => {
    var container = document.getElementById("map"),
      mapOption = {
        center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
        level: 3, // 지도의 확대 레벨
      };
    var map = new kakao.maps.Map(container, mapOption);

    var geocoder = new kakao.maps.services.Geocoder();

    console.log(deliver.address);

    geocoder.addressSearch(address, function (result, status) {
      console.log("맵 주소 위도경도 변환 함수 실행");
      if (status === kakao.maps.services.Status.OK) {
        var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
        const marker = new kakao.maps.Marker({
          position: coords,
          map: map,
        });
        var infowindow = new kakao.maps.InfoWindow({
          content: `<div style="width:100%;height:50px;text-align:center;padding:6px 6px;">${deliver.address}</div>`,
        });
        infowindow.open(map, marker);
        marker.setMap(coords);
      }
    });
  }, [address]);

  return (
    <div className="mapContainer">
      <div id="map" style={{ width: "350px", height: "350px" }}></div>
    </div>
  );
};

export default Location;
