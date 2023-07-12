import { registerComponent } from "../lib/element.min.js";

registerComponent('Select', (element, ctx) => {
    
    const TEMPLATE = `
        <style>
            .getmdl-select {
                outline:none
            }
            
            .getmdl-select .mdl-textfield__input {
                cursor:pointer
            }
            
            .getmdl-select .selected {
                background-color:#ddd
            }
            
            .getmdl-select .mdl-icon-toggle__label {
                float:right;
                margin-top:-30px;
                color:rgba(0,0,0,0.4);
                transform:rotate(0);
                transition:transform 0.3s
            }
            
            .getmdl-select.is-focused .mdl-icon-toggle__label {
                color:#3f51b5;
                transform:rotate(180deg)
            }
            
            .getmdl-select .mdl-menu__container {
                width:100% !important;
                margin-top:2px
            }
            
            .getmdl-select .mdl-menu__container .mdl-menu {
                width:100%
            }
            
            .getmdl-select .mdl-menu__container .mdl-menu .mdl-menu__item {
                font-size:16px
            }
            
            .getmdl-select__fix-height .mdl-menu__container .mdl-menu {
                overflow-y:auto;max-height:288px !important
            }
            
            .getmdl-select__fix-height .mdl-menu.mdl-menu--top-left {
                bottom:auto;top:0
            }

            .getmdl-select__hidden {
                display: none
            }
        </style>
        <div data-id="container" style="width:100%" class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label getmdl-select getmdl-select__fix-height">
            <input data-id="input" class="mdl-textfield__input" type="text" readonly>
            <input data-id="hidden" type="hidden">
            <i data-id="arrow">keyboard_arrow_down</i>
            <label data-id="label" class="mdl-textfield__label"></label>
            <span data-id="message" class="mdl-textfield__error"></span>
            <ul data-id="list" class="mdl-menu mdl-menu--bottom-left mdl-js-menu"></ul>
        </div>
    `;
    
    const THEMES = {
        'select': {
            element: 'mdl-textfield mdl-js-textfield mdl-textfield--floating-label getmdl-select getmdl-select__fix-height',
            input: 'mdl-textfield__input',
            arrow: 'mdl-icon-toggle__label material-icons getmdl-select__hidden',
            label: 'mdl-textfield__label',
            ul: 'mdl-menu mdl-menu--bottom-left mdl-js-menu',
            span: 'mdl-textfield__error'
        },
        'select.arrow': {
            element: 'mdl-textfield mdl-js-textfield mdl-textfield--floating-label getmdl-select getmdl-select__fix-height',
            input: 'mdl-textfield__input',
            arrow: 'mdl-icon-toggle__label material-icons',
            label: 'mdl-textfield__label',
            ul: 'mdl-menu mdl-menu--bottom-left mdl-js-menu',
            span: 'mdl-textfield__error'
        },
        'select.float': {
            element: 'mdl-textfield mdl-js-textfield mdl-textfield--floating-label getmdl-select getmdl-select__fix-height',
            input: 'mdl-textfield__input',
            arrow: 'mdl-icon-toggle__label material-icons getmdl-select__hidden',
            label: 'mdl-textfield__label',
            ul: 'mdl-menu mdl-menu--bottom-left mdl-js-menu',
            span: 'mdl-textfield__error'
        },
        'select.float.arrow': {
            element: 'mdl-textfield mdl-js-textfield mdl-textfield--floating-label getmdl-select getmdl-select__fix-height',
            input: 'mdl-textfield__input',
            arrow: 'mdl-icon-toggle__label material-icons',
            label: 'mdl-textfield__label',
            ul: 'mdl-menu mdl-menu--bottom-left mdl-js-menu',
            span: 'mdl-textfield__error'
        }
    };
    
    let _captions = (value) => { return value };
    let _map = { value: 'value', text: 'text' };
    let _options = [];
    let _onchange = null;
    
    element._extend({
        render: (props) => {
            element._useTemplate(TEMPLATE);
            element._hidden = props.hidden || false;
            element._disabled = props.disabled || false;
            element._readonly = props.readonly || false;
            element._map = props.map || { value: 'value', text: 'text' };
            element._options = props.options || [];
            element._label = props.label || '';
            element._value = props.value || '';
            element._invalid = props.invalid || false;
            element._message = props.message || '';
            element._onchange = props.onchange || (() => {});
            element._theme = props.theme || 'select';
        },
        disabled: {
            set: (value) => {
                if (typeof value != 'boolean') return;
                const { input } = element._components;
                if (value)
                    input.setAttribute('disabled', '');
                else
                    input.removeAttribute('disabled');
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
        invalid: {
            set: (value) => {
                if (typeof value != 'boolean') return;
                const { container } = element._components;
                if (value) {
                    container.classList.add('is-invalid');
                }
                else {
                    container.classList.remove('is-invalid');
                }
            },
            get: () => {
                const { container } = element._components;
                return container.classList.contains('is-invalid');
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
        map: {
            set: (value) => {
                if (typeof value != 'object' || Array.isArray(value)) return;
                _map = value;
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
            }
        },
        onchange: {
            set: (value) => {
                if (typeof value != 'function') return;
                const { input } = element._components;
                input.removeEventListener('change', _onchange);
                _onchange = () => {
                    element._invalid = false;
                    setTimeout(() => { value(); }, 0);
                };
                input.addEventListener("change", _onchange);
            }
        },
        options: {
            set: (value) => {
                if (!Array.isArray(value)) return;
                const { hidden, list } = element._components;
                _options = value;
                list.innerHTML = '';
                for (let i = 0; i < _options.length; i++) {
                    const option = _options[i];
                    const value = (option[_map.value] !== undefined) ? option[_map.value] : i;
                    const listItem = element.ownerDocument.createElement('li');
                    listItem.className = 'mdl-menu__item';
                    if (value === hidden.value)
                        listItem.setAttribute('data-selected', 'true');
                    listItem.setAttribute('data-val', value);
                    listItem.innerHTML = _captions((option[_map.text] !== undefined) ? option[_map.text] : option);
                    list.appendChild(listItem);
                }
                getmdlSelect.init('.getmdl-select', element);
            }
        },
        readonly: {
            set: (value) => {
                if (typeof value != 'boolean') return;
                const { container, input } = element._components;
                if (value) {
                    element.getAttribute('data-x-theme', element._theme);
                    element._theme = 'select';
                    input.setAttribute('readonly', '');
                    if (element._value) container.classList.add('is-dirty');
                }
                else {
                    element._theme = element.getAttribute('data-x-theme');
                    input.removeAttribute('readonly');
                }
            },
            get: () => {
                const { input } = element._components;
                return input.hasAttribute('readonly');
            }
        },
        theme: {
            set: (value) => {
                if (typeof value != 'string') return;
                const { arrow, container, input, label, list, message } = element._components;
                const theme = THEMES[value];
                container.className = theme.element;
                input.className = theme.input;
                arrow.className = theme.arrow;
                label.className = theme.label;
                message.className = theme.span;
                list.className = theme.ul;
                getmdlSelect.init('.getmdl-select', element);
                if (globalThis.componentHandler)
                    globalThis.componentHandler.upgradeElement(container);
            }
        },
        text: {
            get: () => {
                const { input } = element._components;
                return input.value;
            }
        },
        value: {
            set: (value) => {
                if (typeof value != 'string' && typeof value != 'number' && typeof value != 'boolean') return;
                const { container, hidden, input } = element._components;
                let itemFound = false;
                for (const option of _options) {
                    if (option[_map.value] == value) {
                        input.value = option[_map.text];
                        hidden.value = value;
                        if (hidden.value !== '')
                            container.classList.add('is-dirty');
                        else
                            container.classList.remove('is-dirty');
                        if (typeof (_onchange) === 'function')
                            _onchange();
                        itemFound = true;
                        break;
                    }
                }
                if (!itemFound) {
                    input.value = '';
                    hidden.value = '';
                }
            },
            get: () => {
                const hidden = element._components['hidden'];
                let value = hidden.value;
                if ((hidden.value === 'true') || (hidden.value === 'false'))
                    return hidden.value === 'true';
                return value;
            }
        }
    });
});

// GETMDL-SELECT UTILITY CODE
'use strict';
const getmdlSelect = {
    _addEventListeners: function (dropdown) {
        const input = dropdown.querySelector('input');
        const hiddenInput = dropdown.querySelector('input[type="hidden"]');
        const list = dropdown.querySelectorAll('li');
        const menu = dropdown.querySelector('.mdl-js-menu');
        const arrow = dropdown.querySelector('.mdl-icon-toggle__label');
        let label = '';
        let opened = false;
        const setSelectedItem = function (li) {
            const value = li.textContent.trim();
            input.value = value;
            list.forEach(function (li) {
                li.classList.remove('selected');
            });
            li.classList.add('selected');
            dropdown.MaterialTextfield.change(value); // handles css class changes
            setTimeout(function () {
                dropdown.MaterialTextfield.updateClasses_(); //update css class
            }, 250);
            // update input with the "id" value
            hiddenInput.value = li.dataset.val || '';
            if ("createEvent" in dropdown.ownerDocument) {
                menu['MaterialMenu'].hide();
                input.dispatchEvent(new Event('change', { bubbles: false, cancelable: true }));
            }
            else {
                input.fireEvent("onchange");
            }
        };
        const hideAllMenus = function () {
            opened = false;
            if (!dropdown.querySelector('.mdl-menu__container').classList.contains('is-visible')) {
                dropdown.classList.remove('is-focused');
            }
            const menus = dropdown.ownerDocument.querySelectorAll('.getmdl-select .mdl-js-menu');
            [].forEach.call(menus, function (menu) {
                menu['MaterialMenu'].hide();
            });
            const event = new Event('closeSelect');
            menu.dispatchEvent(event);
        };
        dropdown.ownerDocument.body.addEventListener('click', hideAllMenus, false);
        //hide previous select after press TAB
        dropdown.onkeydown = function (event) {
            if (event.keyCode == 9) {
                menu['MaterialMenu'].hide();
                dropdown.classList.remove('is-focused');
            }
        };
        //show select if it has focus
        input.onfocus = function () {
            if (input.hasAttribute('disabled') || input.hasAttribute('readonly')) return;
            menu['MaterialMenu'].show();
            menu.focus();
            opened = true;
        };
        input.onblur = function (e) {
            e.stopPropagation();
        };
        //hide all old opened selects and opening just clicked select
        input.onclick = function (e) {
            e.stopPropagation();
            if (input.hasAttribute('disabled') || input.hasAttribute('readonly')) {
                hideAllMenus();
                dropdown.classList.add('is-focused');
                return;
            }
            if (!menu.classList.contains('is-visible')) {
                menu['MaterialMenu'].show();
                hideAllMenus();
                dropdown.classList.add('is-focused');
                opened = true;
            }
            else {
                menu['MaterialMenu'].hide();
                opened = false;
            }
        };
        input.onkeydown = function (event) {
            if (event.keyCode == 27) {
                menu['MaterialMenu'].hide();
                dropdown.MaterialTextfield.onBlur_();
                if (label !== '') {
                    dropdown.querySelector('.mdl-textfield__label').textContent = label;
                    label = '';
                }
            }
        };
        menu.addEventListener('closeSelect', function () {
            dropdown.classList.remove('is-focused');
            if (label !== '') {
                dropdown.querySelector('.mdl-textfield__label').textContent = label;
                label = '';
            }
        });
        //set previous value and data-val if ESC was pressed
        menu.onkeydown = function (event) {
            if (event.keyCode == 27) {
                dropdown.classList.remove('is-focused');
                if (label !== '') {
                    dropdown.querySelector('.mdl-textfield__label').textContent = label;
                    label = '';
                }
            }
        };
        if (arrow) {
            arrow.onclick = function (e) {
                e.stopPropagation();
                if (input.hasAttribute('disabled') || input.hasAttribute('readonly')) return;
                if (opened) {
                    menu['MaterialMenu'].hide();
                    opened = false;
                    dropdown.classList.remove('is-focused');
                    dropdown.MaterialTextfield.onBlur_();
                }
                else {
                    hideAllMenus();
                    dropdown.MaterialTextfield.onFocus_();
                    input.focus();
                    menu['MaterialMenu'].show();
                    opened = true;
                }
            };
        }
        [].forEach.call(list, function (li) {
            li.onfocus = function () {
                dropdown.classList.add('is-focused');
                const value = li.textContent.trim();
                input.value = value;
                if (!dropdown.classList.contains('mdl-textfield--floating-label') && label == '') {
                    label = dropdown.querySelector('.mdl-textfield__label').textContent.trim();
                    dropdown.querySelector('.mdl-textfield__label').textContent = '';
                }
            };
            li.onclick = function () {
                setSelectedItem(li);
            };
            if (li.dataset.selected) {
                setSelectedItem(li);
            }
        });
    },
    init: function (selector, element) {
        const dropdowns = element.ownerDocument.querySelectorAll(selector);
        [].forEach.call(dropdowns, function (dropdown) {
            getmdlSelect._addEventListeners(dropdown);
            if (globalThis.componentHandler) {
                globalThis.componentHandler.upgradeElement(dropdown);
                globalThis.componentHandler.upgradeElement(dropdown.querySelector('ul'));
            }
        });
    }
};
