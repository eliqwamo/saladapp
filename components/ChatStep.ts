export interface ChatOption {
    text: string;
    nextStep: string;
}

export interface ChatStep {
    message: string;
    options: ChatOption[];
}

export interface Message {
    sender: 'bot' | 'user';
    text: string;
}