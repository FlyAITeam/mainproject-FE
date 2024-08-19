"use client";

import Image from "next/image";
import { Screen } from "@/components";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  return (
    <Screen nav>
      <div className="flex flex-row justify-between items-center space-y-2">
        <div className="w-24 h-24 bg-grayBackground rounded-full flex"></div>
      </div>
    </Screen>
  );
}
