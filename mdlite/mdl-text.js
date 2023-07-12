import { registerComponent } from "../lib/element.min.js";

registerComponent('Text', (element) => {
    
    let _captions = (value) => { return value };
    let _onclick = null;
    
    element._extend({
        render: (props) => {
            element._hidden = props.hidden || false;
            element._onclick = props.onclick || (() => {});
            if (props.value) element._value = props.value;
        },
        click: () => {
            const { container } = element._components;
            container.click();
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
                element.innerHTML = _captions(value);
            },
            get: () => {
                return element.innerHTML;
            }
        }
    });
});
