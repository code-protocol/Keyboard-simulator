let text_content = '';
let textLine = document.querySelector('.textLine');
let NumberOfLettersInWords = new Map();
let words = new Map();
let lines = new Map();
let numLine = 1;

let index = 0;
let letterIndex = 0;

async function initialTextLine() {
    await initialization_levelStatistics();
    initialStatistics();
    text_content = await eel.getTextForLevel(config['level'], config['language'])();
    initial_Words();
    initial_Lines();
    initialInputField();
    changeTextSize(config['text_size']);
    initialActiveLetter();
}

function initialStatistics() {
    div = ''
    menu_statistics = document.querySelector('#menu-statistics');
    menu_statistics.innerHTML = createECI('DIV', 'menu_statistic', 'acc/wpm/correct/fail/time').outerHTML;
    for (i in levelStatistics) {
        if (i == 1) {
            div2 = createECI('DIV', 'menu_statistic', 'Last - ' + levelStatistics[i][1] + '% / ' + levelStatistics[i][2] + ' / ' + levelStatistics[i][3] + ' / ' + levelStatistics[i][4] + ' / ' + levelStatistics[i][5])
            menu_statistics.innerHTML += div2.outerHTML;
            continue;
        }
        div2 = createECI('DIV', 'menu_statistic', levelStatistics[i][1] + '% / ' + levelStatistics[i][2] + ' / ' + levelStatistics[i][3] + ' / ' + levelStatistics[i][4] + ' / ' + levelStatistics[i][5])
        menu_statistics.innerHTML += div2.outerHTML;
    }
}

function initial_Words() {
    words.clear();
    initial_NumberOfLettersInWords();
    div = createECI('DIV', 'word');
    j = 0;
    if(config['without_space'] == 'off') {
        for (let key = 0; key < text_content.length; key++) {
            if (text_content[key]==' ') {
                words.set(j++, div);
                div = createECI('DIV', 'word');
                continue;
            }

            if(key + 1 < text_content.length) {
                if(text_content[key + 1] == ' ') {
                    div.appendChild(createECI('LETTER', 'lastLetter', text_content[key]))
                    continue;
                }
            }
            div.appendChild(createECI('LETTER', '', text_content[key]))
        }
        if(div.textContent != '') {
            div.lastChild.className = 'lastLetter';
            words.set(j, div);
        }
    } else {
        letterIndex = 0;
        if(config['without_space'] == 'on') {
            text_content = text_content.replace(/\s+/g, '');
            for (let key = 0; key < text_content.length; key++) {
                if(letterIndex == config['line_length']) {
                    words.set(j++, div);
                    div = createECI('DIV', 'word');
                    letterIndex = 0;
                    continue;
                }
                div.appendChild(createECI('LETTER', '', text_content[key]))
                letterIndex++;
            }
        }
        if(div.textContent != '') {
            words.set(j, div);
        }
    }
}

function initial_NumberOfLettersInWords() {
    NumberOfLettersInWords.clear();
    j = 0;
    if(config['without_space'] == 'off') {
        for (key in text_content) {
            if (text_content[key]==' ') {
                letterIndex++;
                NumberOfLettersInWords.set(j, letterIndex);
                j++;
                letterIndex = 0;
                continue;
            }
            letterIndex++;
        }
        NumberOfLettersInWords.set(j, ++letterIndex);
    } else {
        for (key in text_content) {
            if(letterIndex == config['line_length']) {
                NumberOfLettersInWords.set(j, letterIndex);
                j++;
                letterIndex = 0;
                continue;
            }
            letterIndex++;
        }
    }
    NumberOfLettersInWords.set(j, ++letterIndex);
}

function initial_Lines() {
    lines.clear();
    j = 1;
    div = createECI('DIV','line');
    for(i = 0; i < words.size; i++) {
        if(index + NumberOfLettersInWords.get(i) <= config['line_length']) {
            div.appendChild(words.get(i));
            index += NumberOfLettersInWords.get(i);
        }else { 
            lines.set(j++, div);
            i--;
            index = 0;
            div = createECI('DIV','line');
        }
    }
    if(div.textContent != '') {
        lines.set(j, div);
    }
}

function initialInputField() {
    textLine.innerHTML = '';
    numLine = 1;
    while(numLine <= config['lines']) {
        plusLine();
    }
}

function plusLine() {
    if (lines.get(numLine)) {
        textLine.innerHTML += lines.get(numLine).outerHTML;
    }
    numLine++
}

function delLine() {
    if (document.querySelector('.line.correct')) {
        document.querySelector('.line.correct').remove();
    }
}

function initialActiveLetter() {
    letter = setActiveLetterForTextLine();
    setActiveLetterForKeyboard(letter);
}

function setActiveLetterForTextLine() {
    letter = textLine.querySelector('letter:not(.correct)');
    letter.classList.add('active');
    return letter.textContent
}

async function updateDataText() {
    finish = false;
    status_Fail = 0;
    status_correct = 0;
    status_Time = false;
    time = 0;
    clearInterval(intervalId);
    index = 0;
    letterIndex = 0;
    currentLine = 1;

    await initialTextLine();
}