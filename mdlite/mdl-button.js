import { registerComponent } from "../lib/element.min.js";

registerComponent('Button', (element) => {
    
    const TEMPLATE = `
        <i data-id="label" class="" style="font-style:normal;"></i>
    `;
    
    const THEMES = {
        'button': {
            element: 'mdl-button mdl-js-button'
        },
        'primary': {
            element: 'mdl-button mdl-js-button mdl-button--raised mdl-button--colored'
        },
        'secondary': {
            element: 'mdl-button mdl-js-button mdl-button--raised mdl-button--accent'
        },
        'fab.primary': {
            element: 'mdl-button mdl-js-button mdl-button--fab mdl-button--colored'
        },
        'fab.secondary': {
            element: 'mdl-button mdl-js-button mdl-button--fab'
        }
    };

    let _captions = (value) => { return value };
    
    element._extend({
        render: async (props) => {
            await element._useTemplate(TEMPLATE);
            element._hidden = props.hidden || false;
            element._disabled = props.disabled || false;
            element._icon = props.icon;
            element._label = props.label;
            element._onclick = props.onclick || element.onclick;
            element._theme = props.theme || 'button';
        },
        captions: {
            set: (value) => {
                if (typeof value !== 'function')
                    return;
                _captions = value;
            }
        },
        click: () => {
            element.click();
        },
        disabled: {
            set: (value) => {
                if (typeof value != 'boolean')
                    return;
                if (value)
                    element.setAttribute('disabled', '');
                else
                    element.removeAttribute('disabled');
            },
            get: () => {
                return element.hasAttribute('disabled');
            }
        },
        icon: {
            set: (value) => {
                if (typeof value != 'string')
                    return;
                const { label } = element._components;
                label.classList.add('material-icons');
                label.innerHTML = value;
            }
        },
        label: {
            set: (value) => {
                if (typeof value != 'string')
                    return;
                const { label } = element._components;
                label.classList.remove('material-icons');
                label.innerHTML = _captions(value);
            }
        },
        onclick: {
            set: (value) => {
                if (typeof value != 'function')
                    return;
                element.onclick = () => {
                    if (element._disabled || element._hidden)
                        return;
                    value();
                };
            }
        },
        theme: {
            set: (value) => {
                if (typeof value != 'string')
                    return;
                const theme = THEMES[value];
                element.className = theme.element;
                if (globalThis.componentHandler)
                    globalThis.componentHandler.upgradeElement(element);
            }
        }
    });
});
