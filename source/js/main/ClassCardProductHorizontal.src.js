class CardProductHorizontal extends CardProductVertical {
    constructor(data){
        super(data);
        this.oldPrice = "3000";
        this.savingPrice = "200";
    }

    createCardProduct(containerCards){
        const template = document.querySelector("#template-card-horizontal"),
        card = template.content.querySelector(".product-card-horizontal");
        
        const _this = this;
        const cloneCard = card.cloneNode(true);
        const formElem = cloneCard.querySelector(".product-card-horizontal__form"),
            submitFormElem = cloneCard.querySelector(".product-card-horizontal__add-to-basket"),
            quantityIconYes = cloneCard.querySelector(".product-card-horizontal__quantity-icon-in-stock"),
            quantityIconNo = cloneCard.querySelector(".product-card-horizontal__quantity-icon-none"),
            quantity = cloneCard.querySelector(".product-card-horizontal__quantity-count"),
            stars = cloneCard.querySelector(".product-card-horizontal__rating-star"),
            inputStar = Array.prototype.slice.call(stars.querySelectorAll(".rating-star-input")),
            labelStar = stars.querySelectorAll(".rating-star-label"),
            img = cloneCard.querySelector(".product-card-horizontal__img"),
            title = cloneCard.querySelector(".product-card-horizontal__title"),
            articul = cloneCard.querySelector(".product-card-horizontal__articul-text"),
            price = cloneCard.querySelector(".product-card-horizontal__price"),
            pricesBlock = cloneCard.querySelector(".product-card-horizontal__prices-block");
    
        this.addEventToCardButtons(submitFormElem,this.id);

        img.setAttribute("src", this.imgSrc[0].src);
        title.textContent = this.title;
        articul.textContent = this.productCode;
        price.textContent = this.price;
    
        inputStar.forEach(function(star,numStar) {
            star.id = "star-rating-horizontal_ID" + numStar + _this.id;
            star.name = "star-rating-horizontal_ID" + _this.id;
            labelStar[numStar].setAttribute("for","star-rating-horizontal_ID" + numStar + _this.id);
    
            if(_this.rating == star.value) {
                star.checked = true;
            }
        }); 
        
        if(this.oldPrice){
            const oldPrice = this.createElement("span","product-card-horizontal__old-price");
            oldPrice.textContent = this.oldPrice;
            pricesBlock.append(oldPrice);
        }

        if(this.savingPrice){
            const savingPrice = this.createSavingPrice(this.savingPrice);
            pricesBlock.append(savingPrice);
        }

        if(this.quantity <= 0) {
            quantity.textContent = 0;
            quantityIconYes.style.display = "none";
        }
        else {
            quantity.textContent = this.quantity;
            quantityIconNo.style.display = "none";
        }
    
        if(this.colors) {
            const colorOffers = formElem.appendChild(this.createOffersBlock()),
            colorOffersTitle = colorOffers.querySelector(".product-card-horizontal__offers-title"),
            colorOffersWrap = colorOffers.querySelector(".product-card-horizontal__offers-wrap");
    
            colorOffersTitle.textContent = "Цвет";
                    
            this.colors.forEach(function(color,num){    
                const colorInput = colorOffersWrap.appendChild(_this.createElement("input","product-card-horizontal__offers-item-input")),
                colorLabel = colorOffersWrap.appendChild(_this.createElement("label","product-card-horizontal__offers-item-label")),
                colorImg = colorLabel.appendChild(_this.createElement("img","product-card-horizontal__offers-item-img"));

                colorInput.type = "radio";
                colorInput.id = "color_offer-horizontal_" + _this.id + num;
                colorInput.name = "product-card-horizontal__offers-color";
                colorInput.value = color.nameColor;
                colorLabel.setAttribute("for", colorInput.id);
                colorLabel.dataset.nameColor = color.nameColor;
                colorImg.setAttribute("src", color.imgColor);
                
                _this.addEventToColor(colorLabel,_this.imgSrc,img);

                if(num==0){
                    colorInput.checked = true;
                }
            }); 
        }
    
        if(this.size) {
            const sizeOffers = formElem.appendChild(this.createOffersBlock()),
            sizeOffersTitle = sizeOffers.querySelector(".product-card-horizontal__offers-title"),
            sizeOffersWrap = sizeOffers.querySelector(".product-card-horizontal__offers-wrap");
    
            sizeOffersTitle.textContent = "Размер";
                    
            this.size.forEach(function(size,num){
                const sizeInput = sizeOffersWrap.appendChild(_this.createElement("input","product-card-horizontal__offers-item-input")),
                sizeLabel = sizeOffersWrap.appendChild(_this.createElement("label","product-card-horizontal__offers-item-label")),
                sizeSpan = sizeLabel.appendChild(_this.createElement("span","product-card-horizontal__offers-item-label-text"));

                sizeInput.type = "radio";       
                sizeInput.id = "size_offer-horizontal_" + _this.id + num;
                sizeInput.name = "product-card-horizontal__offers-size";
                sizeInput.value = size;
                sizeLabel.setAttribute("for", sizeInput.id);
                sizeSpan.textContent = size;
    
                if(num==0){
                    sizeInput.checked = true;
                }
            }); 
        }
        containerCards.appendChild(cloneCard);
    }

    createOffersBlock() {
        const offersBlock = document.createElement("div"),
        offersBlockTitle = document.createElement("span"),
        offersBlockWrap = document.createElement("div");
    
        offersBlock.classList.add("product-card-horizontal__offers-block");
        offersBlockTitle.classList.add("product-card-horizontal__offers-title");
        offersBlockWrap.classList.add("product-card-horizontal__offers-wrap");
    
        offersBlock.append(offersBlockTitle);
        offersBlock.append(offersBlockWrap);
    
        return offersBlock;
    }

    createSavingPrice(savingPrice) {
        const wrap = this.createElement("div","product-card-horizontal__save-price-wrap"),
            title = this.createElement("span","product-card-horizontal__save-price-title"),
            price = this.createElement("span","product-card-horizontal__save-price");

        title.textContent = "Экономия";
        wrap.append(title);
        price.textContent = savingPrice;
        wrap.append(price);

        return wrap;
    }
}