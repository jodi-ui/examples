import {component} from 'jodi-ui-components';
import {el, text, d} from 'jodi-ui-dom';
import {PlaybackActions} from '../actions/playback-actions';
import {AppState} from '../states/app-state';

export function controlsComponent(state: AppState, actions: PlaybackActions) {
    const render = () => {
        if (state.playing) {
            el('button', d({'class:': 'pause', onclick: actions.pause}), () => text('Pause'));
        } else {
            el('button', d({'class': 'play', onclick: actions.play}), () => text('Play'));
        }
    };

    component('controls').render(render);
}
