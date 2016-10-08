import {component} from 'jodi-ui-components';
import {el, s, d} from 'jodi-ui-dom';

export const playbackProgressBarComponent = (
    currentTime: number,
    duration: number,
    seek: (time: number) => any
) => {
    const onClick = (event: {clientX: number}) => {
        const rect = bar.getBoundingClientRect();
        const clientX = event.clientX;

        const fraction = (clientX - rect.left) / rect.width;
        const time = duration * fraction;

        seek(time);
    };

    const bar: Element = component('playback-progress-bar-component')
        .withProps({
            'class': 'progress'
        }, {
            onclick: onClick
        })
        .render(() => el('span', s({'class': 'meter'}), d({
            style: {
                width: (currentTime / duration * 100) + '%'
            }
        })));
};
