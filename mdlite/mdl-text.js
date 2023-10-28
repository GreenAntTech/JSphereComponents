import { registerComponent } from "../lib/element.min.js";

registerComponent('Text', (element) => {
    
    let _onclick = null;
    
    element._extend({
        render: (props) => {
            element._hidden = props.hidden || false;
            element._onclick = props.onclick || (() => {});
            if (props.value) element._value = props.value;
        },
        click: () => {
            element.click();
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
        }
    });
});
