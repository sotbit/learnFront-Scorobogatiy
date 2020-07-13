svg4everybody();

const arr_cards = [
    {   id:"1",
        img_src:"img/prod_1.jpg",
        name:"Кеды SB DELTA FORCEVULC, Nike",
        quantity:37,
        articul:"00674157",
        price:3700,
        arr_color:["img/color.jpg","img/color_1.jpg","img/color_2.jpg"],
        arr_size:[34,37,45]
    },
    {   id:"2",
        img_src:"img/prod_2.jpg",
        name:"Кедsdfsdfsdf sdf",
        quantity:34,
        articul:"00674157",
        price:33700
    },
    {   id:"3",
        img_src:"img/prod_3.jpg",
        name:"Кеды SB DELTA FORCEVULC, Nike",
        quantity:37,
        articul:"00674157",
        price:3700,
        arr_color:["img/color.jpg","img/color_1.jpg","img/color_2.jpg"],
        arr_size:[34,37,45]
    },
    {   id:"4",
        img_src:"img/prod_4.jpg",
        name:"Кедsdfsdfsdf sdf",
        quantity:34,
        articul:"00674157",
        price:33700
    },
];

const template = document.querySelector("#template-card"),
container_cards = document.querySelector(".products-block__tabs-content"),
img = template.content.querySelector(".product-card__img"),
title = template.content.querySelector(".product-card__title"),
quantity = template.content.querySelector(".product-card__quantity-count"),
articul = template.content.querySelector(".product-card__articul-text"),
price = template.content.querySelector(".product-card__price"),
card = template.content.querySelector(".product-card"),
stars = template.content.querySelector(".product-card__rating-star"),
input_star = stars.querySelectorAll(".rating-star-input"),
label_star = stars.querySelectorAll(".rating-star-label"),
offers_block = document.createElement("div"),
offers_block_title = document.createElement("span"),
offers_block_wrap = document.createElement("div"),
offer_input = document.createElement("input"),
offer_label = document.createElement("label"),
offer_img = document.createElement("img"),
offer_span = document.createElement("span");

offers_block.classList.add("product-card__offers-block");
offers_block_title.classList.add("product-card__offers-title");
offers_block_wrap.classList.add("product-card__offers-wrap");

offers_block.append(offers_block_title);
offers_block.append(offers_block_wrap);

offer_input.classList.add("product-card__offers-item-input");
offer_input.type = "radio";

offer_label.classList.add("product-card__offers-item-label");
offer_img.classList.add("product-card__offers-item-img");
offer_span.classList.add("product-card__offers-item-label-text");
        
arr_cards.forEach(function(elem) {
    img.setAttribute("src", elem.img_src);
    title.textContent = elem.name;
    quantity.textContent = elem.quantity;
    articul.textContent = elem.articul;
    price.textContent = elem.price;

    for(let i=0;i<5;i++) {
        input_star[i].id = "star-rating_ID" + i + elem.id;
        input_star[i].name = "star-rating_ID" + elem.id;
        label_star[i].setAttribute("for","star-rating_ID" + i + elem.id);
    }

    const clone_card = document.importNode(card, true);
    container_cards.appendChild(clone_card);
            
    const form_elem = clone_card.querySelector(".product-card__form"),
        submit_form_elem = clone_card.querySelector(".product-card__add-to-basket");

    if(elem.arr_color) {
        const color_offers = form_elem.insertBefore(offers_block.cloneNode(true),submit_form_elem),
        color_offers_title = color_offers.querySelector(".product-card__offers-title"),
        color_offers_wrap = color_offers.querySelector(".product-card__offers-wrap");

        color_offers_title.textContent = "Цвет";
                
        elem.arr_color.forEach(function(color,num){    
            const color_input = color_offers_wrap.appendChild(offer_input.cloneNode()),
            color_label = color_offers_wrap.appendChild(offer_label.cloneNode()),
            color_img = color_label.appendChild(offer_img.cloneNode());
                    
            color_input.id = "color_offer_" + elem.id + num;
            color_input.name = "product-card__offers-color";
            color_label.setAttribute("for", color_input.id);
            color_img.setAttribute("src", color);
    
        }); 
    }

    if(elem.arr_size) {
        const size_offers = form_elem.insertBefore(offers_block.cloneNode(true),submit_form_elem),
        size_offers_title = size_offers.querySelector(".product-card__offers-title"),
        size_offers_wrap = size_offers.querySelector(".product-card__offers-wrap");

        size_offers_title.textContent = "Размер";
                
        elem.arr_size.forEach(function(size,num){
            const size_input = size_offers_wrap.appendChild(offer_input.cloneNode()),
            size_label = size_offers_wrap.appendChild(offer_label.cloneNode()),
            size_span = size_label.appendChild(offer_span.cloneNode());
                             
            size_input.id = "size_offer_" + elem.id + num;
            size_input.name = "product-card__offers-size";
            size_label.setAttribute("for", size_input.id);
            size_span.textContent = size;
        }); 
    }
});
