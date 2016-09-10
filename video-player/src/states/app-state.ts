export interface AppState {
    playing: boolean;
    url?: string
}

export function initAppState(): AppState {
    return {
        playing: false,
        url: undefined
    }
}
