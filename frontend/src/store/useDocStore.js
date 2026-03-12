import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useDocStore = create(
  persist((set) => ({
    data: "",
    setData: (docData) => {
      set({
        data: docData,
      });
    },
  })),
);
