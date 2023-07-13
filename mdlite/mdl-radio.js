import { registerComponent } from "../lib/element.min.js";

registerComponent('Radio', (element) => {
    
    const TEMPLATE = `
        <label data-id="container" class="mdl-radio mdl-js-radio">
            <input data-id="radio" class="mdl-radio__input" type="radio">
            <span data-id="label" class="mdl-radio__label"></span>
        </label>
    `;
    
    const THEMES = {
        'radio': {
            element: 'mdl-radio mdl-js-radio',
            input: 'mdl-radio__button',
            span: 'mdl-radio__label'
        }
    };
    
    let _captions = (value) => { return value };
    let _onclick = null;
    
    element._extend({
        render: async (props) => {
            await element._useTemplate(TEMPLATE);
            element._hidden = props.hidden || false;
            element._disabled = props.disabled || false;
            element._group = props.group;
            element._label = props.label;
            element._onclick = props.onclick || (() => {});
            element._value = props.value;
            element._theme = props.theme || 'radio';
        },
        captions: {
            set: (value) => {
                if (typeof value !== 'function')
                    return;
                _captions = value;
            }
        },
        click: () => {
            const { radio } = element._components;
            radio.click();
        },
        disabled: {
            set: (value) => {
                if (typeof value != 'boolean')
                    return;
                const { radio } = element._components;
                radio.disabled = value;
            },
            get: () => {
                const { radio } = element._components;
                return radio.disabled;
            }
        },
        group: {
            set: (value) => {
                if (typeof value != 'string') return;
                const { radio } = element._components;
                radio.name = value;
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
        onclick: {
            set: (value) => {
                if (typeof value != 'function') return;
                const { radio } = element._components;
                radio.removeEventListener('click', _onclick);
                _onclick = () => {
                    if (element.parentElement.getAttribute('data-is') === 'RadioGroup')
                        element.parentElement._onclick_(radio.value);
                    else
                        value();
                };
                radio.addEventListener("click", _onclick);
            }
        },
        theme: {
            set: (value) => {
                if (typeof value != 'string') return;
                const { container, label, radio } = element._components;
                const theme = THEMES[value];
                container.className = theme.element;
                radio.className = theme.input;
                label.className = theme.span;
                if (globalThis.componentHandler)
                    globalThis.componentHandler.upgradeElement(element);
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
        }
    });
});
