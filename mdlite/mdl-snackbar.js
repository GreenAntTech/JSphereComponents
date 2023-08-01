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
        render: async (props) => {
            await element._useTemplate(TEMPLATE);
            element._theme = props.theme || 'snackbar';
            element._hidden = true;
            if (globalThis.componentHandler) globalThis.componentHandler.upgradeElement(element);
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
