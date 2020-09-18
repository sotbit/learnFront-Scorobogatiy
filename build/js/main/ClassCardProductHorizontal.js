"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var CardProductHorizontal = /*#__PURE__*/function (_CardProductVertical) {
  _inherits(CardProductHorizontal, _CardProductVertical);

  var _super = _createSuper(CardProductHorizontal);

  function CardProductHorizontal(data) {
    var _this2;

    _classCallCheck(this, CardProductHorizontal);

    _this2 = _super.call(this, data);
    _this2.oldPrice = "3000";
    _this2.savingPrice = "200";
    return _this2;
  }

  _createClass(CardProductHorizontal, [{
    key: "createCardProduct",
    value: function createCardProduct(containerCards) {
      var template = document.querySelector("#template-card-horizontal"),
          card = template.content.querySelector(".product-card-horizontal");

      var _this = this;

      var cloneCard = card.cloneNode(true);
      var formElem = cloneCard.querySelector(".product-card-horizontal__form"),
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
      this.addEventToCardButtons(submitFormElem, this.id);
      img.setAttribute("src", this.imgSrc[0].src);
      title.textContent = this.title;
      articul.textContent = this.productCode;
      price.textContent = this.price;
      inputStar.forEach(function (star, numStar) {
        star.id = "star-rating-horizontal_ID" + numStar + _this.id;
        star.name = "star-rating-horizontal_ID" + _this.id;
        labelStar[numStar].setAttribute("for", "star-rating-horizontal_ID" + numStar + _this.id);

        if (_this.rating == star.value) {
          star.checked = true;
        }
      });

      if (this.oldPrice) {
        var oldPrice = this.createElement("span", "product-card-horizontal__old-price");
        oldPrice.textContent = this.oldPrice;
        pricesBlock.append(oldPrice);
      }

      if (this.savingPrice) {
        var savingPrice = this.createSavingPrice(this.savingPrice);
        pricesBlock.append(savingPrice);
      }

      if (this.quantity <= 0) {
        quantity.textContent = 0;
        quantityIconYes.style.display = "none";
      } else {
        quantity.textContent = this.quantity;
        quantityIconNo.style.display = "none";
      }

      if (this.colors) {
        var colorOffers = formElem.appendChild(this.createOffersBlock()),
            colorOffersTitle = colorOffers.querySelector(".product-card-horizontal__offers-title"),
            colorOffersWrap = colorOffers.querySelector(".product-card-horizontal__offers-wrap");
        colorOffersTitle.textContent = "Цвет";
        this.colors.forEach(function (color, num) {
          var colorInput = colorOffersWrap.appendChild(_this.createElement("input", "product-card-horizontal__offers-item-input")),
              colorLabel = colorOffersWrap.appendChild(_this.createElement("label", "product-card-horizontal__offers-item-label")),
              colorImg = colorLabel.appendChild(_this.createElement("img", "product-card-horizontal__offers-item-img"));
          colorInput.type = "radio";
          colorInput.id = "color_offer-horizontal_" + _this.id + num;
          colorInput.name = "product-card-horizontal__offers-color";
          colorInput.value = color.nameColor;
          colorLabel.setAttribute("for", colorInput.id);
          colorLabel.dataset.nameColor = color.nameColor;
          colorImg.setAttribute("src", color.imgColor);

          _this.addEventToColor(colorLabel, _this.imgSrc, img);

          if (num == 0) {
            colorInput.checked = true;
          }
        });
      }

      if (this.size) {
        var sizeOffers = formElem.appendChild(this.createOffersBlock()),
            sizeOffersTitle = sizeOffers.querySelector(".product-card-horizontal__offers-title"),
            sizeOffersWrap = sizeOffers.querySelector(".product-card-horizontal__offers-wrap");
        sizeOffersTitle.textContent = "Размер";
        this.size.forEach(function (size, num) {
          var sizeInput = sizeOffersWrap.appendChild(_this.createElement("input", "product-card-horizontal__offers-item-input")),
              sizeLabel = sizeOffersWrap.appendChild(_this.createElement("label", "product-card-horizontal__offers-item-label")),
              sizeSpan = sizeLabel.appendChild(_this.createElement("span", "product-card-horizontal__offers-item-label-text"));
          sizeInput.type = "radio";
          sizeInput.id = "size_offer-horizontal_" + _this.id + num;
          sizeInput.name = "product-card-horizontal__offers-size";
          sizeInput.value = size;
          sizeLabel.setAttribute("for", sizeInput.id);
          sizeSpan.textContent = size;

          if (num == 0) {
            sizeInput.checked = true;
          }
        });
      }

      containerCards.appendChild(cloneCard);
    }
  }, {
    key: "createOffersBlock",
    value: function createOffersBlock() {
      var offersBlock = document.createElement("div"),
          offersBlockTitle = document.createElement("span"),
          offersBlockWrap = document.createElement("div");
      offersBlock.classList.add("product-card-horizontal__offers-block");
      offersBlockTitle.classList.add("product-card-horizontal__offers-title");
      offersBlockWrap.classList.add("product-card-horizontal__offers-wrap");
      offersBlock.append(offersBlockTitle);
      offersBlock.append(offersBlockWrap);
      return offersBlock;
    }
  }, {
    key: "createSavingPrice",
    value: function createSavingPrice(savingPrice) {
      var wrap = this.createElement("div", "product-card-horizontal__save-price-wrap"),
          title = this.createElement("span", "product-card-horizontal__save-price-title"),
          price = this.createElement("span", "product-card-horizontal__save-price");
      title.textContent = "Экономия";
      wrap.append(title);
      price.textContent = savingPrice;
      wrap.append(price);
      return wrap;
    }
  }]);

  return CardProductHorizontal;
}(CardProductVertical);