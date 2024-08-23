"use client";

import Image from "next/image";
import { Screen } from "@/components";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getCurrentLocation } from "@/libs/hospitalMap";

export default function Page() {
  const router = useRouter();
  const [location, setLocation] = useState(null);

  useEffect(() => {
    async function fetchLocation() {
      const loc = await getCurrentLocation();
      console.log('location:', loc);
      setLocation(loc);
    }

    fetchLocation();

    // kakao
    const apiKey = process.env.NEXT_PUBLIC_KAKAO_APP_KEY;
    const script = document.createElement("script");
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&libraries=services`;
    script.async = true;
    document.body.appendChild(script);

    // 


  }, []);

  return (
    <Screen nav>
      <div className="flex flex-col items-center space-y-2">
        <p className="text-lg text-center text-grayText">Map Screen</p>
        {location && (
          <div>
            <p>Latitude: {location.latitude}</p>
            <p>Longitude: {location.longitude}</p>
          </div>
        )}
      </div>
    </Screen>
  );
}
