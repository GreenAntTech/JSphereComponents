import { registerComponent } from "../lib/element.min.js";

registerComponent('Text', (element) => {
    
    let _onclick = null;
    
    element._extend({
        render: (props) => {
            element._onclick = props.onclick ? props.onclick : () => { };
            if (props.value) element._value = props.value;
            element._visible = (typeof props.visible === 'boolean') ? props.visible : true;
        },
        click: () => {
            const { container } = element._components;
            container.click();
        },
        onclick: {
            set: (value) => {
                if (typeof value != 'function') return;
                element.removeEventListener('click', _onclick);
                _onclick = (e) => { value(e); };
                element.addEventListener("click", _onclick);
            },
            get: () => {
                return _onclick;
            }
        },
        value: {
            set: (value) => {
                if (typeof value != 'string') return;
                element.innerHTML = value;
            },
            get: () => {
                return element.innerHTML;
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
