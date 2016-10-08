export interface AppState {
    playing: boolean;
    playSince?: number,
    currentTime: number,
    totalTime: number,
    url?: string
}

export function initAppState(): AppState {
    return {
        playing: false,
        playSince: undefined,
        currentTime: 0,
        totalTime: 0,
        url: undefined
    }
}
