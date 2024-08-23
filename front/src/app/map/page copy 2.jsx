"use client";
import React, { useEffect, useState } from 'react';
import { getCurrentLocation } from '@/libs/hospitalMap';

export default function KakaoMap() {
  const [map, setMap] = useState(null); // State to store the map instance
  const [hospitals, setHospitals] = useState([]);
  const [location, setLocation] = useState(null);
  const [activeInfoWindow, setActiveInfoWindow] = useState(null); // To keep track of the active InfoWindow

  useEffect(() => {
    const loadMap = async () => {
      // Fetch the current location
      const currentLocation = await getCurrentLocation();
      console.log('Current Location:', currentLocation);
      setLocation(currentLocation);

      const apiKey = process.env.NEXT_PUBLIC_KAKAO_APP_KEY;
      const script = document.createElement('script');
      script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&autoload=false&libraries=services,clusterer,drawing`;
      document.head.appendChild(script);

      let mapInstance;
      script.onload = () => {
        kakao.maps.load(() => {
          let container = document.getElementById('map');
          let options = {
            center: new kakao.maps.LatLng(currentLocation.latitude, currentLocation.longitude),
            level: 3,
          };
          mapInstance = new kakao.maps.Map(container, options);
          setMap(mapInstance); // Save the map instance to state
        });
      };

      // Cleanup function to run when component unmounts
      return () => {
        if (mapInstance) {
          mapInstance = null;
        }
        document.head.removeChild(script);
      };
    };

    loadMap();
  }, []);

  const searchHospital = () => {
    kakao.maps.load(() => {
      const ps = new kakao.maps.services.Places(); // Instantiate Places service
      const callback = (result, status) => {
        if (status === kakao.maps.services.Status.OK) {
          console.log(result);
          setHospitals(result);

          // Place markers and InfoWindow for each hospital on the map
          result.forEach(hospital => {
            const marker = new kakao.maps.Marker({
              map: map,
              position: new kakao.maps.LatLng(hospital.y, hospital.x),
            });

            const infoWindow = new kakao.maps.InfoWindow({
              content: `<div style="padding:5px;font-size:12px;">${hospital.place_name}<br>${hospital.road_address_name || hospital.address_name}</div>`
            });

            kakao.maps.event.addListener(marker, 'click', () => {
              // Close the currently open InfoWindow, if any
              if (activeInfoWindow) {
                activeInfoWindow.close();
              }
              // Open the new InfoWindow and set it as the active one
              infoWindow.open(map, marker);
              setActiveInfoWindow(infoWindow);
            });
          });
        } else {
          console.error('Error searching for places:', status);
        }
      };

      if (location) {
        const options = {
          location: new kakao.maps.LatLng(location.latitude, location.longitude), // use the user's current location
          radius: 5000, // search within 5km radius
        };

        ps.keywordSearch('동물병원', callback, options);
      } else {
        console.error('Location is not available');
      }
    });
  };

  return (
    <div>
      <div>
        <button
          onClick={searchHospital}
          style={{
            backgroundColor: 'blue',
            color: 'white',
            width: '100px',
            height: '50px',
            borderRadius: '10px',
            fontSize: '20px',
          }}
        >
          동물병원 검색
        </button>
      </div>
      <div id="map" style={{ width: '100%', height: '400px' }}></div>
    </div>
  );
}
