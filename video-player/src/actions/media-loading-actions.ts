import {Dispatch} from '../../core';
import {Action} from 'redux';

const PREFIX = 'MEDIA_LOADING__';

export const LOAD_FROM_FILE = `${PREFIX}LOAD_FROM_FILE`;

export interface LoadFromFileAction extends Action {
    url: string
}

export interface MediaLoadingActions {
    loadFromUrl(string: string): LoadFromFileAction;
}

export const mediaLoadingActionsFactory = (dispatch: Dispatch): MediaLoadingActions => {
    return {
        loadFromUrl: (url: string): LoadFromFileAction => {
            const action = {
                type: LOAD_FROM_FILE,
                url:  url
            };
            return dispatch(action);
        }
    }
};
