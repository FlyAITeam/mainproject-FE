'use client';
import React, { useEffect, useState } from 'react';
import { getCurrentLocation } from '@/libs/gpsManager';

const MapPage = () => {
  const [location, setLocation] = useState(null);
  const [hospitals, setHospitals] = useState([]);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [selectedPhoneNumber, setSelectedPhoneNumber] = useState(null); // 선택된 전화번호를 저장할 상태
  const [staticMapUrl, setStaticMapUrl] = useState(null); // 웹에서 경로 이미지를 표시하기 위한 URL 저장 상태

  useEffect(() => {
    // Tmap 초기화 함수 정의
    const initTmap = async () => {
      const currentLocation = await getCurrentLocation();
      setLocation(currentLocation);

      if (window.Tmapv2 && window.Tmapv2.Map) {
        // 지도 초기화
        const map = new window.Tmapv2.Map('map_div', {
          center: new window.Tmapv2.LatLng(currentLocation.latitude, currentLocation.longitude),
          width: '100%',
          height: '400px',
          zoom: 16,
        });

        // 현재 위치 마커 추가
        const currentMarker = new window.Tmapv2.Marker({
          position: new window.Tmapv2.LatLng(currentLocation.latitude, currentLocation.longitude),
          map: map,
          icon: '/icons/myMarker.png',
          iconSize: new window.Tmapv2.Size(32, 32),
          title: '내 위치',
        });

        // '동물병원' POI 통합 검색 요청
        const apiKey = process.env.NEXT_PUBLIC_TMAP_APP_KEY;
        const keyword = '동물병원';
        const poiSearchUrl = `https://apis.openapi.sk.com/tmap/pois?version=1&searchKeyword=${keyword}&centerLon=${currentLocation.longitude}&centerLat=${currentLocation.latitude}&appKey=${apiKey}`;

        try {
          const response = await fetch(poiSearchUrl);
          const data = await response.json();
          const pois = data.searchPoiInfo.pois.poi;

          // 각 POI의 상세 정보를 요청하여 twFlag 값을 가져오기
          const detailedPois = await Promise.all(
            pois.map(async (poi) => {
              const detailInfo = await fetchPoiDetails(poi.id, apiKey);
              return { ...poi, twFlag: detailInfo.twFlag };
            })
          );

          setHospitals(detailedPois);
          console.log('POI 검색 결과:', detailedPois);

          // POI 결과를 지도에 마커로 표시
          detailedPois.forEach((poi) => {
            const marker = new window.Tmapv2.Marker({
              position: new window.Tmapv2.LatLng(poi.frontLat, poi.frontLon),
              map: map,
              icon: '/icons/marker.png',
              iconSize: new window.Tmapv2.Size(24, 24),
              title: poi.name,
            });

            // 마커 클릭 시 POI 상세보기로 이동 및 전화번호 설정
            marker.addListener('click', () => {
              setSelectedHospital(poi);
              setSelectedPhoneNumber(poi.telNo); // 선택된 전화번호 설정
              setStaticMapUrl(null); // 새로운 마커를 클릭할 때 기존 URL을 초기화
            });
          });
        } catch (error) {
          console.error('Error fetching POI data:', error);
        }
      } else {
        console.error('TmapV2 library is not ready.');
      }
    };

    // Tmap이 로드된 후 초기화
    const checkReady = setInterval(() => {
      if (window.Tmapv2) {
        clearInterval(checkReady);
        initTmap();
      }
    }, 100);

    return () => clearInterval(checkReady);
  }, []);

  const fetchPoiDetails = async (poiId, apiKey) => {
    try {
      const detailUrl = `https://apis.openapi.sk.com/tmap/pois/${poiId}?version=1&resCoordType=WGS84GEO&format=json&appKey=${apiKey}`;
      const response = await fetch(detailUrl);
      const data = await response.json();
      return data.poiDetailInfo;
    } catch (error) {
      console.error('Error fetching POI details:', error);
      return {};
    }
  };

  const openTmapNavigation = () => {
    if (!selectedHospital || !location) return;

    const apiKey = process.env.NEXT_PUBLIC_TMAP_APP_KEY;
    const startx = location.longitude;
    const starty = location.latitude;
    const goalx = selectedHospital.frontLon;
    const goaly = selectedHospital.frontLat;
    const goalname = encodeURIComponent(selectedHospital.name);

    const tmapUrl = `https://apis.openapi.sk.com/tmap/app/routes?appKey=${apiKey}&startx=${startx}&starty=${starty}&goalx=${goalx}&goaly=${goaly}&goalname=${goalname}`;

    window.open(tmapUrl, '_blank'); // 새 탭에서 Tmap 네비게이션 열기
  };

  const displayWebRoute = () => {
    if (!selectedHospital || !location) return;

    const apiKey = process.env.NEXT_PUBLIC_TMAP_APP_KEY;
    const startx = location.longitude;
    const starty = location.latitude;
    const goalx = selectedHospital.frontLon;
    const goaly = selectedHospital.frontLat;
    const width = 512; // 이미지 너비
    const height = 512; // 이미지 높이

    const staticMapUrl = `https://apis.openapi.sk.com/tmap/routeStaticMap?appKey=${apiKey}&startX=${startx}&startY=${starty}&endX=${goalx}&endY=${goaly}&reqCoordType=WGS84GEO&width=${width}&height=${height}`;

    setStaticMapUrl(staticMapUrl); // 웹에서 표시할 경로 이미지 URL 설정
  };

  return (
    <div>
      {/* Tmap 스크립트를 포함하여 실행 */}
      <div
        dangerouslySetInnerHTML={{
          __html: `
            <script src="https://apis.openapi.sk.com/tmap/jsv2?version=1&appKey=${process.env.NEXT_PUBLIC_TMAP_APP_KEY}"></script>
          `,
        }}
      />
      <div id="map_div" style={{ width: '100%', height: '400px' }}></div>
      {/* 검색 결과 출력 */}
      <div>
        <h2>Search Results:</h2>
        <ul>
          {hospitals.map((hospital) => (
            <li key={hospital.pkey}>
              {hospital.name} - ({hospital.telNo}) {hospital.newAddressList.newAddress[0].fullAddressRoad}, 거리 : {hospital.radius}km, 24시간여부: {hospital.twFlag === '1' ? 'Yes' : 'No'}
            </li>
          ))}
        </ul>
      </div>
      {selectedHospital && (
        <div>
          <h3>POI Detail Information</h3>
          <p>Name: {selectedHospital.name}</p>
          <p>Address: {selectedHospital.newAddressList.newAddress[0].fullAddressRoad}</p>
          <p>거리: {selectedHospital.radius}km</p>
          <p>Phone: {selectedHospital.telNo}</p>
          <p>24시간여부: {selectedHospital.twFlag === '1' ? 'Yes' : 'No'}</p>
          {/* 전화걸기 버튼 추가 */}
          {selectedPhoneNumber && (
            <p>
              <a href={`tel:${selectedPhoneNumber}`} style={{ color: 'blue', textDecoration: 'underline' }}>
                Call {selectedPhoneNumber}
              </a>
            </p>
          )}
          {/* 경로안내 버튼 추가 */}
          <button onClick={openTmapNavigation} style={{ marginTop: '10px', padding: '5px 10px' }}>
            경로 안내받기(앱으로 이동)
          </button>
          {/* 웹에서 경로 이미지를 표시하는 버튼 추가 */}
          <button onClick={displayWebRoute} style={{ marginTop: '10px', padding: '5px 10px', marginLeft: '10px' }}>
            웹에서 경로보기
          </button>
          {/* 경로 이미지 표시 */}
          {staticMapUrl && (
            <div style={{ marginTop: '10px' }}>
              <h4>Web-based Route Image</h4>
              <img src={staticMapUrl} alt="Route Map" style={{ width: '50%', maxHeight: '50%' }} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MapPage;
