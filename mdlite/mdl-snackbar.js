import { registerComponent } from "../lib/element.min.js";

registerComponent('Snackbar', (element) => {
    
    const TEMPLATE = `
        <div class="mdl-snackbar__text"></div>
        <button class="mdl-snackbar__action" type="button"></button>
    `;
    
    const STYLES = {
        'snackbar': {
            element: 'mdl-js-snackbar mdl-snackbar',
        }
    };
    
    element._extend({
        render: (props) => {
            element.style.display = 'none';
            element._setTemplate(TEMPLATE);
            element._style = props.style || 'snackbar';
            if (globalThis.componentHandler) globalThis.componentHandler.upgradeElement(element);
        },
        show: (props) => {
            element.style.display = '';
            element.MaterialSnackbar.showSnackbar(props);
        },
        style: {
            set: (value) => {
                if (typeof value != 'string') return;
                if (element.getAttribute('data-style') === value) return;
                element.setAttribute('data-style', value);
                const style = STYLES[value];
                element.className = style.element;
            },
            get: () => {
                return element.getAttribute('data-style');
            }
        }
    });
});
