import { registerComponent, scriptHost } from "../lib/element.min.js";

registerComponent('Textbox', (element) => {
    
    const TEMPLATE = `
        <input data-id="input" type="text" class="mdl-textfield__input">
        <label data-id="label" class="mdl-textfield__label"></label>
        <span data-id="message" class="mdl-textfield__error"></span>
    `;
    const THEMES = {
        'textbox': {
            element: 'mdl-textfield mdl-js-textfield mdl-textfield--floating-label is-dirty',
            input: 'mdl-textfield__input',
            label: 'mdl-textfield__label',
            span: 'mdl-textfield__error'
        }
    };

    let _captions = (value) => { return value };
    let _onchange = () => { };

    element._extend({
        render: async (props) => {
            await element._useTemplate(TEMPLATE);
            element._theme = props.theme || 'textbox';
            element._onchange = props.onchange || (() => {});
            if (props.hidden) element._hidden = props.hidden;
            if (props.type) element._type = props.type;
            if (props.label) element._label = props.label;
            if (props.placeholder) element._placeholder = props.placeholder;
            if (props.invalid) element._invalid = props.invalid;
            if (props.message) element._message = props.message;
            if (props.disabled) element._disabled = props.disabled;
            if (props.readonly) element._readonly = props.readonly;
            if (props.value) element._value = props.value;
        },
        disabled: {
            set: (value) => {
                if (typeof value != 'boolean') return;
                const { input } = element._components;
                if (value) {
                    input.setAttribute('disabled', '');
                    input.removeEventListener('keyup', _onchange);
                }
                else {
                    input.removeAttribute('disabled');
                    input.addEventListener('keyup', _onchange);
                }
            },
            get: () => {
                const { input } = element._components;
                return input.hasAttribute('disabled');
            }
        },
        focus: () => {
            const { input } = element._components;
            input.focus();
        },
        invalid: {
            set: (value) => {
                if (typeof value != 'boolean') return;
                if (value)
                    element.classList.add('is-invalid');
                else
                    element.classList.remove('is-invalid');
            },
            get: () => {
                return element.classList.contains('is-invalid');
            }
        },
        label: {
            set: (value) => {
                if (typeof value != 'string') return;
                const { label } = element._components;
                label.innerHTML = _captions(value);
            }
        },
        message: {
            set: (value) => {
                if (typeof value != 'string') return;
                const { message } = element._components;
                if (value === '') {
                    message.classList.remove('js-vis-visible');
                }
                else {
                    message.classList.add('js-vis-visible');
                }
                message.innerHTML = value;
            },
            get: () => {
                const { message } = element._components;
                return message.innerHTML;
            }
        },
        onchange: {
            set: (value) => {
                if (typeof value != 'function') return;
                const { input } = element._components;
                input.removeEventListener('keyup', _onchange);
                _onchange = () => { value(); };
                input.addEventListener("keyup", _onchange);
            }
        },
        placeholder: {
            set: (value) => {
                if (typeof value != 'string') return;
                const { input } = element._components;
                if (input.value === value) return;
                if (scriptHost.client) input.placeholder = value;
                else input.setAttribute('placeholder', value);
            }
        },
        readonly: {
            set: (value) => {
                if (typeof value != 'boolean') return;
                const { input } = element._components;
                if (value) {
                    input.setAttribute('readonly', 'true');
                    input.removeEventListener('keyup', _onchange);
                }
                else {
                    input.removeAttribute('readonly');
                    input.addEventListener('keyup', _onchange);
                }
            },
            get: () => {
                const { input } = element._components;
                return input.hasAttribute('readonly');
            }
        },
        theme: {
            set: (value) => {
                if (typeof value != 'string') return;
                element.setAttribute('data-x-theme', value);
                const { input, label, message } = element._components;
                const theme = THEMES[value];
                element.className = theme.element;
                input.className = theme.input;
                label.className = theme.label;
                message.className = theme.span;
                if (globalThis.componentHandler) globalThis.componentHandler.upgradeElement(element);
            },
            get: () => {
                return element.getAttribute('data-x-theme');
            }
        },
        type: {
            set: (value) => {
                if (typeof value != 'string') return;
                const { input } = element._components;
                input.type = value;
            },
            get: () => {
                const { input } = element._components;
                return input.type;
            }
        },
        value: {
            set: (value) => {
                if (typeof value != 'string' && typeof value != 'number') return;
                const { input } = element._components;
                if (input.value === value) return;
                element.classList.add('is-dirty');
                if (scriptHost.client) input.value = value;
                else input.setAttribute('value', value);
                if (typeof _onchange == 'function') _onchange();
            },
            get: () => {
                const { input } = element._components;
                return input.value;
            }
        }
    });
});
