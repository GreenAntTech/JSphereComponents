import { registerComponent, createComponent } from "../lib/element.min.js";
import './mdl-radio.js';

registerComponent('RadioGroup', (element, ctx) => {

    let _onchange = null;

    element._extend({
        render: (props) => {
            element._useTemplate(element.firstElementChild.innerHTML);
            element._hidden = props.hidden || false;
            element._onchange = props.onchange;
            element._renderRadioButtons();
            element._selected = props.selected;
        },
        renderRadioButtons: () => {
            for (let id in element._components) {
                const radio = element._components[id];
                radio._render({
                    group: element.getAttribute('data-id')
                });
            }
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
        onchange: {
            set: (value) => {
                if (typeof value != 'function') return;
                _onchange = () => {
                    value();
                }
            }
        },
        selected: {
            set: (value) => {
                if (typeof value != 'string')
                    return;
                element.setAttribute('data-x-selected', value);
                for (let id in element._components) {
                    const radio = element._components[id];
                    if (radio._value === value)
                        radio._click();
                }
            },
            get: () => {
                return element.getAttribute('data-x-selected');
            }
        },
        onclick_: (value) => {
            element.setAttribute('data-x-selected', value);
            if (_onchange) _onchange();
        }
    });
});
