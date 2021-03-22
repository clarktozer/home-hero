export interface AppState {
    viewer: Viewer | null;
}

export interface Viewer {
    id: string;
    name: string;
    avatar: string;
    email: string;
    hasWallet: boolean;
}
