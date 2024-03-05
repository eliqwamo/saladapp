import { create } from "zustand";

const useChatStore = create((set) => ({
    messages: [],
    pathHistory: ['start'],
    addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
    setPathHistory: (path) => set((state) => ({ pathHistory: [...state.pathHistory, path] })),
    popPathHistory: () => set((state) => ({ pathHistory: state.pathHistory.slice(0, -1) }))
}))

export default useChatStore;