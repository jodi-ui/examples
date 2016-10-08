import {Dispatch} from '../../core';
import {Action} from 'redux';

const PREFIX = 'PLAYBACK__';

export const PLAY = `${PREFIX}PLAY`;
export const PAUSE = `${PREFIX}PAUSE`;
export const SEEK = `${PREFIX}SEEK`;
export const UPDATE_PROGRESS = `${PREFIX}UPDATE_PROGRESS`;

export interface PlaybackAction extends Action {
}

export interface SeekAction extends Action {
    time: number;
}

export interface UpdateProgressAction extends Action {
    currentTime: number;
    totalTime: number;
}

export interface PlaybackActions {
    play(): PlaybackAction;
    pause(): PlaybackAction;
    seek(time?: number): SeekAction;
    updateProgress(currentTime: number, totalTime: number): UpdateProgressAction;
}

export const playbackActionsFactory = (dispatch: Dispatch): PlaybackActions => {
    return {
        play: (): PlaybackAction => {
            const action: PlaybackAction = {type: PLAY};
            return dispatch(action);
        },

        pause: (): PlaybackAction => {
            const action: PlaybackAction = {type: PAUSE};
            return dispatch(action);
        },

        seek: (time?: number): SeekAction => {
            const action: SeekAction = {
                type: SEEK,
                time: time
            };
            return dispatch(action)
        },

        updateProgress: (currentTime: number, totalTime: number): UpdateProgressAction => {
            const action: UpdateProgressAction = {
                type: UPDATE_PROGRESS,
                currentTime: currentTime,
                totalTime: totalTime
            };
            return dispatch(action);
        }
    }
};
