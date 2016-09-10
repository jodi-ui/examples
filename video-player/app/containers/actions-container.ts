import {BaseContainer} from '../../core';
import {MediaLoadingActions, mediaLoadingActionsFactory} from '../../src/actions/media-loading-actions';
import {PlaybackActions, playbackActionsFactory} from '../../src/actions/playback-actions';

export class ActionsContainer extends BaseContainer {
    get playback(): PlaybackActions {
        return this.fetchInstance('playback', () => playbackActionsFactory(this.app.services.store.dispatch));
    }

    get mediaLoading(): MediaLoadingActions {
        return this.fetchInstance('mediaLoading', () => mediaLoadingActionsFactory(this.app.services.store.dispatch));
    }
}