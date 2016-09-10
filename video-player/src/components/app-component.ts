import {component} from 'jodi-ui-components';
import {playerComponent} from './player-component';
import {controlsComponent} from './controls-component';
import {PlaybackActions} from '../actions/playback-actions';
import {loaderComponent} from './loader-component';
import {MediaLoadingActions} from '../actions/media-loading-actions';
import {AppState} from '../states/app-state';

export function appComponent(state: AppState, actions: {
    playback: PlaybackActions,
    mediaLoading: MediaLoadingActions
}) {
    component('app').render(() => {
        playerComponent(state, actions.playback);
        controlsComponent(state, actions.playback);
        loaderComponent(actions.mediaLoading);
    });
}
