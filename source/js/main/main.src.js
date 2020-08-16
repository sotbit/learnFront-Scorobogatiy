svg4everybody();
class CardProduct {
    constructor(data) {
        this.id = data.id;
        this.imgSrc = data.imgSrc;
        this.price = data.price;
        this.productCode = data.productCode;
        this.quantity = data.quantity;
        this.rating = data.rating;
        this.title = data.title;
        this.colors = data.colors;
        this.size = data.size;
    }
    
    createCardProduct(templateCard) {
        const _this = this;
        const cloneCard = templateCard.cloneNode(true);
        const formElem = cloneCard.querySelector(".product-card__form"),
            submitFormElem = cloneCard.querySelector(".product-card__add-to-basket"),
            quantityIconYes = cloneCard.querySelector(".product-card__quantity-icon-in-stock"),
            quantityIconNo = cloneCard.querySelector(".product-card__quantity-icon-none"),
            quantity = cloneCard.querySelector(".product-card__quantity-count"),
            stars = cloneCard.querySelector(".product-card__rating-star"),
            inputStar = Array.prototype.slice.call(stars.querySelectorAll(".rating-star-input")),
            labelStar = stars.querySelectorAll(".rating-star-label"),
            img = cloneCard.querySelector(".product-card__img"),
            title = cloneCard.querySelector(".product-card__title"),
            articul = cloneCard.querySelector(".product-card__articul-text"),
            price = cloneCard.querySelector(".product-card__price"),
            btnSubmit = cloneCard.querySelector(".product-card__add-to-basket");
    
        addEventToCardButtons(btnSubmit,this.id);

        img.setAttribute("src", this.imgSrc[0].src);
        title.textContent = this.title;
        articul.textContent = this.productCode;
        price.textContent = this.price;
    
        inputStar.forEach(function(star,numStar) {
            star.id = "star-rating_ID" + numStar + _this.id;
            star.name = "star-rating_ID" + _this.id;
            labelStar[numStar].setAttribute("for","star-rating_ID" + numStar + _this.id);
    
            if(_this.rating == star.value) {
                star.checked = true;
            }
        }); 
    
        if(this.quantity <= 0) {
            quantity.textContent = 0;
            quantityIconYes.style.display = "none";
        }
        else {
            quantity.textContent = this.quantity;
            quantityIconNo.style.display = "none";
        }
    
        if(this.colors) {
            const colorOffers = formElem.insertBefore(createOffersBlock(),submitFormElem),
            colorOffersTitle = colorOffers.querySelector(".product-card__offers-title"),
            colorOffersWrap = colorOffers.querySelector(".product-card__offers-wrap");
    
            colorOffersTitle.textContent = "Цвет";
                    
            this.colors.forEach(function(color,num){    
                const colorInput = colorOffersWrap.appendChild(createElement("input","product-card__offers-item-input")),
                colorLabel = colorOffersWrap.appendChild(createElement("label","product-card__offers-item-label")),
                colorImg = colorLabel.appendChild(createElement("img","product-card__offers-item-img"));

                colorInput.type = "radio";
                colorInput.id = "color_offer_" + _this.id + num;
                colorInput.name = "product-card__offers-color";
                colorInput.value = color.nameColor;
                colorLabel.setAttribute("for", colorInput.id);
                colorLabel.dataset.nameColor = color.nameColor;
                colorImg.setAttribute("src", color.imgColor);
                
                addEventToColor(colorLabel,_this.imgSrc,img);

                if(num==0){
                    colorInput.checked = true;
                }
            }); 
        }
    
        if(this.size) {
            const sizeOffers = formElem.insertBefore(createOffersBlock(),submitFormElem),
            sizeOffersTitle = sizeOffers.querySelector(".product-card__offers-title"),
            sizeOffersWrap = sizeOffers.querySelector(".product-card__offers-wrap");
    
            sizeOffersTitle.textContent = "Размер";
                    
            this.size.forEach(function(size,num){
                const sizeInput = sizeOffersWrap.appendChild(createElement("input","product-card__offers-item-input")),
                sizeLabel = sizeOffersWrap.appendChild(createElement("label","product-card__offers-item-label")),
                sizeSpan = sizeLabel.appendChild(createElement("span","product-card__offers-item-label-text"));

                sizeInput.type = "radio";       
                sizeInput.id = "size_offer_" + _this.id + num;
                sizeInput.name = "product-card__offers-size";
                sizeInput.value = size;
                sizeLabel.setAttribute("for", sizeInput.id);
                sizeSpan.textContent = size;
    
                if(num==0){
                    sizeInput.checked = true;
                }
            }); 
        }
        return cloneCard;
    }
}

const xhr = new XMLHttpRequest();
const containerCards = document.querySelector(".products-block__tabs-content");

xhr.open("POST", "http://alex-checktask.devsotbit.ru/teaching/products.php");
xhr.timeout = 2000;
xhr.onload = function() {  
    if (xhr.status != 200) { 
        addErrorText(containerCards,"error");
    } 
    else { 
        const arrCards =  JSON.parse(xhr.response);
        insertCardsProduct(arrCards);
        removePreloader();
    }
};

xhr.ontimeout = function () {
    addErrorText(containerCards,"timeout");
    removePreloader();
};

xhr.send();
showPreloader();

function insertCardsProduct(arrCards) {
    const template = document.querySelector("#template-card"),
    card = template.content.querySelector(".product-card"),
    containerCards = document.querySelector(".products-block__tabs-content");

    arrCards.forEach(function(elem) {
        const newCard = new CardProduct(elem);
      
        containerCards.appendChild(newCard.createCardProduct(card));
    });
}

function createOffersBlock() {
    const offersBlock = document.createElement("div"),
    offersBlockTitle = document.createElement("span"),
    offersBlockWrap = document.createElement("div");

    offersBlock.classList.add("product-card__offers-block");
    offersBlockTitle.classList.add("product-card__offers-title");
    offersBlockWrap.classList.add("product-card__offers-wrap");

    offersBlock.append(offersBlockTitle);
    offersBlock.append(offersBlockWrap);

    return offersBlock;
}

function createElement(element,classElem) {
    const elem = document.createElement(element);
    elem.classList.add(classElem);
    return elem;
}

function addEventToCardButtons(btn,idCard) {
   btn.addEventListener("click", function(e){
       e.preventDefault();
       sendProduct(idCard,getCheckedColor(btn).value,getCheckedSize(btn).value);
   });
}

function getCheckedColor(btn) {
    return btn.closest(".product-card").querySelector("input[name='product-card__offers-color']:checked");
}

function getCheckedSize(btn) {
    return btn.closest(".product-card").querySelector("input[name='product-card__offers-size']:checked");
}

function sendProduct(id,color,size) {
    const xhr = new XMLHttpRequest();
    const body = JSON.stringify({
        id:id,
        color:color,
        size:size
    });
    xhr.open("POST", "http://alex-checktask.devsotbit.ru/teaching/buy.php");
    xhr.send(body);
}

function addEventToColor (label,arrColor,img) {
    label.addEventListener("click", function(){
        arrColor.forEach(function(el){
            if(label.dataset.nameColor == el.name){
                img.setAttribute("src",el.src);
            }
        }); 
    });
}





