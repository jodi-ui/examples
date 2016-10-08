import {AppKernel} from './video-player/app/app-kernel';
import {appComponent} from './video-player/src/components/app-component';
import {render} from 'jodi-ui-dom';

AppKernel.init((app) => {
    render(document.querySelector('#app'), () => {
        appComponent(app.services.store.getState(), app.actions);
    });
});
