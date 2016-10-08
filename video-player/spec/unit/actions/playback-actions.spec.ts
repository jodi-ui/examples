import {expect} from 'chai';
import {
    playbackActionsFactory, PlaybackAction, PLAY, PAUSE, SEEK,
    SeekAction, UpdateProgressAction, UPDATE_PROGRESS
} from '../../../src/actions/playback-actions';

describe(`Playback Actions`, () => {
    const dispatch = (action) => action;
    const playbackActions = playbackActionsFactory(dispatch);

    it(`should have method play which creates PLAY action`, () => {
        const action: PlaybackAction = playbackActions.play();
        expect(action.type).to.equal(PLAY);
    });

    it(`should have method pause which creates PAUSE action`, () => {
        const action: PlaybackAction = playbackActions.pause();
        expect(action.type).to.equal(PAUSE);
    });

    it(`should have method seek which creates SEEK action with proper time set`, () => {
        const action: SeekAction = playbackActions.seek(150);
        expect(action.type).to.equal(SEEK);
        expect(action.time).to.equal(150);
    });

    it(`should have method updateProgress which creates UPDATE_PROGRESS action with proper times set`, () => {
        const action: UpdateProgressAction = playbackActions.updateProgress(200, 500);

        expect(action.type).to.equal(UPDATE_PROGRESS);
        expect(action.currentTime).to.equal(200);
        expect(action.totalTime).to.equal(500);
    });
});