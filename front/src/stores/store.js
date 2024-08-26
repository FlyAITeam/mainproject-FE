// store.js
import { create } from "zustand";

const useModalStore = create((set) => ({
  isModalOpen: false,
  openModal: (content) => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false }),
}));

export default useModalStore;
