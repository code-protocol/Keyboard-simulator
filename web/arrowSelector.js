let select = function() {
    let left_arrow_selectors = document.querySelectorAll('.arrow-left');
    let right_arrow_selectors = document.querySelectorAll('.arrow-right');

    right_arrow_selectors.forEach(item => {
        item.addEventListener('click', right_click)
    });

    left_arrow_selectors.forEach(item => {
        item.addEventListener('click', left_click)
    });

    function left_click() {
        let select = this.closest('.arrow-selector'),
            currentText = select.querySelector('.current_arrow-selector'),
            selectItem = select.querySelectorAll('.arrow__select__item');
        for (let i = 0; i < selectItem.length; i++) {
            if (selectItem[i].textContent == currentText.textContent) {
                if (i) {
                    currentText.innerText = selectItem[i - 1].textContent;
                } else {
                    currentText.innerText = selectItem[selectItem.length - 1].textContent;
                }
                break;
            }
        }
        Menufunctions(select);
    }

    function right_click() {
        let select = this.closest('.arrow-selector'),
            currentText = select.querySelector('.current_arrow-selector'),
            selectItem = select.querySelectorAll('.arrow__select__item');
        for (let i = 0; i < selectItem.length; i++) {
            if (selectItem[i].textContent == currentText.innerText) {
                if (i == selectItem.length - 1) {
                    currentText.innerText = selectItem[0].textContent;
                } else {
                    currentText.innerText = selectItem[i + 1].textContent;
                }
                break;
            }
        }
        Menufunctions(select);
    }
}

async function Menufunctions(selector) {
    current_text = selector.querySelector('.current_arrow-selector').textContent;
    settings_name = selector.classList[1].replace('change-', '');
    await updateConfig(settings_name, current_text);

    if (selector.classList.contains('change-language')) {updateLang()}
    if (selector.classList.contains('change-keyboard_size')) {changeKeyboardSize()}
    if (selector.classList.contains('change-level')) {updateDataText();clearActiveLettersOnKeyboard();}
    if (selector.classList.contains('change-line_length')) {updateDataText(), clearActiveLettersOnKeyboard();}
    if (selector.classList.contains('change-keyboard')) { clearActiveLettersOnKeyboard(); changeKeyboardStatus();}
    if (selector.classList.contains('change-lines')) {await changeLines();}
    if (selector.classList.contains('change-up_on')) {await checkUpOn();}
    if (selector.classList.contains('change-without_space')) {updateDataText();clearActiveLettersOnKeyboard();}
    if (selector.classList.contains('change-statistics')) {changeStatusMenuStatistics()}
}

function changeStatusMenuStatistics() {
    menuStatistics = document.querySelector('#menu-statistics');
    if (config['statistics'] == 'off') {
        menuStatistics.classList.remove('is-active');
    } else {
        menuStatistics.classList.add('is-active');
    }
}

async function updateConfig(name, value) {
    await eel.setConfig(name, value)();
    await initialization_Config();
}

async function checkUpOn() {
    if(config['up_on'] > config['lines']) {
        await changeUpOn(config['lines']);
    }
}

async function changeUpOn(num) {
    await eel.setConfig('up_on', config['lines'])();
    document.querySelector('.change-up_on').querySelector('.current_arrow-selector').textContent = num;
    await initialization_Config();
}

async function updateLang() {
    updateLangForKeyboard();
    await updateDataText();
    clearActiveLettersOnKeyboard();
    setActiveLetterForKeyboard(textLine.querySelector('letter:not(.corrrect)').textContent)
}

function updateLangForKeyboard(){
    for(let key in langArr){
        document.querySelector('.lng-' + key).innerHTML = langArr[key][config['language']];
    }
}

function changeKeyboardSize() {
    text = String(config['keyboard_size'].toFixed(1))
    document.querySelector('.keys').classList = 'keys scaled_' + text.replace('.','');
}

function changeKeyboardStatus() {
    text = config['keyboard']
    // console.log(textLine.outerHTML)
    document.querySelectorAll('.key').forEach(item => {
        if (text == 'off') {
            item.classList.add('invisible-keyboard');
        } else if (text == 'on') {
            item.classList.remove('invisible-keyboard');
        }
    });
    if(config['keyboard'] != 'off' && waitForSpace) {
        document.querySelector('.lng-space').classList.add('keyboard_active_letter');
    } else {
        setActiveLetterForKeyboard(textLine.querySelector('letter:not(.corrrect)').textContent)
    }
}

async function changeLines() {
    await checkUpOn();
    updateDataText();
    clearActiveLettersOnKeyboard();
}
