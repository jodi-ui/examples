import {component} from 'jodi-ui-components';
import {el, text, s, d} from 'jodi-ui-dom';
import {PlaybackActions} from '../actions/playback-actions';
import {AppState} from '../states/app-state';

export function controlsComponent(state: AppState, actions: PlaybackActions) {
    const render = () => {
        if (state.playing) {
            el('button', s({'class:': 'pause'}), d({onclick: actions.pause}), () => text('Pause'));
        } else {
            el('button', s({'class': 'play'}), d({onclick: actions.play}), () => text('Play'));
        }
    };

    component('controls').render(render);
}
