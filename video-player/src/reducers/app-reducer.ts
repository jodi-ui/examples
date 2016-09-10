import * as playback from '../actions/playback-actions';
import * as mediaLoading from '../actions/media-loading-actions';
import {AppState} from '../states/app-state';
import {Action} from 'redux';

/**
 * This app doesn't need more then one reducer (at least for now)
 */
export function appReducer(state: AppState, action: Action): AppState {
    const extend = Object.assign.bind(Object, {}, state);
    const isAction = (type) => type == action.type;

    if (isAction(playback.PLAY)) {
        return extend({playing: true});
    }

    if (isAction(playback.PAUSE)) {
        return extend({playing: false})
    }

    if (isAction(mediaLoading.LOAD_FROM_FILE)) {
        const loadAction = <mediaLoading.LoadFromFileAction> action;
        return extend({url: loadAction.url});
    }

    return state;
}
