import { registerComponent, createComponent } from "../lib/element.min.js";
import './mdl-radio.js';

registerComponent('RadioGroup', (element, ctx) => {
    
    element._extend({
        render: (props) => {
            element._setTemplate('');
            if (Array.isArray(props.group)) {
                for (const item of props.group) {
                    item.onclick = props.onchange;
                    item.group = element.getAttribute('data-id');
                }
                element._group(props.group || []);
            }
            element._value = props.selectedValue;
            element._visible = (typeof props.visible === 'boolean') ? props.visible : true;
        },
        group: (groupProps) => {
            for (const props of groupProps) {
                let clone = element._components[props.value];
                if (!clone) {
                    clone = element._template.content.firstElementChild.cloneNode(true);
                    if (!clone.getAttribute('data-as') || clone.getAttribute('data-as') !== 'Radio')
                        return;
                    clone.setAttribute("data-id", props.value);
                    clone.setAttribute("data-parent", element.getAttribute("data-id"));
                    if (element.getAttribute('data-init-at'))
                        clone.setAttribute('data-init-at', element.getAttribute('data-init-at'));
                    element.appendChild(clone);
                }
                createComponent(clone, ctx);
                element._components[props.value] = clone;
                clone._render(props);
            }
        },
        value: {
            set: (value) => {
                if (value === undefined && element.getAttribute('data-selected-value') === null) return;
                if (value === undefined) value = element.getAttribute('data-selected-value');
                element._components[value]._click();
            },
            get: () => {
                return element.getAttribute('data-selected-value');
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
