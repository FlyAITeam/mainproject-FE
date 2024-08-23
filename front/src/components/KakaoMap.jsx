"use client";
import React, { useEffect, useState, useCallback } from 'react';
import { getCurrentLocation } from '@/libs/hospitalMap';
import { Button } from '.';

export default function KakaoMap() {
  const [map, setMap] = useState(null);
  const [hospitals, setHospitals] = useState([]);
  const [location, setLocation] = useState(null);
  const [center, setCenter] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [selectedMarker, setSelectedMarker] = useState(null);

  useEffect(() => {
    const loadMap = async () => {
      try {
        const currentLocation = await getCurrentLocation();
        setLocation(currentLocation);

        const apiKey = process.env.NEXT_PUBLIC_KAKAO_APP_KEY;
        const script = document.createElement('script');
        script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&autoload=false&libraries=services,clusterer,drawing`;
        document.head.appendChild(script);

        script.onload = () => {
          kakao.maps.load(() => {
            const container = document.getElementById('map');
            const options = {
              center: new kakao.maps.LatLng(currentLocation.latitude, currentLocation.longitude),
              level: 6,
            };
            const mapInstance = new kakao.maps.Map(container, options);
            setMap(mapInstance);

            setCenter({
              latitude: currentLocation.latitude,
              longitude: currentLocation.longitude,
            });

            new kakao.maps.CustomOverlay({
              map: mapInstance,
              position: new kakao.maps.LatLng(currentLocation.latitude, currentLocation.longitude),
              content: `<div style="width: 12px; height: 12px; background-color: #FF0000; border-radius: 50%;"></div>`,
            });

            kakao.maps.event.addListener(mapInstance, 'center_changed', () => {
              const newCenter = mapInstance.getCenter();
              setCenter({
                latitude: newCenter.getLat(),
                longitude: newCenter.getLng(),
              });
            });

            searchHospital();
          });
        };

        return () => {
          document.head.removeChild(script);
          if (map) {
            map.destroy();
          }
        };
      } catch (error) {
        console.error('Error loading map or fetching location:', error);
      }
    };

    loadMap();
  }, []);

  const searchHospital = useCallback(() => {
    if (!map || !center) return;

    kakao.maps.load(() => {
      const ps = new kakao.maps.services.Places();
      const callback = (result, status) => {
        if (status === kakao.maps.services.Status.OK) {
          const sortedResults = result.sort((a, b) => a.distance - b.distance);
          setHospitals(sortedResults);

          markers.forEach(marker => marker.setMap(null));
          setMarkers([]);

          const newMarkers = sortedResults.map((hospital) => {
            const markerImage = new kakao.maps.MarkerImage(
              'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png',
              new kakao.maps.Size(24, 35)
            );

            const marker = new kakao.maps.Marker({
              map: map,
              position: new kakao.maps.LatLng(hospital.y, hospital.x),
              image: markerImage,
            });

            kakao.maps.event.addListener(marker, 'click', () => {
              handleMarkerClick(marker, hospital);
            });

            return marker;
          });

          setMarkers(newMarkers);
        } else {
          console.error('Error searching for places:', status);
        }
      };

      const options = {
        location: new kakao.maps.LatLng(center.latitude, center.longitude),
        radius: 2000,
      };

      ps.keywordSearch('동물병원', callback, options);
    });
  }, [map, center, markers, selectedMarker]);

  const handleMarkerClick = (marker, hospital) => {
    if (!marker) {
      console.error('Marker is null or undefined');
      return;
    }

    if (selectedMarker) {
      selectedMarker.setImage(
        new kakao.maps.MarkerImage(
          'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png',
          new kakao.maps.Size(24, 35)
        )
      );
    }

    map.setCenter(new kakao.maps.LatLng(hospital.y, hospital.x));
    marker.setImage(
      new kakao.maps.MarkerImage(
        'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png',
        new kakao.maps.Size(24, 35)
      )
    );

    setSelectedMarker(marker);
    setSelectedHospital(hospital);
    scrollToHospital(hospital.id);
  };

  const scrollToHospital = (hospitalId) => {
    const element = document.getElementById(`hospital-${hospitalId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const formatDistance = (distance) => {
    return `${(distance / 1000).toFixed(1)} km`;
  };

  const handlePhoneClick = (hospital) => {
    if (hospital.phone) {
      const confirmCall = window.confirm(`${hospital.place_name}에 전화를 거시겠습니까?\n전화번호: ${hospital.phone}`);
      if (confirmCall) {
        window.location.href = `tel:${hospital.phone}`;
      }
    } else {
      alert('전화번호가 없습니다.');
    }
  };

  const handleLinkClick = (hospital) => {
    const confirmNavigate = window.confirm(`${hospital.place_name}의 카카오맵으로 이동하시겠습니까?`);
    if (confirmNavigate) {
      window.open(hospital.place_url, '_blank');
    }
  };

  return (
    <div className="flex flex-col h-full shadow-lg rounded-lg overflow-hidden">
      <Button onClick={searchHospital}>
        검색
      </Button>
      <div id="map" className="flex-1 w-full h-2/3 rounded-t-lg overflow-hidden" style={{ borderRadius: '16px 16px 0 0' }}></div>
      <div className="overflow-y-auto border-t border-gray-200 bg-gray-50 h-1/3">
        {hospitals.map((hospital) => (
          <div
            key={hospital.id}
            id={`hospital-${hospital.id}`}
            className={`p-4 cursor-pointer flex justify-between items-center transition-colors duration-200 ease-in-out ${
              selectedHospital && selectedHospital.id === hospital.id ? 'bg-blue-100' : 'bg-white hover:bg-gray-100'
            }`}
            onClick={() => handleMarkerClick(markers.find(marker => marker.getPosition().equals(new kakao.maps.LatLng(hospital.y, hospital.x))), hospital)}
          >
            <div>
              <h2 className="text-lg font-semibold text-gray-800">{hospital.place_name}</h2>
              <p className="text-sm text-gray-600">{hospital.address_name}</p>
              <p className="text-sm text-gray-500">{formatDistance(hospital.distance)}</p>
            </div>
            <div className="flex items-center space-x-3">
              <img
                src="https://img.icons8.com/ios-glyphs/60/000000/phone.png"
                alt="전화기 아이콘"
                className="w-6 h-6 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation(); // 부모 요소로의 이벤트 전파를 막음
                  handlePhoneClick(hospital);
                }}
              />
              <img
                src="https://img.icons8.com/ios-glyphs/60/000000/marker.png"
                alt="지도 아이콘"
                className="w-6 h-6 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  handleLinkClick(hospital);
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
