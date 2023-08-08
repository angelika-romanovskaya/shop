const Main = function() {

    this.createProductCard = (product) => {
        let elem = document.createElement('a');
        elem.href = `#product/${product.id}`;
        elem.classList.add('product-card');
        
        let addBtn = document.createElement('button');
        addBtn.classList.add('product-card__add-btn');
        if (window.store.cart.isInCart(product.id).length)
            {
                addBtn.innerText = 'In cart';
                addBtn.classList.contains('in_cart') ? '' : addBtn.classList.add('in_cart')
            }
        else {
            addBtn.innerText = 'To cart';
            addBtn.classList.contains('in_cart') ? addBtn.classList.remove('in_cart') : '';
        }
        addBtn.addEventListener('click', (event) => {
            event.preventDefault();
            let id = event.target.parentNode.querySelector('input[name="id"]').value;
            this.onAdd(id);
        },);

        elem.innerHTML = `
            <div class="product-card__title">${product.title}</div>
            <input hidden name="id" value='${product.id}'>
            <img class="product-card__image" src='${product.image}'>
            <div class="product-card__info">
                <span class="product-card__info_price">$${product.price}</span>
                <div class="product-card__info_stars" style="
                            width:150px; 
                            height: 30px;
                            background: linear-gradient(0.25turn, yellow ${product.rating.rate*100/5}%, #ccc 0);">
                    <img class="product-card__stars_template" src="../../src/stars_template.png">
                </div>
                <span class="product-card__info_rating">${product.rating.rate}</span>
            </div>
        `;
        elem.append(addBtn);
        return elem;
    }

    this.createCartItem = (product) => {
        let elem = document.createElement('li');
        elem.classList.add('cart_list__item');
        
        let removeBtn = document.createElement('button');
        removeBtn.classList.add('cart_list__item_remove_btn');


        removeBtn.addEventListener('click', (event) => {
            let id = event.target.parentNode.querySelector('input[name="id"]').value;
            this.onRemove(id);
        });

        let sumPrice = product.price * window.store.cart.isInCart(product.id).length;

        let itemCounter = window.store.cart.isInCart(product.id).length;

        let increaseBtn = document.createElement('button');
        increaseBtn.classList.add('cart_list__item_increase_btn');
        increaseBtn.innerText = '+';
        increaseBtn.addEventListener('click', (event) => {
            let id = event.target.parentNode.querySelector('input[name="id"]').value;
            this.onIncrease(id);
        })

        let reduceBtn = document.createElement('button');
        reduceBtn.classList.add('cart_list__item_reduce_btn')
        reduceBtn.innerText = '-';
        reduceBtn.addEventListener('click', (event) => {
            let id = event.target.parentNode.querySelector('input[name="id"]').value;
            this.onReduce(id);
        })

        elem.innerHTML = `
            <span class="cart_list__item_title">${product.title}</span>
            <input hidden name="id" value='${product.id}'>

            <span class="cart_list__item_counter">${itemCounter}</span>
           
            <span class="cart_list__item_price">$${sumPrice.toFixed(2)}</span>
        `;
        elem.append(increaseBtn, reduceBtn, removeBtn);
        return elem;
    }

    this.createProductPage = (product) => {
        let elem = document.createElement('div');
        elem.classList.add('product-page');
        
        let addBtn = document.createElement('button');
        addBtn.classList.add('product-card__add-btn');
        if (window.store.cart.isInCart(product.id).length)
            {
                addBtn.innerText = 'In cart';
                addBtn.classList.contains('in_cart') ? '' : addBtn.classList.add('in_cart')
            }
        else {
            addBtn.innerText = 'To cart';
            addBtn.classList.contains('in_cart') ? addBtn.classList.remove('in_cart') : '';
        }
        addBtn.addEventListener('click', (event) => {
            let id = event.target.parentNode.querySelector('input[name="id"]').value;
            this.onAdd(id);
        });

        elem.innerHTML = `
            <div class="product-page__title">${product.title}</div>
            <button class="product-page__close_btn">+</button>
            <input hidden name="id" value='${product.id}'>
            <img class="product-page__image" src='${product.image}'>
            <div class="product-page__info">
                <p class="product-page__description">${product.description}</p>
                <span class="product-page__info_price">$${product.price}</span>
                <div class="product-page__info_stars" style="
                            width:150px; 
                            height: 30px;
                            background: linear-gradient(0.25turn, yellow ${product.rating.rate*100/5}%, #ccc 0);">
                    <img class="product-page__stars_template" src="../../src/stars_template.png">
                </div>
                <span class="product-page__info_rating">${product.rating.rate}</span>
            </div>
        `;
        elem.querySelector('.product-page__close_btn').addEventListener('click', () => {
            if(window.navigation.canGoBack)
                window.navigation.back();
            else window.location.hash = '';
        });
        elem.append(addBtn);
        return elem;
    }
    this.onAdd = (id) => {
        window.store.cart.add(window.store.getById(id));
    }
    this.onRemove = (id) => {
        window.store.cart.remove(id);
    }

    this.onIncrease = (id) => {
        window.store.cart.add(window.store.getById(id));
    }
    this.onReduce = (id) => {
        window.store.cart.removeFirst(id);
    }

    this.router = (mainElem) => {
        let hash = window.location.hash
        if (!hash) {
            window.store.get().forEach(elem => {
                mainElem.append(this.createProductCard(elem));
            })
        } else if (hash.includes('product')) {
            let id = window.location.hash.match(/[0-9]+$/)[0];
            mainElem.append(this.createProductPage(window.store.getById(id)));
        } else if (hash.includes('cart')){
            mainElem.classList.add('main_cart');
            let cartList = document.createElement('ul');
            cartList.classList.add('cart_list');

            new Set(window.store.cart.get()).forEach(elem => {
                cartList.append(this.createCartItem(elem));
            })
            mainElem.append(cartList);
            let sum = document.createElement('span');
            sum.classList.add('cart_sum');
            sum.innerText = `To pay: $${window.store.cart.calc()}`
            mainElem.append(sum);
        } else {
            let filter = hash.replace('#', '');
            window.store.get()
            .filter(item => item.category == filter)
            .forEach(elem => {
                mainElem.append(this.createProductCard(elem));
            })
        }
    }

    this.render = () => {
        if(document.querySelectorAll('.main').length) 
            document.querySelectorAll('.main').forEach(elem => elem.remove());
        
        let mainElem = document.createElement('main');
        mainElem.classList.add('main');
        
        this.router(mainElem);
        
        return mainElem;
    }
}

export default Main;