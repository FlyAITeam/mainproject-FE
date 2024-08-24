'use client';
import React, { useEffect, useState } from 'react';
import { getCurrentLocation } from '@/libs/gpsManager';

const MapPage = () => {
  const [location, setLocation] = useState(null);
  const [hospitals, setHospitals] = useState([]);

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
        console.log('Map initialized:', map);

        // 현재 위치 마커 추가
        const currentMarker = new window.Tmapv2.Marker({
          position: new window.Tmapv2.LatLng(currentLocation.latitude, currentLocation.longitude),
          map: map,
          icon: '/icons/myMarker.png', // 로컬 public 디렉토리에 있는 마커 아이콘 경로
          iconSize: new window.Tmapv2.Size(32, 32), // 마커 아이콘 크기 조절
          title: '내 위치', // 마커 제목
        });

        // '동물병원' POI 통합 검색 요청
        const apiKey = process.env.NEXT_PUBLIC_TMAP_APP_KEY;
        const keyword = '동물병원';
        const poiSearchUrl = `https://apis.openapi.sk.com/tmap/pois?version=1&searchKeyword=${keyword}&centerLon=${currentLocation.longitude}&centerLat=${currentLocation.latitude}&appKey=${apiKey}`;

        try {
          const response = await fetch(poiSearchUrl);
          const data = await response.json();
          const pois = data.searchPoiInfo.pois.poi;
          setHospitals(pois);

          // POI 결과를 지도에 마커로 표시
          pois.forEach((poi) => {
            console.log('POI:', poi.id);
            const marker = new window.Tmapv2.Marker({
              position: new window.Tmapv2.LatLng(poi.frontLat, poi.frontLon),
              map: map,
              icon: '/icons/marker.png', // 로컬 public 디렉토리에 있는 마커 아이콘 경로
              iconSize: new window.Tmapv2.Size(24, 24), // 마커 아이콘 크기 조절
              title: poi.name, // 마커 제목
            });

            // 마커 클릭 시 POI 상세보기로 이동
            marker.addListener('click', () => {
              const detailUrl = `https://apis.openapi.sk.com/tmap/app/poidetail?appKey=${apiKey}&poiId=${poi.id}`;
              window.open(detailUrl, '_blank'); // 새 창에서 POI 상세보기 페이지 열기
            });

            console.log('Marker added:', marker);
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

  return (
    <div>
      <h1>Tmap Integration Example</h1>
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
            <li key={hospital.id}>
              {hospital.name} - {hospital.newAddress}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MapPage;
