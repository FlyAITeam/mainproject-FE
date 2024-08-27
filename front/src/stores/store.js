// store.js
import { create } from "zustand";

const useModalStore = create((set) => ({
  isModalOpen: false,
  type: null,
  openModal: (content) => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false }),
  setType: (type) => set({ type }),
}));

export default useModalStore;
