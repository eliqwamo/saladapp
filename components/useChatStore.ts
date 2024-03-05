import { create } from "zustand";
import {Message} from './ChatStep';

type ChatState = {
    messages: Message[];
    pathHistory: string[];
    addMessage: (message: Message) => void;
    setPathHistory: (path: string) => void;
    popPathHistory: () => void;
}

const useChatStore = create<ChatState>((set) => ({
    messages: [],
    pathHistory: ['start'],
    addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
    setPathHistory: (path) => set((state) => ({ pathHistory: [...state.pathHistory, path] })),
    popPathHistory: () => set((state) => ({ pathHistory: state.pathHistory.slice(0, -1) }))
}))

export default useChatStore;