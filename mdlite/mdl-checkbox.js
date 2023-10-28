import { registerComponent } from "../lib/element.min.js";

registerComponent('Checkbox', (element) => {
    
    const TEMPLATE = `
        <label data-id="container" class="mdl-checkbox mdl-js-checkbox">
            <input data-id="checkbox" class="mdl-checkbox__input" type="checkbox" style="outline:none">
            <span data-id="label" class="mdl-checkbox__label"></span>
        </label>
    `;
    
    const THEMES = {
        'checkbox': {
            element: 'mdl-checkbox mdl-js-checkbox',
            input: 'mdl-checkbox__input',
            span: 'mdl-checkbox__label'
        },
        'icon': {
            element: 'mdl-icon-toggle mdl-js-icon-toggle',
            input: 'mdl-icon-toggle__input',
            span: 'mdl-icon-toggle__label material-icons'
        },
        'switch': {
            element: 'mdl-switch mdl-js-switch',
            input: 'mdl-switch__input',
            span: 'mdl-switch__label'
        }
    };

    let _captions = (value) => { return value };
    
    element._extend({
        render: async (props) => {
            if (element.hasAttribute('onchange')) {
                props.onchange = element.onchange;
                element.onchange = null;
            }
            await element._useTemplate(TEMPLATE);
            element._theme = props.theme || 'checkbox';
            element._hidden = props.hidden || false;
            element._checked = props.checked || false;
            element._disabled = props.disabled || false;
            element._label = props.label;
            element._onchange = props.onchange;
            element._value = props.value;
        },
        captions: {
            set: (value) => {
                if (typeof value !== 'function')
                    return;
                _captions = value;
            }
        },
        checked: {
            set: (value) => {
                if (typeof value !== 'boolean')
                    return;
                const { checkbox, container } = element._components;
                if (checkbox.checked === value)
                    return;
                if (value)
                    container.classList.add('is-checked');
                else
                    container.classList.remove('is-checked');
                checkbox.checked = value;
            },
            get: () => {
                const { checkbox } = element._components;
                return checkbox.checked;
            }
        },
        click: () => {
            const { checkbox } = element._components;
            checkbox.click();
        },
        disabled: {
            set: (value) => {
                if (typeof value !== 'boolean')
                    return;
                const { checkbox } = element._components;
                checkbox.disabled = value;
            },
            get: () => {
                const { checkbox } = element._components;
                return checkbox.disabled;
            }
        },
        label: {
            set: (value) => {
                if (value === undefined)
                    return;
                const { label } = element._components;
                label.innerHTML = _captions(value);
            }
        },
        onchange: {
            set: (value) => {
                if (typeof value != 'function')
                    return;
                const { checkbox } = element._components;
                checkbox.onchange = (e) => {
                    if (element._disabled || element._hidden)
                        return;
                    value();
                };
            }
        },
        theme: {
            set: (value) => {
                if (value === undefined)
                    return;
                const { container, checkbox, label } = element._components;
                const theme = THEMES[value];
                container.className = theme.element;
                checkbox.className = theme.input;
                label.className = theme.span;
                if (globalThis.componentHandler)
                    globalThis.componentHandler.upgradeElement(container);
            }
        },
        value: {
            set: (value) => {
                if (value === undefined)
                    return;
                const { checkbox } = element._components;
                checkbox.value = value;
            },
            get: () => {
                const { checkbox } = element._components;
                return checkbox.value;
            }
        }
    });
});
