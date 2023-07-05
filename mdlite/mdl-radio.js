import { registerComponent } from "../lib/element.min.js";

registerComponent('Radio', (element) => {
    
    const TEMPLATE = `
        <label data-id="container" class="mdl-radio mdl-js-radio">
            <input data-id="radio" class="mdl-radio__input" type="radio">
            <span data-id="label" class="mdl-radio__label"></span>
        </label>
    `;
    
    const STYLES = {
        'radio': {
            element: 'mdl-radio mdl-js-radio',
            input: 'mdl-radio__button',
            span: 'mdl-radio__label'
        }
    };
    
    let _onclick = null;
    
    element._extend({
        render: (props) => {
            element._setTemplate(TEMPLATE);
            element._style = props.style || 'radio';
            element._onclick = props.onclick ? props.onclick : () => { };
            element._disabled = (typeof props.disabled === 'boolean') ? props.disabled : false;
            element._group = props.group || '';
            element._label = props.label || '';
            element._value = props.value || '';
            element._visible = (typeof props.visible === 'boolean') ? props.visible : true;
        },
        click: () => {
            const { radio } = element._components;
            radio.click();
        },
        disabled: {
            set: (value) => {
                if (typeof value != 'boolean') return;
                const { radio } = element._components;
                radio.disabled = value;
            },
            get: () => {
                const { radio } = element._components;
                return radio.disabled;
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
        group: {
            set: (value) => {
                if (typeof value != 'string') return;
                const { radio } = element._components;
                radio.name = value;
            },
            get: () => {
                const { radio } = element._components;
                return radio.name;
            }
        },
        onclick: {
            set: (value) => {
                if (typeof value != 'function') return;
                const { radio } = element._components;
                radio.removeEventListener('click', _onclick);
                _onclick = () => {
                    element.parentElement.setAttribute('data-selected-value', radio.value);
                    value();
                };
                radio.addEventListener("click", _onclick);
            }
        },
        style: {
            set: (value) => {
                if (typeof value != 'string') return;
                if (element.getAttribute('data-style') === value) return;
                element.setAttribute('data-style', value);
                const { container, label, radio } = element._components;
                const style = STYLES[value];
                container.className = style.element;
                radio.className = style.input;
                label.className = style.span;
                if (globalThis.componentHandler) globalThis.componentHandler.upgradeElement(element);
            },
            get: () => {
                return element.getAttribute('data-style');
            }
        },
        value: {
            set: (value) => {
                if (typeof value != 'string') return;
                const { radio } = element._components;
                radio.value = value;
            },
            get: () => {
                const { radio } = element._components;
                return radio.value;
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
