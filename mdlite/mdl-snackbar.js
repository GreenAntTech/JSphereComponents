import { registerComponent } from "../lib/element.min.js";

registerComponent('Snackbar', (element) => {
    
    const TEMPLATE = `
        <div class="mdl-snackbar__text"></div>
        <button class="mdl-snackbar__action" type="button"></button>
    `;
    
    const THEMES = {
        'snackbar': {
            element: 'mdl-js-snackbar mdl-snackbar',
        }
    };
    
    element._extend({
        render: (props) => {
            element._useTemplate(TEMPLATE);
            element._hidden = true;
            element._theme = props.theme || 'snackbar';
            if (globalThis.componentHandler) globalThis.componentHandler.upgradeElement(element);
        },
        hidden: {
            set: (value) => {
                if (typeof value != 'boolean')
                    return;
                element.style.display = (value) ? 'none' : 'inline-block';
            },
            get: () => {
                return element.style.display === 'none';
            }
        },
        show: (props) => {
            element._hidden = false;
            element.MaterialSnackbar.showSnackbar(props);
        },
        theme: {
            set: (value) => {
                if (typeof value != 'string') return;
                const theme = THEMES[value];
                element.className = theme.element;
            }
        }
    });
});
