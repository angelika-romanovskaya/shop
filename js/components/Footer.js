const Footer = function() {

    this.init = () => {
        let footerElem = document.createElement('footer');
        footerElem.classList.add('footer');
        footerElem.innerHTML = `
            <div class="content">
                <a class="footer__logo" href="#">
                    <img src="../../src/logo-social.png">
                </a>
                <ul class="footer__info">
                    <li>+375 00 000 00 00</li>
                    <li>Minsk, Central street, 0</li>
                    <li>some_email@gmail.com</li>
                </ul>
            </div>
        `;

        return footerElem;
    }
}

export default new Footer().init();