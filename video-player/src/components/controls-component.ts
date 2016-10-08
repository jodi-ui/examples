import {component} from 'jodi-ui-components';
import {el, text, s, d} from 'jodi-ui-dom';
import {PlaybackActions} from '../actions/playback-actions';
import {AppState} from '../states/app-state';
import {playbackProgressBarComponent} from './playback-progress-bar-component';
import {MediaLoadingActions} from '../actions/media-loading-actions';
import {loaderComponent} from './loader-component';

export function controlsComponent(state: AppState, actions: {
    playback: PlaybackActions,
    mediaLoading: MediaLoadingActions
}) {
    const playPauseButton = () => {
        if (state.playing) {
            el('button', d({'class': 'pause', onclick: () => actions.playback.pause()}), () => text('Pause'));
        } else {
            el('button', d({'class': 'play', onclick: () => actions.playback.play()}), () => text('Play'));
        }
    };

    const render = () => {
        el('div', s({'class': 'wrapper'}), () => {
            el('div', s({'class': 'buttons-container'}), () => {
                playPauseButton();
            });

            el('div', s({'class': 'progress-bar-container'}), () => {
                playbackProgressBarComponent(state.currentTime, state.totalTime, actions.playback.seek);
            });

            el('div', s({'class': 'loader-container'}), () => {
                loaderComponent(actions.mediaLoading);
            })
        });
    };

    component('controls-component').render(render);
}
