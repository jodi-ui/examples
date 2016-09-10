import {component, ComponentState} from 'jodi-ui-components';
import {el, text, d} from 'jodi-ui-dom';
import {MediaLoadingActions} from '../actions/media-loading-actions';

export function loaderComponent(actions: MediaLoadingActions) {
    const createFileSelectHandler = (componentState: ComponentState) => {
        return function (event) {
            if (!event.target.files.length) {
                return;
            }

            const file: File = event.target.files.item(0);
            const url = URL.createObjectURL(file);

            actions.loadFromUrl(url);

            const previousUrl = componentState.get('url', null);
            if (previousUrl) {
                console.info('Revoking', previousUrl);
                URL.revokeObjectURL(previousUrl);
            }

            componentState.set('url', url);
        }
    };

    const createClickHandler = (componentState: ComponentState) => {
        return function () {
            const fileInput = document.createElement('input');

            fileInput.type = 'file';
            fileInput.multiple = false;
            fileInput.onchange = createFileSelectHandler(componentState);

            fileInput.click();
        };
    };

    const render = (componentState: ComponentState) => {
        el('button', d({onclick: createClickHandler(componentState)}), () => text('Load a file'));
    };

    component('loader').render(render);
}

