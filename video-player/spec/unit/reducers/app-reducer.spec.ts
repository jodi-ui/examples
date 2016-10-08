import {expect} from 'chai';
import {playbackActionsFactory, PLAY, PAUSE, UPDATE_PROGRESS, SEEK} from '../../../src/actions/playback-actions';
import {Action} from 'redux';
import {appReducer} from '../../../src/reducers/app-reducer';
import {initAppState, AppState} from '../../../src/states/app-state';
import {mediaLoadingActionsFactory, LOAD_FROM_FILE} from '../../../src/actions/media-loading-actions';

let state: AppState = initAppState();
const dispatch = <A extends Action>(action: A): A => {
    state = appReducer(state, action);
    return action;
};

const playbackActions = playbackActionsFactory(dispatch);
const mediaLoadingActions = mediaLoadingActionsFactory(dispatch);

describe('appReducer should change state so it', () => {
    it(`says its playing if action was ${PLAY}`, () => {
        state = initAppState();

        playbackActions.play();
        expect(state.playing).to.equal(true);
    });

    it(`says it's paused if action was ${PLAY}, then ${PAUSE}`, () => {
        state = initAppState();

        playbackActions.play();
        playbackActions.pause();

        expect(state.playing).to.equal(false);
    });

    it(`says it's current and total time are updated with the right values if action was ${UPDATE_PROGRESS}`, () => {
        state = initAppState();
        playbackActions.updateProgress(189, 487);

        expect(state.currentTime).to.equal(189);
        expect(state.totalTime).to.equal(487);
    });

    it(`says that 'playSince' value is update with the right value if action was ${SEEK}`, () => {
        state = initAppState();

        playbackActions.seek(348);
        expect(state.playSince).to.equal(348);
    });

    it(`says that url is whatever ${LOAD_FROM_FILE} action says it is`, () => {
        state = initAppState();

        mediaLoadingActions.loadFromUrl('http://localhost/12345');
        expect(state.url).to.equal('http://localhost/12345');
    });
});
