"use client";

import Image from "next/image";
import { Screen } from "@/components";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  return (
    <Screen nav>
      <div className="flex flex-col items-center space-y-2"></div>
    </Screen>
  );
}
