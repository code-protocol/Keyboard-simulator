document.querySelector('.c-hamburger').addEventListener('click', function(elem) {
    if(globalKey != ' ') {
        elem.preventDefault();
        if (this.classList.contains('is-active')) {
            this.classList.remove('is-active');
            document.querySelector('#menu').classList.remove('nav-active');
        } else {
            this.classList.add('is-active');
            document.querySelector('#menu').classList.add('nav-active');
        }
    }
    globalKey = null;
})