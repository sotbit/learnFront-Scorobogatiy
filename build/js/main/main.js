"use strict";

svg4everybody();
var xhr = new XMLHttpRequest();
var containerCards = document.querySelector(".products-block__tabs-content");
xhr.open("POST", "http://alex-checktask.devsotbit.ru/teaching/products.php");
xhr.timeout = 2000;

xhr.onload = function () {
  if (xhr.status != 200) {
    addErrorText(containerCards, "error");
  } else {
    var arrCards = JSON.parse(xhr.response);
    insertCardsProduct(arrCards);
    removePreloader();
  }
};

xhr.ontimeout = function () {
  addErrorText(containerCards, "timeout");
  removePreloader();
};

xhr.send();
showPreloader();

function insertCardsProduct(arrCards) {
  var template = document.querySelector("#template-card"),
      card = template.content.querySelector(".product-card"),
      containerCards = document.querySelector(".products-block__tabs-content");
  arrCards.forEach(function (elem) {
    var newCard = createCardProduct(card, elem);
    containerCards.appendChild(newCard);
  });
}

function createCardProduct(templateCard, cardData) {
  var cloneCard = templateCard.cloneNode(true),
      formElem = cloneCard.querySelector(".product-card__form"),
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
      price = cloneCard.querySelector(".product-card__price");
  var offersBlock = document.createElement("div"),
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
  img.setAttribute("src", cardData.imgSrc);
  title.textContent = cardData.title;
  articul.textContent = cardData.productCode;
  price.textContent = cardData.price;
  inputStar.forEach(function (star, numStar) {
    star.id = "star-rating_ID" + numStar + cardData.id;
    star.name = "star-rating_ID" + cardData.id;
    labelStar[numStar].setAttribute("for", "star-rating_ID" + numStar + cardData.id);

    if (cardData.rating == star.value) {
      star.checked = true;
    }
  });

  if (cardData.quantity <= 0) {
    quantity.textContent = 0;
    quantityIconYes.style.display = "none";
  } else {
    quantity.textContent = cardData.quantity;
    quantityIconNo.style.display = "none";
  }

  if (cardData.colors) {
    var colorOffers = formElem.insertBefore(offersBlock.cloneNode(true), submitFormElem),
        colorOffersTitle = colorOffers.querySelector(".product-card__offers-title"),
        colorOffersWrap = colorOffers.querySelector(".product-card__offers-wrap");
    colorOffersTitle.textContent = "Цвет";
    cardData.colors.forEach(function (color, num) {
      var colorInput = colorOffersWrap.appendChild(offerInput.cloneNode()),
          colorLabel = colorOffersWrap.appendChild(offerLabel.cloneNode()),
          colorImg = colorLabel.appendChild(offerImg.cloneNode());
      colorInput.id = "color_offer_" + cardData.id + num;
      colorInput.name = "product-card__offers-color";
      colorInput.value = color.nameColor;
      colorLabel.setAttribute("for", colorInput.id);
      colorImg.setAttribute("src", color.imgColor);

      if (num == 0) {
        colorInput.checked = true;
      }
    });
  }

  if (cardData.size) {
    var sizeOffers = formElem.insertBefore(offersBlock.cloneNode(true), submitFormElem),
        sizeOffersTitle = sizeOffers.querySelector(".product-card__offers-title"),
        sizeOffersWrap = sizeOffers.querySelector(".product-card__offers-wrap");
    sizeOffersTitle.textContent = "Размер";
    cardData.size.forEach(function (size, num) {
      var sizeInput = sizeOffersWrap.appendChild(offerInput.cloneNode()),
          sizeLabel = sizeOffersWrap.appendChild(offerLabel.cloneNode()),
          sizeSpan = sizeLabel.appendChild(offerSpan.cloneNode());
      sizeInput.id = "size_offer_" + cardData.id + num;
      sizeInput.name = "product-card__offers-size";
      sizeInput.value = size;
      sizeLabel.setAttribute("for", sizeInput.id);
      sizeSpan.textContent = size;

      if (num == 0) {
        sizeInput.checked = true;
      }
    });
  }

  return cloneCard;
}