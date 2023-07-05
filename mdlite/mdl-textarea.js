import { registerComponent } from "../lib/element.min.js";

registerComponent('Textarea', (element) => {
    
    const TEMPLATE = `
        <textarea data-id="input" type="text" class="mdl-textfield__input"></textarea>
        <label data-id="label" class="mdl-textfield__label"></label>
        <span data-id="message" class="mdl-textfield__error"></span>
    `;
    
    const STYLES = {
        'textarea': {
            element: 'mdl-textfield mdl-js-textfield mdl-textfield--floating-label',
            input: 'mdl-textfield__input',
            label: 'mdl-textfield__label',
            span: 'mdl-textfield__error'
        }
    };
    
    let _onchange = () => { };
    
    element._extend({
        render: (props) => {
            element._setTemplate(TEMPLATE);
            element._style = props.style || 'textarea';
            element._label = props.label || '';
            element._rows = props.rows || 3;
            element._invalid = (typeof props.invalid === 'boolean') ? props.invalid : false;
            element._message = props.message || '';
            element._onchange = props.onchange ? props.onchange : () => { };
            element._disabled = (typeof props.disabled === 'boolean') ? props.disabled : false;
            element._readonly = (typeof props.readonly === 'boolean') ? props.readonly : false;
            element._value = props.value || '';
            element._visible = (typeof props.visible === 'boolean') ? props.visible : true;
        },
        disabled: {
            set: (value) => {
                if (typeof value != 'boolean') return;
                const { input } = element._components;
                if (value === true) {
                    element.classList.add('is-disabled');
                    input.setAttribute('disabled', 'true');
                    input.removeEventListener('keyup', _onchange);
                }
                else if (value === false) {
                    element.classList.remove('is-disabled');
                    input.removeAttribute('disabled');
                    input.addEventListener('keyup', _onchange);
                }
                if (globalThis.componentHandler)
                    globalThis.componentHandler.upgradeElement(element);
            },
            get: () => {
                const { input } = element._components;
                return input.getAttribute('disabled') === 'true';
            }
        },
        focus: () => {
            const { input } = element._components;
            input.focus();
        },
        invalid: {
            set: (value) => {
                if (typeof value != 'boolean') return;
                if (value === true)
                    element.classList.add('is-invalid');
                else if (value === false)
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
                label.innerHTML = value;
            },
            get: () => {
                const { label } = element._components;
                return label.innerHTML;
            }
        },
        message: {
            set: (value) => {
                if (typeof value != 'string') return;
                const { message } = element._components;
                if (value === '')
                    message.style.visibility = 'hidden';
                else
                    message.style.visibility = 'visible';
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
        readonly: {
            set: (value) => {
                if (typeof value != 'boolean') return;
                const { input } = element._components;
                if (value === true) {
                    input.setAttribute('readonly', 'true');
                    input.removeEventListener('keyup', _onchange);
                }
                else if (value === false) {
                    input.removeAttribute('readonly');
                    input.addEventListener('keyup', _onchange);
                }
            },
            get: () => {
                const { input } = element._components;
                return input.getAttribute('readonly') === 'true';
            }
        },
        rows: {
            set: (value) => {
                if (typeof value != 'number') return;
                const { input } = element._components;
                input.rows = value;
            },
            get: () => {
                const { input } = element._components;
                return input.rows;
            }
        },
        style: {
            set: (value) => {
                if (typeof value != 'string') return;
                if (element.getAttribute('data-style') === value) return;
                element.setAttribute('data-style', value);
                const { input, label, message } = element._components;
                const style = STYLES[value];
                element.className = style.element;
                input.className = style.input;
                label.className = style.label;
                message.className = style.span;
                if (globalThis.componentHandler) globalThis.componentHandler.upgradeElement(element);
            },
            get: () => {
                return element.getAttribute('data-style');
            }
        },
        value: {
            set: (value) => {
                if (typeof value != 'string') return;
                const { input } = element._components;
                if (input.value === value) return;
                element.classList.add('is-dirty');
                input.value = value;
                if (typeof _onchange == 'function') _onchange();
            },
            get: () => {
                const { input } = element._components;
                return input.value;
            }
        },
        visible: {
            set: (value) => {
                if (typeof value != 'boolean') return;
                element.style.display = (value) ? 'inline-block' : 'none';
            },
            get: () => {
                return element.style.display !== 'none';
            }
        }
    });
});
