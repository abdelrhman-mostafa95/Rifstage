
import { create } from 'zustand';

export const usePlayer = create((set, get) => ({
    queue: [],
    currentIndex: 0,
    setQueue: (q, i = 0) => set({ queue: q, currentIndex: i }),
    next: () => { const { queue, currentIndex } = get(); if (queue.length) set({ currentIndex: (currentIndex + 1) % queue.length }); },
    prev: () => { const { queue, currentIndex } = get(); if (queue.length) set({ currentIndex: (currentIndex - 1 + queue.length) % queue.length }); }
}));