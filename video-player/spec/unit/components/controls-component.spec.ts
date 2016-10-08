import {expect} from 'chai';
import {render} from 'jodi-ui-dom';
import {controlsComponent} from '../../../src/components/controls-component';
import {initAppState, AppState} from '../../../src/states/app-state';
import {appReducer} from '../../../src/reducers/app-reducer';
import {Action} from 'redux';
import {playbackActionsFactory} from '../../../src/actions/playback-actions';
import {mediaLoadingActionsFactory} from '../../../src/actions/media-loading-actions';

let state: AppState;
const dispatch = <A extends Action>(action: A): A => {
    state = appReducer(state, action);
    return action;
};

const playbackActions = playbackActionsFactory(dispatch);
const mediaActions = mediaLoadingActionsFactory(dispatch);

describe(`controlsComponent`, () => {
    beforeEach(() => {
        state = initAppState();
    });

    // TODO it should also contain loader

    it(`should contain button play button and a progress bar`, () => {
        const node = document.createElement('div');
        render(node, () => {
            controlsComponent(state, {
                playback: playbackActions,
                mediaLoading: mediaActions
            });
        });

        const button = node.querySelector('button');
        const bar = node.querySelector('playback-progress-bar-component');

        expect(button).not.to.be.an('undefined');
        expect(button.innerHTML).to.equal('Play');

        expect(bar).not.to.be.an('undefined');
    });

    it(`should contain pause button and progress bar showing 66% of progress`, () => {
        playbackActions.play();
        playbackActions.updateProgress(132, 200);

        const node = document.createElement('div');
        render(node, () => {
            controlsComponent(state, {
                playback: playbackActions,
                mediaLoading: mediaActions
            });
        });

        const button = node.querySelector('button');
        const bar = node.querySelector('playback-progress-bar-component');
        const meter = <HTMLElement> bar.querySelector('.meter');

        expect(button).not.to.be.an('undefined');
        expect(button.innerHTML).to.equal('Pause');

        expect(bar).not.to.be.an('undefined');
        expect(meter.style.width).to.equal('66%');
    });
});
