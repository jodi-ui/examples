import {createStore, Store} from 'redux';
import {initAppState, AppState} from '../../src/states/app-state';
import {appReducer} from '../../src/reducers/app-reducer';
import {BaseContainer} from '../../core';

export class ServicesContainer extends BaseContainer {
    get store(): Store<AppState> {
        return this.fetchInstance('store', () => createStore(appReducer, initAppState()));
    }
}