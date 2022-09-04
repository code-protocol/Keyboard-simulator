async function sliderFunctions(op, value) {

    await updateConfig(op, value);

    if (op == 'text_size') {
        changeTextSize(value);
    }
}

function changeTextSize(value) {
    textLine.classList = 'textLine textScale_' + String(value);
}