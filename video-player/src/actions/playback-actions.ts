import {Dispatch} from '../../core';
import {Action} from 'redux';

const PREFIX = 'PLAYBACK__';

export const PLAY = `${PREFIX}PLAY`;
export const PAUSE = `${PREFIX}PAUSE`;

export interface PlaybackAction extends Action {}

export interface PlaybackActions {
    play(): PlaybackAction;
    pause(): PlaybackAction;
}

export const playbackActionsFactory = (dispatch: Dispatch): PlaybackActions => {
    return {
        play: (): PlaybackAction => dispatch({
            type: PLAY
        }),

        pause: (): PlaybackAction => dispatch({
            type: PAUSE
        })
    }
};
