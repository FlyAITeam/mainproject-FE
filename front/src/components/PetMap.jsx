"use client";

import React, { Suspense, useEffect, useState } from "react";
import { getCurrentLocation } from "@/libs/gpsManager";

export const PetMap = (page) => {
  const [location, setLocation] = useState(null);
  const [hospitals, setHospitals] = useState([]);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [selectedPhoneNumber, setSelectedPhoneNumber] = useState(null);
  const [staticMapUrl, setStaticMapUrl] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hospitalMarkers, setHospitalMarkers] = useState([]);

  useEffect(() => {
    const initTmap = async () => {
      const currentLocation = await getCurrentLocation();
      setLocation(currentLocation);

      if (window.Tmapv2 && window.Tmapv2.Map) {
        const map = new window.Tmapv2.Map("map_div", {
          center: new window.Tmapv2.LatLng(
            currentLocation.latitude,
            currentLocation.longitude,
          ),
          width: "100%",
          height: "350px",
          zoom: 13,
        });

        // 현위치 마커 설정 (커스텀 아이콘 사용)
        const currentMarker = new window.Tmapv2.Marker({
          position: new window.Tmapv2.LatLng(
            currentLocation.latitude,
            currentLocation.longitude,
          ),
          map: map,
          icon: "/icons/myMarker.png", // 커스텀 현위치 아이콘
          iconSize: new window.Tmapv2.Size(48, 48),
          title: "내 위치",
        });

        const apiKey = process.env.NEXT_PUBLIC_TMAP_APP_KEY;
        const keyword = "동물병원";
        const poiSearchUrl = `https://apis.openapi.sk.com/tmap/pois?version=1&searchKeyword=${keyword}&centerLon=${currentLocation.longitude}&centerLat=${currentLocation.latitude}&appKey=${apiKey}`;

        try {
          const response = await fetch(poiSearchUrl);
          const data = await response.json();
          const pois = data.searchPoiInfo.pois.poi;

          const detailedPois = await Promise.all(
            pois.map(async (poi) => {
              const detailInfo = await fetchPoiDetails(poi.id, apiKey);
              return { ...poi, twFlag: detailInfo.twFlag };
            }),
          );

          setHospitals(detailedPois);

          // 병원 마커 설정 (기본 TMAP 마커 사용)
          const markers = detailedPois.map((poi) => {
            const marker = new window.Tmapv2.Marker({
              position: new window.Tmapv2.LatLng(poi.frontLat, poi.frontLon),
              map: map,
              title: poi.name,
            });

            marker.addListener("click", () => {
              handleHospitalSelection(poi, marker);
            });

            return marker;
          });

          setHospitalMarkers(markers);
        } catch (error) {
          console.error("Error fetching POI data:", error);
        }
      } else {
        console.error("TmapV2 library is not ready.");
      }
    };

    const checkReady = setInterval(() => {
      if (window.Tmapv2 && window.Tmapv2.Map) {
        clearInterval(checkReady);
        initTmap();
      }
    }, 100);

    return () => clearInterval(checkReady);
  }, [page]);

  const fetchPoiDetails = async (poiId, apiKey) => {
    try {
      const detailUrl = `https://apis.openapi.sk.com/tmap/pois/${poiId}?version=1&resCoordType=WGS84GEO&format=json&appKey=${apiKey}`;
      const response = await fetch(detailUrl);
      const data = await response.json();
      return data.poiDetailInfo;
    } catch (error) {
      console.error("Error fetching POI details:", error);
      return {};
    }
  };

  const handleHospitalSelection = (hospital, marker) => {
    // 이전에 선택된 마커를 원래 상태로 되돌림
    if (selectedHospital) {
      const prevMarker = hospitalMarkers.find(
        (m) => m.getTitle() === selectedHospital.name,
      );
    }

    // 선택된 마커를 크고 다른 색상으로 변경
    setSelectedHospital(hospital);
    setSelectedPhoneNumber(hospital.telNo);
    setStaticMapUrl(null);
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

    window.open(tmapUrl, "_blank");
  };

  const displayWebRoute = () => {
    if (!selectedHospital || !location) return;

    const apiKey = process.env.NEXT_PUBLIC_TMAP_APP_KEY;
    const startx = location.longitude;
    const starty = location.latitude;
    const goalx = selectedHospital.frontLon;
    const goaly = selectedHospital.frontLat;
    const width = 512;
    const height = 512;

    const staticMapUrl = `https://apis.openapi.sk.com/tmap/routeStaticMap?appKey=${apiKey}&startX=${startx}&startY=${starty}&endX=${goalx}&endY=${goaly}&reqCoordType=WGS84GEO&width=${width}&height=${height}`;

    setStaticMapUrl(staticMapUrl);
    setIsModalOpen(true); // 모달창 열기
  };

  const closeModal = () => {
    setIsModalOpen(false); // 모달창 닫기
  };

  const handleBackgroundClick = (event) => {
    if (event.target.classList.contains("modal")) {
      closeModal();
    }
  };

  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <style jsx>{`
          #map_div {
            width: 100%;
            height: 300px;
            margin-bottom: 16px;
            border-radius: 12px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          }
          .poi-details {
            border: 1px solid #e0e0e0;
            padding: 16px;
            min-height: 200px;
            background-color: #ffffff;
            border-radius: 12px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          }
          .poi-details h3 {
            margin-bottom: 12px;
            font-size: 18px;
            text-align: center;
            font-weight: 700;
          }
          .poi-details p {
            margin: 4px 0;
            font-size: 14px;
            color: #333;
          }
          .poi-details a {
            color: #4cd964;
            text-decoration: none;
            font-weight: bold;
          }
          .poi-details a:hover {
            text-decoration: underline;
          }
          .buttons {
            margin-top: 12px;
            text-align: center;
            display: flex;
            justify-content: space-around;
          }
          .modal {
            display: ${isModalOpen ? "flex" : "none"};
            position: fixed;
            z-index: 1000;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            overflow: auto;
            background-color: rgba(0, 0, 0, 0.5);
            align-items: center;
            justify-content: center;
          }
          .modal-content {
            background-color: #fefefe;
            padding: 16px;
            border: none;
            border-radius: 12px;
            max-width: 90%;
            width: 100%;
            text-align: center;
            position: relative;
          }
          .modal-content img {
            width: 100%;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          }
          .close {
            position: absolute;
            right: 16px;
            top: 16px;
            color: #aaa;
            font-size: 24px;
            font-weight: bold;
            cursor: pointer;
          }
          .close:hover,
          .close:focus {
            color: #000;
            text-decoration: none;
            cursor: pointer;
          }
          .empty-state {
            text-align: center;
            color: #888;
            font-size: 16px;
          }
        `}</style>

        <div
          dangerouslySetInnerHTML={{
            __html: `
            <script src="https://apis.openapi.sk.com/tmap/jsv2?version=1&appKey=${process.env.NEXT_PUBLIC_TMAP_APP_KEY}"></script>
          `,
          }}
        />
        <div className="poi-details">
          {selectedHospital ? (
            <>
              <h3>{selectedHospital.name}</h3>
              <p>
                <strong>주소:</strong>{" "}
                {selectedHospital.newAddressList.newAddress[0].fullAddressRoad}
              </p>
              <p>
                <strong>거리:</strong> {selectedHospital.radius}km
              </p>
              <p>
                <strong>24시간 운영:</strong>{" "}
                {selectedHospital.twFlag === "1" ? "O" : "X"}
              </p>
              {selectedPhoneNumber && (
                <p>
                  {/* 전화아이콘 */}
                  <a href={`tel:${selectedPhoneNumber}`}>
                    {selectedPhoneNumber} 전화하기
                  </a>
                </p>
              )}
              <div className="buttons">
                <DetailButton onClick={openTmapNavigation}>
                  경로 안내(앱)
                </DetailButton>
                <DetailButton onClick={displayWebRoute}>
                  경로 보기(웹)
                </DetailButton>
              </div>
            </>
          ) : (
            <div className="empty-state">병원을 선택해 주세요.</div>
          )}
        </div>

        <div id="map_div"></div>

        {/* 모달창 */}
        {isModalOpen && (
          <div className="modal" onClick={handleBackgroundClick}>
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <div className="modal-content">
              {staticMapUrl && <img src={staticMapUrl} alt="경로 지도" />}
            </div>
          </div>
        )}
      </Suspense>
    </div>
  );
};
