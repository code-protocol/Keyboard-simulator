let allLang = [];
let langArr = '';
let config = [];
let range_options = [];
let switches = ['ON', 'OFF'];

async function Start() {
    await initialization_Lang();
    await initialization_Config();
    await initialization_Range();
    initialization_MenuOptions();
    changeStatusMenuStatistics();

    await updateLang();
    select();
    checkKeyboard();
}

async function initialization_levelStatistics() {
    levelStatistics = await eel.getStatistics(config['level'])();
}

function checkKeyboard() {
    changeKeyboardStatus();
    changeKeyboardSize();
}

async function initialization_Config() {
    config = await eel.getConfig()();
}

async function initialization_Range() {
    range_options = await eel.getRange()();
}

async function initialization_Lang() {
    allLang = await eel.getLangs()();
    langArr = await eel.initializationLangArr(allLang)();
}

function initialization_MenuOptions() {
    initialSettings('Language', 'arrows', allLang);
    initialSettings('Level', 'arrows', rangeGeneration(range_options['level']));
    initialSettings('Keyboard', 'arrows', switches);
    initialSettings('Keyboard Size', 'arrows', rangeGeneration(range_options['keyboard_size'], 1), 1);
    initialSettings('Line Length', 'arrows', rangeGeneration(range_options['line_length']));
    initialSettings('Text Size', 'slider', rangeGeneration(range_options['text_size']));
    initialSettings('Lines', 'arrows', rangeGeneration(range_options['lines']));
    initialSettings('Up On', 'arrows', rangeGeneration(range_options['lines']));
    initialSettings('Without Space', 'arrows', switches);
    initialSettings('Statistics', 'arrows', switches);
}

function update_MenuOption(option, value) {
    selector = document.querySelector('.change-' + String(option).replace(' ', '_').toLowerCase());
    selector.querySelector('.current_arrow-selector').textContent = value;
}

function createECI(element, classes='', inner='') {
    htmlCode = document.createElement(element);
    if(classes != '') {
        htmlCode.className = classes;
    }
    htmlCode.innerHTML = inner;
    return htmlCode
}

function initialSettings(name, settings_name, range, settings=0) {
    config_name = String(name).replace(' ', '_').toLowerCase()
    main = String(config[config_name]).toUpperCase()


    div = createECI("DIV", "menuOptions unselectable");
    div.appendChild(createECI("DIV", "name-option", name));

    if(settings_name == 'arrows') {

        div2 = createECI("DIV", "arrow-selector change-" + config_name + " unselectable");
        div2.appendChild(createECI('I',"arrow-left"));

        div3 = createECI("DIV", "current_arrow-selector");
        if(!settings) {
            div3.innerHTML = main;
        }else {
            div3.innerHTML = String(Number(main).toFixed(settings));
        }
        div2.appendChild(div3);

        for(i in range){
            div2.appendChild(createECI("DIV", "arrow__select__item", String(range[i]).toUpperCase()));
        }
        div2.appendChild(createECI('I',"arrow-right"));
        div.appendChild(div2);

    }else if(settings_name == 'slider') {
        div4 = createECI('INPUT', "fader");
        div4.setAttribute('type', "range");
        div4.setAttribute('min', range[0]);
        div4.setAttribute('max', range[range.length - 1]);
        div4.setAttribute('value', main);
        div4.setAttribute('step', range_options[config_name]['step']);
        div4.setAttribute('oninput', "sliderFunctions(\"" + String(name).replace(' ', '_').toLowerCase() + "\", value)");

        div.appendChild(createECI('DIV', "slider").appendChild(div4));
    }
    document.querySelector('.burger-menu__nav').appendChild(div);
}

function rangeGeneration(mas, settings=0) {
    thisRange = []
    for(i = mas['minimum']; i.toFixed(1) <= mas['maximum']; i += mas['step']){
        if(!settings){
            thisRange.push(i)
        }else{
            thisRange.push(i.toFixed(settings))
        }
    }
    return thisRange
}

Start();