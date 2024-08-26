"use client";

import { useRef } from "react";
import { Toaster } from "react-hot-toast";
import { Modal } from "@/components/Modal";
import useModalStore from "@/stores/store";

export const Layout = ({ children }) => {
  const ref = useRef(null);
  const { isModalOpen } = useModalStore();

  return (
    <div
      ref={ref}
      style={{
        position: "relative",
        width: " 100%",
        height: "100%",
        touchAction: "auto",
      }}
    >
      {children}
      <Toaster />
      {/* <Modal isModalOpen={isModalOpen} type="bcg" /> */}
    </div>
  );
};
