import { registerComponent } from "../lib/element.min.js";
import './mdl-radio.js';

registerComponent('RadioGroup', (element, _ctx) => {

    let _onchange = null;

    element._extend({
        render: async (props) => {
            await element._useTemplate(element.firstElementChild.innerHTML);
            element._hidden = props.hidden || false;
            element._onchange = props.onchange;
            element._renderRadioButtons();
            element._selected = props.selected;
        },
        renderRadioButtons: () => {
            for (const id in element._components) {
                const radio = element._components[id];
                radio._render({
                    group: element.getAttribute('data-id')
                });
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
                for (const id in element._components) {
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
