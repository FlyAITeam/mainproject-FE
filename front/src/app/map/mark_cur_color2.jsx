"use client";
import React, { useEffect, useState } from 'react';
import { getCurrentLocation } from '@/libs/hospitalMap';

export default function KakaoMap() {
  const [map, setMap] = useState(null); // State to store the map instance
  const [hospitals, setHospitals] = useState([]);
  const [location, setLocation] = useState(null);
  const [center, setCenter] = useState(null); // State to store the map's center location
  const [markers, setMarkers] = useState([]); // State to store the map markers
  const [selectedHospital, setSelectedHospital] = useState(null); // State to store the selected hospital info

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

          // Set the initial center to the current location
          setCenter({
            latitude: currentLocation.latitude,
            longitude: currentLocation.longitude,
          });

          // Add a red dot for the current location
          const currentLocationDot = new kakao.maps.CustomOverlay({
            map: mapInstance,
            position: new kakao.maps.LatLng(currentLocation.latitude, currentLocation.longitude),
            content: `<div style="width: 10px; height: 10px; background-color: red; border-radius: 50%;"></div>`,
          });

          // Listen for changes in the center position of the map
          kakao.maps.event.addListener(mapInstance, 'center_changed', () => {
            const newCenter = mapInstance.getCenter(); // Get the new center coordinates
            setCenter({
              latitude: newCenter.getLat(),
              longitude: newCenter.getLng(),
            });
            console.log('New Center:', newCenter);
          });
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

          for (let i = 0; i < result.length; i++) {
            console.log(result[i].place_url);
            
            // console.log(result[i].place_name);
            // console.log(result[i].address_name);
            // console.log(result[i].phone);
          }
          setHospitals(result);

          // Remove existing markers
          markers.forEach(marker => marker.setMap(null));
          setMarkers([]); // Clear markers state

          // Add new markers
          const newMarkers = result.map((hospital, index) => {
            const isRed = index >= 3; // Change marker color if it's the 4th or later
            const markerImage = isRed
              ? new kakao.maps.MarkerImage(
                  'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png',
                  new kakao.maps.Size(24, 35)
                )
              : null; // Default marker color is used when no image is provided

            const marker = new kakao.maps.Marker({
              map: map,
              position: new kakao.maps.LatLng(hospital.y, hospital.x),
              image: markerImage,
            });

            // Add click event to marker
            kakao.maps.event.addListener(marker, 'click', () => {
              console.log('hospital',hospital);
              setSelectedHospital(hospital); // Update the selected hospital info
            });

            return marker;
          });

          // Update markers state with new markers
          setMarkers(newMarkers);
        } else {
          console.error('Error searching for places:', status);
        }
      };

      if (center) {
        const options = {
          location: new kakao.maps.LatLng(center.latitude, center.longitude), // use the current center location
          radius: 2000, // search within 5km radius
        };

        ps.keywordSearch('동물병원', callback, options);
      } else {
        console.error('Center location is not available');
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
      {selectedHospital && (
        <div style={{ padding: '20px', backgroundColor: '#f9f9f9', borderTop: '1px solid #ccc' }}>
          <h2>{selectedHospital.place_name}</h2>
          <p>{selectedHospital.address_name}</p>
          <p>{selectedHospital.phone}</p>
        </div>
      )}
    </div>
  );
}
