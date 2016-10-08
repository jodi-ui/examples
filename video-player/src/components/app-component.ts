import {el, text} from 'jodi-ui-dom';
import {component} from 'jodi-ui-components';
import {playerComponent} from './player-component';
import {controlsComponent} from './controls-component';
import {AppState} from '../states/app-state';
import {ActionsContainer} from '../../app/containers/actions-container';

export function appComponent(state: AppState, actions: ActionsContainer) {
    component('app-component').render(() => {
        el('h1', () => text('Video Player'));

        playerComponent(state, actions.playback);
        controlsComponent(state, actions);
    });
}
