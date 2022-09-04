function activateFinishButton () {
    document.querySelector('.buttNext').addEventListener('click', nextLvl);
    document.querySelector('.buttRestart').addEventListener('click', pressRestart);
}

function pressRestart() {
    updateDataText();
}