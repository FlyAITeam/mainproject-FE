"use client";

import { PetMap } from "@/components";
import { usePageStore } from "@/stores/store";

/**
 * 페이지 -> 컴포넌트로 변경
 * 이전 코드 :
 * export default function Page() {
 * ...
 * return (
 *  <Screen nav>
  ...
    </Screen>
 * );
 * }
 *
 * 변경 코드 :
 * export default function MapPageComponent() {
 * ...
 * return (
 * <>
    ...
    </>
 * );
 * }
 *
 * 파일 이름도 변경
 * 이전 파일 이름 : page.jsx
 * 변경 파일 이름 : MapPageComponent.jsx
 * 
 */

export default function MapPageComponent({}) {
  const { page } = usePageStore();

  return (
    <>
      <div className="flex flex-col items-center justify-center w-full h-full p-4">
        <div className="w-full h-full max-w-3xl">
          <PetMap page={page} />
        </div>
      </div>
    </>
  );
}
