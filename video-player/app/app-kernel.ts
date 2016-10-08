import {ServicesContainer} from './containers/services-container';
import {ActionsContainer} from './containers/actions-container';

export class AppKernel {
    services: ServicesContainer;
    actions: ActionsContainer;

    private initializeContainers() {
        this.services = new ServicesContainer(this);
        this.actions = new ActionsContainer(this);
    }

    private initializeUI(refreshUI: (app: AppKernel) => void) {
        this.services.store.subscribe(refreshUI.bind(undefined, this));
        refreshUI.call(undefined, this);
    }

    static init(refreshUI: (app: AppKernel) => void): AppKernel {
        const instance = new AppKernel();

        instance.initializeContainers();
        instance.initializeUI(refreshUI);

        return instance;
    }
}
