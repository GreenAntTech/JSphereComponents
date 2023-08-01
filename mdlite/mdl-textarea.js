import { registerComponent, scriptHost } from "../lib/element.min.js";

registerComponent('Textarea', (element) => {
    
    const TEMPLATE = `
        <textarea data-id="input" type="text" class="mdl-textfield__input"></textarea>
        <label data-id="label" class="mdl-textfield__label"></label>
        <span data-id="message" class="mdl-textfield__error"></span>
    `;
    
    const THEMES = {
        'textarea': {
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
            element._theme = props.theme || 'textarea';
            element._onchange = props.onchange || (() => {});
            if (props.hidden) element._hidden = props.hidden;
            if (props.type) element._type = props.type;
            if (props.rows) element._rows = props.rows;
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
                    element.classList.add('is-disabled');
                    input.setAttribute('disabled', '');
                    input.removeEventListener('keyup', _onchange);
                }
                else {
                    element.classList.remove('is-disabled');
                    input.removeAttribute('disabled');
                    input.addEventListener('keyup', _onchange);
                }
                if (globalThis.componentHandler)
                    globalThis.componentHandler.upgradeElement(element);
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
        readonly: {
            set: (value) => {
                if (typeof value != 'boolean') return;
                const { input } = element._components;
                if (value) {
                    input.setAttribute('readonly', '');
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
        rows: {
            set: (value) => {
                if (typeof value != 'number') return;
                const { input } = element._components;
                input.rows = value;
            }
        },
        theme: {
            set: (value) => {
                if (typeof value != 'string') return;
                const { input, label, message } = element._components;
                const theme = THEMES[value];
                element.className = theme.element;
                input.className = theme.input;
                label.className = theme.label;
                message.className = theme.span;
                if (globalThis.componentHandler) globalThis.componentHandler.upgradeElement(element);
            }
        },
        value: {
            set: (value) => {
                if (typeof value != 'string') return;
                const { input } = element._components;
                if (input.value === value) return;
                element.classList.add('is-dirty');
                if (scriptHost.client) input.value = value;
                else input.innerText = value;
                if (typeof _onchange == 'function') _onchange();
            },
            get: () => {
                const { input } = element._components;
                return input.value;
            }
        }
    });
});
