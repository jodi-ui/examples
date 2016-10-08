import {component, LifeCycleCallback, ComponentState} from 'jodi-ui-components';
import {el, d} from 'jodi-ui-dom';
import {PlaybackActions} from '../actions/playback-actions';
import {AppState} from '../states/app-state';

const PREVIOUS_PLAY_SINCE_VALUE = 'previousPlaySinceValue';

const definedPropsOnly = function (props: Object): Object {
    const out = {};
    for (let k in props) {
        if (undefined !== props[k]) {
            out[k] = props[k];
        }
    }

    return out;
};

export function playerComponent(state: AppState, actions: PlaybackActions) {
    const onPlay = () => {
        if (!state.playing) {
            setTimeout(() => actions.play());
        }
    };

    const onPause = (event) => {
        const video = <HTMLVideoElement> event.srcElement;
        if (state.playing && !video.seeking) {
            setTimeout(() => actions.pause());
        }
    };

    const onTimeUpdate = (event: Event) => {
        const video = <HTMLVideoElement> event.target;
        actions.updateProgress(
            video.currentTime,
            video.duration
        );
    };

    const onRender: LifeCycleCallback = (element: Element, componentState: ComponentState) => {
        const video = <HTMLVideoElement> element.querySelector('video');

        if (state.playing && video.paused) {
            setTimeout(() => video.play());
        }

        if (!state.playing && !video.paused) {
            setTimeout(() => video.pause());
        }

        if (state.playSince) {
            if (state.playSince != componentState.get(PREVIOUS_PLAY_SINCE_VALUE)) {
                console.debug('seeking');
                video.currentTime = state.playSince;
                componentState.set(PREVIOUS_PLAY_SINCE_VALUE, state.playSince);
            }
        }
    };

    const render = () => {
        el('video', d(definedPropsOnly({
            'src': state.url,
            'data-duration': state.totalTime,

            'onplay': onPlay,
            'onpause': onPause,
            'ontimeupdate': onTimeUpdate,
            'oncanplay': onTimeUpdate
        })));
    };

    component('player-component').whenRendered(onRender).render(render);
}