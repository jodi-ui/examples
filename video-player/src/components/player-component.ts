import {component, LifeCycleCallback} from 'jodi-ui-components';
import {el, d} from 'jodi-ui-dom';
import {PlaybackActions} from '../actions/playback-actions';
import {AppState} from '../states/app-state';

export function playerComponent(state: AppState, actions: PlaybackActions) {

    const definedPropsOnly = function(props: Object): Object {
        for (let k in props) {
            if (undefined === props[k]) {
                delete props[k];
            }
        }

        return props;
    };

    const onPlay = () => {
        if (!state.playing) {
            actions.play();
        }
    };

    const onPause = () => {
        if (state.playing) {
            actions.pause();
        }
    };

    const onRender: LifeCycleCallback = (element: Element) => {
        const video: HTMLVideoElement = <HTMLVideoElement> element.querySelector('video');

        if (state.playing && video.paused) {
            video.play();
        }

        if (!state.playing && !video.paused) {
            video.pause();
        }
    };

    const render = () => {
        el('video', d(definedPropsOnly({
            src: state.url,
            onplay:  onPlay,
            onpause: onPause
        })));
    };

    component('player').whenRendered(onRender).render(render);
}