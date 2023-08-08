class Product {
    
    constructor(obj) {
        this.id = obj.id;
        this.title = obj.title;
        this.price = obj.price;
        this.description = obj.description;
        this.category = obj.category.replace(' ', '_').replace("'", '-');
        this.image = obj.image;
        this.rating = obj.rating;
    }

}

export default Product;