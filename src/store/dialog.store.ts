import { create } from 'zustand';
import React from "react";

interface IDialogState {
    isOpen: boolean;
    component: React.ElementType | null;
    openDialog: (content: React.ElementType) => void;
    closeDialog: () => void;
}

export const useDialogStore = create<IDialogState>((set) => ({
    isOpen: false,
    component:null,
    openDialog: (component) => set({ isOpen: true, component }),
    closeDialog: () => set({ isOpen: false, component: null }),
}));
