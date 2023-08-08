const Nav = function(categories) {

    this.categories = categories.map(elem => elem.replace(' ', '_').replace("'", '-'));

    this.init = () => {
        let navElem = document.createElement('ul');
        navElem.classList.add('nav');
        navElem.addEventListener('mouseover', (event) => {
            //console.log(event);
            Array.from(event.target.closest('ul').children)
            .forEach(elem => {
                if(!elem.classList.contains('active'))
                    elem.classList.add('active')
            })
        });
        navElem.addEventListener('mouseleave', (event) => {
            Array.from(event.target.closest('ul').children)
            .forEach(elem => {
                if(elem.classList.contains('active'))
                    elem.classList.remove('active')
            })
        })

        let navOpen = document.createElement('li');
        navOpen.classList.add('nav_open');
        

        navOpen.innerText = 'Categories';
        navElem.append(navOpen);


        this.categories.forEach(elem => {
            let category = document.createElement('li');
            category.innerHTML = `
                <a href='#${elem}'>${elem.replace('_', ' ').replace('-', "'")}</a>
            `
            navElem.append(category);
        });

        return navElem;
    }
}

export default Nav;