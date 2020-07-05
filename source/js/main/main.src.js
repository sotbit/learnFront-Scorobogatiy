
document.addEventListener("DOMContentLoaded", function(){
    svg4everybody();
    
    const arr_cards = [
        {
            img_src:"img/prod_1.jpg",
            name:"Кеды SB DELTA FORCEVULC, Nike",
            quantity:37,
            articul:"00674157",
            price:3700
        },
        {
            img_src:"img/prod_2.jpg",
            name:"Кедsdfsdfsdf sdf",
            quantity:34,
            articul:"00674157",
            price:33700
        }
    ];
    if ('content' in document.createElement('template')) {
        const template = document.querySelector("#template-card"),
        img = template.content.querySelector(".product-card__img"),
        title = template.content.querySelector(".product-card__title"),
        quantity = template.content.querySelector(".product-card__quantity-count"),
        articul = template.content.querySelector(".product-card__articul-text"),
        price = template.content.querySelector(".product-card__price"),
        container_cards = document.querySelector(".products-block__tabs-content");
        let clone;
        arr_cards.forEach(function(elem){
            img.setAttribute("src", elem.img_src);
            title.textContent = elem.name;
            quantity.textContent = elem.quantity;
            articul.textContent = elem.articul;
            price.textContent = elem.price;
            clone = document.importNode(template.content, true);
            container_cards.appendChild(clone);
        });
    }
});