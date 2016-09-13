import {appComponent} from '../src/components/app-component';
import {render} from 'jodi-ui-dom';
import {ServicesContainer} from './containers/services-container';
import {ActionsContainer} from './containers/actions-container';

export class AppKernel {
    services: ServicesContainer;
    actions: ActionsContainer;

    private initializeContainers() {
        this.services = new ServicesContainer(this);
        this.actions = new ActionsContainer(this);
    }

    private initializeComponents() {
        const refreshUI = () => render(document.querySelector('#app'), () => {
            appComponent(this.services.store.getState(), this.actions);
        });

        this.services.store.subscribe(refreshUI);
        refreshUI();
    }

    static init(): AppKernel {
        const instance = new AppKernel();

        instance.initializeContainers();
        instance.initializeComponents();

        return instance;
    }
}
