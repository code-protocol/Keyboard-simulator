let activeLetterOn = 600
let waitForSpace = false;
let currentLine = 1;
let finish = false;
let status_Fail = 0;
let status_correct = 0;
let status_Time = false;
let time = 0;
let ignore = ['F1','F2','F3','F4','F5','F6','F7','F8','F9','F10','F11','F12','Escape','Shift','CapsLock','Control','Alt','Tab','`','1','2','3','4','5','6','7','8','9','0','-','=','Enter','Backspace']
var intervalId = null;
let globalKey = null;
let statistics = []

document.onkeydown = function(event) {
    globalKey = event.key;
    validation(event.key);
}

function checkToNextLevel(key) {
    if(status_Time && finish) {
        if(key == ' ') {
            nextLvl();
        }
    }
}

function checkFinish() {
    if (!finish) {
        clearInterval(intervalId);
        waitForSpace = false;
        finish = true;
        clearActiveLettersOnKeyboard();
        htmlStatus();
        activateFinishButton();
        saveStatistics();
    }
}

async function saveStatistics() {
    await eel.saveStatistics(statistics)();
}

function checkStatusTime() {
    if(!status_Time) {
        status_Time = true;
        time = 0;
        intervalId = setInterval(tick, 10);
    }
}

function checkLastWordForCorrect() {
    word = document.querySelector('.word:not(.correct)');
    if(!word.querySelector('letter:not(.correct)')) {
        return true;
    }
    return false;
}

function validation(key) {
    let activeLetter = textLine.querySelector('letter:not(.correct)');
    if(!activeLetter && !lines.get(numLine)) {
        checkToNextLevel(key);
        checkFinish();
    }

    if (!finish && ignore.indexOf(key) == -1) {
        checkStatusTime();
        if(waitForSpace) {
            if(key == ' ') {
                status_correct++;
                waitForSpace = false;
                if(document.querySelector('.activeSpace')) {
                    document.querySelector('.activeSpace').classList.remove('activeSpace');
                }
                document.querySelector('.lng-space').classList.remove('keyboard_active_letter');

                checkActiveLine();
                activeLetter = textLine.querySelector('letter:not(.correct)');

                activeLetter.classList.add('active');
                setActiveLetterForKeyboard(activeLetter.textContent);
                
            }else{
                status_Fail++;
            }
        }else if (key == activeLetter.textContent) {
            status_correct++;
            activeLetter.classList.remove('active');
            activeLetter.classList.remove('incorrect');
            activeLetter.classList.add('correct');
            clearActiveLettersOnKeyboard()

            if(checkLastWordForCorrect()) {
                document.querySelector('.word:not(.correct)').classList.add('correct');
                if(config['without_space'] != 'on') {
                    activeLetter.classList.add('activeSpace');
                    waitForSpace = true;

                    if(config['keyboard'] == 'on') {
                        document.querySelector('.lng-space').classList.add('keyboard_active_letter');
                    }
                } else {
                    checkActiveLine();
                    activeLetter = textLine.querySelector('letter:not(.correct)');
                    if(!activeLetter && !lines.get(numLine)) {
                        checkFinish();
                    } else {
                        activeLetter.classList.add('active');
                        setActiveLetterForKeyboard(activeLetter.textContent);
                    }
                }

            }else{
     
                activeLetter = textLine.querySelector('letter:not(.correct)');
                activeLetter.classList.add('active');
                setActiveLetterForKeyboard(activeLetter.textContent);
            }
            
        } else {
            status_Fail++;
            activeLetter.classList.add('incorrect');
        }
    }
}

async function nextLvl() {
    if(config['level'] + 1 > range_options['level']['maximum']) {
        await eel.setConfig('level', '0');
    } else {
        await eel.setConfig('level', config['level'] + 1);
    }
    await initialization_Config();
    update_MenuOption('Level', config['level']);
    updateDataText();
}

function tick()
{
    time += 0.01;
}

function htmlStatus() {
    wpm = Number(Number(status_correct/(time.toFixed(2)/12)).toFixed(0));
    acc = Number((100 - status_Fail/((status_correct + status_Fail)/100)).toFixed(0));
    statistics = [config['level'], acc, wpm, status_correct, status_Fail, Number(time.toFixed(2))];
    div = createECI('DIV', '','acc: ' + acc + '%, wpm: ' + wpm + ', correct: ' + status_correct + ', fail: ' + status_Fail + ', time: ' + time.toFixed(2) + ' sec');
    div2 = createECI('DIV', 'dws');
    div2.appendChild(createECI('DIV', 'butt buttRestart', 'restart'));
    div2.appendChild(createECI('DIV', 'butt buttNext', 'next'));
    div.appendChild(div2);
    textLine.innerHTML = div.outerHTML;
}

function checkActiveLine() {
    thisLine = textLine.querySelector('.line:not(.correct)');
    if(thisLine) {
        if(!thisLine.querySelector('.word:not(.correct)')) {
            thisLine.classList.add('correct');
            currentLine++;
            if (currentLine > config['up_on']) {
                plusLine();
                delLine();
            }
        }
    }
}

function setActiveLetterForKeyboard(letter) {
    document.querySelector('.lng-' + getKey(letter)).classList.add('keyboard_active_letter');
}

function getKey(lang_key) {
    for (let key in langArr) {
        if (lang_key == langArr[key][config['language']]) {
           return key;
        }
    }
}

function clearActiveLettersOnKeyboard() {
    for (let key in langArr) {
        document.querySelector('.lng-' + key).classList.remove('keyboard_active_letter');
    }
}