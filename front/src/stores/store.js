// store.js
import { create } from "zustand";

export const useModalStore = create((set) => ({
  isModalOpen: false,
  type: null,
  openModal: (content) => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false }),
  setType: (type) => set({ type }),
}));

export const usePageStore = create((set) => ({
  page: 1,
  setPage: (page) => set({ page }),
}));
