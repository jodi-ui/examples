import {expect} from 'chai';
import {render} from 'jodi-ui-dom';
import {initAppState, AppState} from '../../../src/states/app-state';
import {appReducer} from '../../../src/reducers/app-reducer';
import {Action} from 'redux';
import {playbackActionsFactory} from '../../../src/actions/playback-actions';
import {mediaLoadingActionsFactory} from '../../../src/actions/media-loading-actions';
import {playerComponent} from '../../../src/components/player-component';

let state: AppState;
const dispatch = <A extends Action>(action: A): A => {
    state = appReducer(state, action);
    return action;
};

const playbackActions = playbackActionsFactory(dispatch);
const mediaActions = mediaLoadingActionsFactory(dispatch);

const renderPlayer = () => {
    const node = document.createElement('div');
    render(node, () => {
        playerComponent(state, playbackActions);
    });

    return node;
};

describe('playerComponent', () => {
    beforeEach(() => {
        state = initAppState();
    });

    it(`shouldn't have src set on video element unless url is set in state`, () => {
        const node = renderPlayer();
        const video = node.querySelector('video');
        expect(video.hasAttribute('src')).to.equal(false);

        mediaActions.loadFromUrl('http://foo.bar');
        render(node, () => {
            playerComponent(state, playbackActions);
        });

        expect(video.getAttribute('src')).to.equal('http://foo.bar');
    });

    it(`should be paused only if state says so`, (done) => {
        const node = renderPlayer();
        const video = <HTMLVideoElement> node.querySelector('video');
        expect(video.paused).to.equal(true);

        playbackActions.play();
        render(node, () => {
            playerComponent(state, playbackActions);
        });
        setTimeout(() => { // because player executes playback in timeout 0 to avoid some collisions
            expect(video.paused).to.equal(false);
            done();
        });
    });
    
    it(`should dispatch 'play' action when played`, (done) => {
        const node = renderPlayer();
        const video = <HTMLVideoElement> node.querySelector('video');

        const event = new Event('play');
        video.dispatchEvent(event);

        setTimeout(() => { // because player executes playback in timeout 0 to avoid some collisions
            expect(state.playing).to.equal(true);
            done();
        });
    });

    it(`should dispatch 'pause' action when paused`, (done) => {
        playbackActions.play();
        expect(state.playing).to.equal(true); // control

        const node = renderPlayer();
        const video = <HTMLVideoElement> node.querySelector('video');

        const event = new Event('pause');
        video.dispatchEvent(event);

        setTimeout(() => { // because player executes playback in timeout 0 to avoid some collisions
            expect(state.playing).to.equal(false);
            done();
        });
    });

    // we won't be testing updating progress and seeking here
    // it should be tested with e2e tests
});
