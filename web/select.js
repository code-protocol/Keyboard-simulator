// let select2 = function () {
//     let selectHeader = document.querySelectorAll('.select__current');
//     let selectItem = document.querySelectorAll('.select__item');

//     selectHeader.forEach(item => {
//         item.addEventListener('click', selectToggle)
//     });

//     selectItem.forEach(item => {
//         item.addEventListener('click', selectChoose)
//     });

//     function selectToggle() {
//         if(this.parentElement.classList.contains('is-active')){
//             this.parentElement.classList.remove('is-active');
//         }else{
//             closeAllSelectors();
//             this.parentElement.classList.add('is-active');
//         }
//         // this.parentElement.classList.toggle('is-active');
//     }

//     function selectChoose() {
//         let text = this.innerText,
//             select = this.closest('.select'),
//             currentText = select.querySelector('.select__current');
//         currentText.innerText = text;
//         select.classList.remove('is-active');
//         Menufunctions();
//     }
// };

// function closeAllSelectors(){
//     document.querySelector('.change-lang').classList.remove('is-active');
//     document.querySelector('.change-scale').classList.remove('is-active');
//     document.querySelector('.change-level').classList.remove('is-active');
// }

// function Menufunctions(){
//     checkLang(document.querySelector('.select.change-lang').querySelector('span').textContent);
//     changeScale(document.querySelector('.select.change-scale').querySelector('span').textContent);
// }

// function checkLang(text){
//     if(allLang.includes(String(text).toLowerCase())){
//         changeURLLanguage(String(text).toLowerCase());
//         changeLanguage();
//         updateDataText();
//         updateKeyboard();
//     }
// }

// function changeScale(text){
//     if([0.50, 0.75, 1.00, 1.25, 1.50].includes(Number(text))){
//         let object =  document.querySelector('.keys');
//         object.classList.remove('scaled_050');
//         object.classList.remove('scaled_075');
//         object.classList.remove('scaled_100');
//         object.classList.remove('scaled_125');
//         object.classList.remove('scaled_150');
//         object.classList.add('scaled_'+text.substr(0,1)+text.substr(2));
//     }
// }

// select2();