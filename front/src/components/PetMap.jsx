"use client";

import React, { Suspense, useEffect, useState } from "react";
import { getCurrentLocation } from "@/libs/gpsManager";
import { DetailButton } from "./DetailButton";
import { Button } from "./Button";
import { Icon } from "./Icon";

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
      <style jsx>{`
        #map_div {
          width: 100%;
          height: 100%;
          border-radius: 12px;
          overflow: hidden;
        }
        .poi-details {
          margin-top: -12px;
          padding: 16px 18px;
          height: fit-content;
          background-color: #ffffff;
          border-radius: 12px;
        }
        .poi-details h3 {
          margin-bottom: 12px;
          text-align: center;
          font-weight: semibold;
        }
        .poi-details p {
          margin: 4px 0;
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
            <h3 className="font-bold">{selectedHospital.name}</h3>
            <p className="w-full text-sm text-left border-b py-1">
              <strong>주소 :</strong>{" "}
              <span className="font-semibold text-[#333]">
                {selectedHospital.newAddressList.newAddress[0].fullAddressRoad}
              </span>
            </p>
            <p className="w-full text-sm text-left border-b py-1">
              <strong>거리 : </strong>
              <span className="font-semibold text-[#333]">
                {selectedHospital.radius}km
              </span>
            </p>
            <p className="w-full text-sm text-left border-b py-1">
              <strong>24시간 운영 :</strong>{" "}
              {selectedHospital.twFlag === "1" ? (
                <span className="text-green font-semibold">예</span>
              ) : (
                <span className="text-red font-semibold">아니오</span>
              )}
            </p>
            {selectedPhoneNumber && (
              <p>
                <a
                  className="flex flex-row gap-1 text-sm text-left py-1 items-center"
                  href={`tel:${selectedPhoneNumber}`}
                >
                  <Icon icon="call" size={16} />
                  {selectedPhoneNumber}
                </a>
              </p>
            )}
            <div className="w-full flex flex-row gap-4 mt-4">
              <Button className="w-full" onClick={openTmapNavigation}>
                경로 안내(앱)
              </Button>
              <Button
                preset="reversed"
                className="w-full"
                onClick={displayWebRoute}
              >
                경로 보기(웹)
              </Button>
            </div>
          </>
        ) : (
          <div className="empty-state">가까운 병원을 선택해 주세요!</div>
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
    </div>
  );
};
