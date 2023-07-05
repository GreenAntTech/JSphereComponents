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
    
    element._extend({
        render: (props) => {
            element._useTemplate(TEMPLATE);
            element._disabled = props.disabled ? true : false;
            element._hidden = props.hidden ? true : false;
            element._icon = props.icon;
            element._label = props.label;
            element._onclick = props.onclick || element.onclick;
            element._theme = props.theme || 'button';
        },
        click: () => {
            element.click();
        },
        disabled: {
            set: (value) => {
                if (typeof value != 'boolean')
                    return;
                if (value) {
                    element.setAttribute('disabled', null);
                }
                else {
                    element.removeAttribute('disabled');
                }
            },
            get: () => {
                return element.hasAttribute('disabled');
            }
        },
        hidden: {
            set: (value) => {
                if (typeof value != 'boolean')
                    return;
                element.style.display = (value) ? 'none' : 'inline-block';
            },
            get: () => {
                return element.style.display == 'none';
            }
        },
        icon: {
            set: (value) => {
                if (typeof value != 'string')
                    return;
                const { label } = element._components;
                label.classList.add('material-icons');
                label.innerHTML = value;
            },
            get: () => {
                const { label } = element._components;
                return label.innerHTML;
            }
        },
        label: {
            set: (value) => {
                if (typeof value != 'string')
                    return;
                const { label } = element._components;
                label.classList.remove('material-icons');
                label.innerHTML = value;
            },
            get: () => {
                const { label } = element._components;
                return label.innerHTML;
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
                element.setAttribute('data-theme', value);
                const theme = THEMES[value];
                element.className = theme.element;
                if (globalThis.componentHandler)
                    globalThis.componentHandler.upgradeElement(element);
            },
            get: () => {
                return element.getAttribute('data-theme');
            }
        }
    });
});
