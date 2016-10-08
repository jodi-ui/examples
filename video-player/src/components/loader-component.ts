import {component, ComponentState} from 'jodi-ui-components';
import {el, text, d, s} from 'jodi-ui-dom';
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

    const fileInput = (componentState: ComponentState): HTMLInputElement => {
        return <HTMLInputElement> el( 'input',
            s({type: 'file', style: {display: 'none'}}),
            d({onchange: createFileSelectHandler(componentState)})
        );
    };

    const render = (componentState: ComponentState) => {
        const input = fileInput(componentState);
        el('button', d({onclick: input.click.bind(input)}), () => text('Load a file'));
    };

    component('loader-component').render(render);
}
