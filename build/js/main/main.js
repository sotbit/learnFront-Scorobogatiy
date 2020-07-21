"use strict";

svg4everybody();
var xhr = new XMLHttpRequest();
xhr.open("POST", "http://alex-checktask.devsotbit.ru/teaching/products.php");
xhr.timeout = 2000;

xhr.onload = function () {
  if (xhr.status != 200) {
    var containerCards = document.querySelector(".products-block__tabs-content");
    addErrorText(containerCards, "error");
  } else {
    var arrCards = JSON.parse(xhr.response);
    var template = document.querySelector("#template-card"),
        img = template.content.querySelector(".product-card__img"),
        title = template.content.querySelector(".product-card__title"),
        articul = template.content.querySelector(".product-card__articul-text"),
        price = template.content.querySelector(".product-card__price"),
        card = template.content.querySelector(".product-card");

    var _containerCards = document.querySelector(".products-block__tabs-content"),
        offersBlock = document.createElement("div"),
        offersBlockTitle = document.createElement("span"),
        offersBlockWrap = document.createElement("div"),
        offerInput = document.createElement("input"),
        offerLabel = document.createElement("label"),
        offerImg = document.createElement("img"),
        offerSpan = document.createElement("span");

    offersBlock.classList.add("product-card__offers-block");
    offersBlockTitle.classList.add("product-card__offers-title");
    offersBlockWrap.classList.add("product-card__offers-wrap");
    offersBlock.append(offersBlockTitle);
    offersBlock.append(offersBlockWrap);
    offerInput.classList.add("product-card__offers-item-input");
    offerInput.type = "radio";
    offerLabel.classList.add("product-card__offers-item-label");
    offerImg.classList.add("product-card__offers-item-img");
    offerSpan.classList.add("product-card__offers-item-label-text");
    arrCards.forEach(function (elem) {
      img.setAttribute("src", elem.imgSrc);
      title.textContent = elem.title;
      articul.textContent = elem.productCode;
      price.textContent = elem.price;
      var cloneCard = document.importNode(card, true);

      _containerCards.appendChild(cloneCard);

      var formElem = cloneCard.querySelector(".product-card__form"),
          submitFormElem = cloneCard.querySelector(".product-card__add-to-basket"),
          quantityIconYes = cloneCard.querySelector(".product-card__quantity-icon-in-stock"),
          quantityIconNo = cloneCard.querySelector(".product-card__quantity-icon-none"),
          quantity = cloneCard.querySelector(".product-card__quantity-count"),
          stars = cloneCard.querySelector(".product-card__rating-star"),
          inputStar = Array.prototype.slice.call(stars.querySelectorAll(".rating-star-input")),
          labelStar = stars.querySelectorAll(".rating-star-label");
      inputStar.forEach(function (star, numStar) {
        star.id = "star-rating_ID" + numStar + elem.id;
        star.name = "star-rating_ID" + elem.id;
        labelStar[numStar].setAttribute("for", "star-rating_ID" + numStar + elem.id);

        if (elem.rating == star.value) {
          star.checked = true;
        }
      });

      if (elem.quantity <= 0) {
        quantity.textContent = 0;
        quantityIconYes.style.display = "none";
      } else {
        quantity.textContent = elem.quantity;
        quantityIconNo.style.display = "none";
      }

      if (elem.colors) {
        var colorOffers = formElem.insertBefore(offersBlock.cloneNode(true), submitFormElem),
            colorOffersTitle = colorOffers.querySelector(".product-card__offers-title"),
            colorOffersWrap = colorOffers.querySelector(".product-card__offers-wrap");
        colorOffersTitle.textContent = "Цвет";
        elem.colors.forEach(function (color, num) {
          var colorInput = colorOffersWrap.appendChild(offerInput.cloneNode()),
              colorLabel = colorOffersWrap.appendChild(offerLabel.cloneNode()),
              colorImg = colorLabel.appendChild(offerImg.cloneNode());
          colorInput.id = "color_offer_" + elem.id + num;
          colorInput.name = "product-card__offers-color";
          colorInput.value = color.nameColor;
          colorLabel.setAttribute("for", colorInput.id);
          colorImg.setAttribute("src", color.imgColor);

          if (num == 0) {
            colorInput.checked = true;
          }
        });
      }

      if (elem.size) {
        var sizeOffers = formElem.insertBefore(offersBlock.cloneNode(true), submitFormElem),
            sizeOffersTitle = sizeOffers.querySelector(".product-card__offers-title"),
            sizeOffersWrap = sizeOffers.querySelector(".product-card__offers-wrap");
        sizeOffersTitle.textContent = "Размер";
        elem.size.forEach(function (size, num) {
          var sizeInput = sizeOffersWrap.appendChild(offerInput.cloneNode()),
              sizeLabel = sizeOffersWrap.appendChild(offerLabel.cloneNode()),
              sizeSpan = sizeLabel.appendChild(offerSpan.cloneNode());
          sizeInput.id = "size_offer_" + elem.id + num;
          sizeInput.name = "product-card__offers-size";
          sizeInput.value = size;
          sizeLabel.setAttribute("for", sizeInput.id);
          sizeSpan.textContent = size;

          if (num == 0) {
            sizeInput.checked = true;
          }
        });
      }
    });
    removePreloader();
  }
};

xhr.ontimeout = function () {
  var containerCards = document.querySelector(".products-block__tabs-content");
  addErrorText(containerCards, "timeout");
  removePreloader();
};

xhr.send();
showPreloader();