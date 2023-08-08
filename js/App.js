import Store from "./core/Store.js";
import Header from "./components/Header.js";
import Nav from "./components/Nav.js";
import Main from "./components/Main.js";
import Footer from "./components/Footer.js";

const App = function () {

    this.rootElem = document.querySelector('#root');

    this.appElem = document.createElement('div');
    this.appElem.classList.add('app');

    this.url = 'https://fakestoreapi.com/products';
    this.urlCategories = 'https://fakestoreapi.com/products/categories'

    this.nav = '';

    this.getData = async() => {
        if(window.localStorage.storeAppCategories){
            let data = JSON.parse(window.localStorage.storeAppCategories);
            this.nav = new Nav(data).init();
        } else 
            await fetch(this.urlCategories)
            .then(res => res.json())
            .then(data => {
                window.localStorage.setItem('storeAppCategories', JSON.stringify(data));
                this.nav = new Nav(data).init();
            });

        if(window.localStorage.storeAppData){
            let data = JSON.parse(window.localStorage.storeAppData);
            window.store = new Store(data);
        } else 
            await fetch(this.url)
            .then(res => res.json())
            .then(data => {
                window.localStorage.setItem('storeAppData', JSON.stringify(data));
                window.store = new Store(data);
            })
    }

    this.spinner = document.createElement('div');
    this.spinner.classList.add('spinner');

    this.init = async () => {
        
        let header = Header;

        let main = document.createElement('div');
        main.classList.add('main_content');
        main.append(this.spinner);
        let mainElem = new Main();
        
        let footer = Footer;

        this.appElem.append(header.init(), main, footer);

        this.rootElem.append(this.appElem);
        window.addEventListener('hashchange', () => {
            main.append(mainElem.render());
        });
        
        window.addEventListener('cartChanged', () => {
            header.cartItems = window.store.cart.get().length;
            header.updateCart();
            main.append(mainElem.render());

        })

        await this.getData();
        header.nav = this.nav;
        header.updateCategories();
        main.querySelector('.spinner').remove();
        
        if(window.localStorage.storeApp) {
            
            JSON.parse(window.localStorage.storeApp).forEach(elem => 
                window.store.cart.add(window.store.getById(elem.id))
            )
        }


        main.append(mainElem.render());
        header.cartItems = window.store.cart.get().length;
    }
}

export default new App().init();