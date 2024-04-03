import React, { useEffect, useState } from "react";

const KAKAO_SDK_URL = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_MAP_TOKEN}&libraries=services,clusterer&autoload=false`;

const KakaoMap = ({ location }: { location: string }) => {
  useEffect(() => {
    const kakaoMapScript = document.createElement("script");
    kakaoMapScript.async = false;
    kakaoMapScript.src = KAKAO_SDK_URL;

    document.head.appendChild(kakaoMapScript);

    const onLoadKakaoAPI = () => {
      window.kakao.maps.load(() => {
        var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });

        var container = document.getElementById("map") as HTMLElement;
        var options = {
          center: new window.kakao.maps.LatLng(33.450701, 126.570667),
          level: 3,
        };

        var map = new window.kakao.maps.Map(container, options);

        var ps = new kakao.maps.services.Places();

        ps.keywordSearch(location, placesSearchCB);

        // 키워드 검색 완료 시 호출되는 콜백함수 입니다
        function placesSearchCB(data: any, status: any, pagination: any) {
          if (status === kakao.maps.services.Status.OK) {
            // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
            // LatLngBounds 객체에 좌표를 추가합니다
            var bounds = new kakao.maps.LatLngBounds();

            if (data.length) {
              displayMarker(data[0]);
              bounds.extend(new kakao.maps.LatLng(data[0].y, data[0].x));
            }
            // for (var i = 0; i < data.length; i++) {
            //   displayMarker(data[i]);
            //   bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
            // }

            // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
            map.setBounds(bounds);
          }
        }

        // 지도에 마커를 표시하는 함수입니다
        function displayMarker(place: any) {
          // 마커를 생성하고 지도에 표시합니다
          var marker = new kakao.maps.Marker({
            map: map,
            position: new kakao.maps.LatLng(place.y, place.x),
          });

          // 마커에 클릭이벤트를 등록합니다
          kakao.maps.event.addListener(marker, "click", function () {
            // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
            infowindow.setContent(place.place_name);
            infowindow.open(map, marker);
          });
        }
      });
    };

    kakaoMapScript.addEventListener("load", onLoadKakaoAPI);
  }, [location]);

  return (
    <>
      <div id="map" style={{ width: "100%", height: "100%" }}></div>
    </>
  );
};

export default KakaoMap;
