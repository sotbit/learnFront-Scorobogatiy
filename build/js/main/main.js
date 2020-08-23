"use strict";

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

svg4everybody();
var containerCards = document.querySelector(".products-block__view");
ajaxGetCards(containerCards, "tails");
addEventToViewBtn();

function insertCardsProduct(arrCards, containerCards, view) {
  arrCards.forEach(function (elem) {
    if (view == "tails") {
      var newCard = new CardProductVertical(elem);
      newCard.createCardProduct(containerCards);
    } else if (view == "list") {
      var _newCard = new CardProductHorizontal(elem);

      _newCard.createCardProduct(containerCards);
    }
  });
}

function ajaxGetCards(containerCards, view) {
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "http://alex-checktask.devsotbit.ru/teaching/products.php");
  xhr.timeout = 2000;

  xhr.onload = function () {
    if (xhr.status != 200) {
      addErrorText(containerCards, "error");
    } else {
      var arrCards = JSON.parse(xhr.response);
      insertCardsProduct(arrCards, containerCards, view);
      removePreloader();
    }
  };

  xhr.ontimeout = function () {
    addErrorText(containerCards, "timeout");
    removePreloader();
  };

  xhr.send();
  showPreloader();
}

function addEventToViewBtn() {
  var btnViewList = document.querySelectorAll(".products-block__view-choose-item");

  var _iterator = _createForOfIteratorHelper(btnViewList),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var view = _step.value;
      view.addEventListener("click", function () {
        var viewBlock = checkView(this.dataset.view);
        removeActiveClass("products-block__view");
        removeActiveClass("products-block__view-choose-item");
        this.classList.add("active");

        if (viewBlock) {
          viewBlock.classList.add("active");
        } else {
          var newViewBlock = createViewBlock(this.dataset.view);
          ajaxGetCards(newViewBlock, this.dataset.view);
          newViewBlock.classList.add("active");
        }
      });
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
}

function checkView(dataView) {
  var activeTab = document.querySelector(".products-block__tabs-content.active"),
      view = activeTab.querySelector(".products-block__view[data-view='" + dataView + "']");
  return view;
}

function removeActiveClass(nameClass) {
  var viewBlocks = document.querySelectorAll("." + nameClass);

  var _iterator2 = _createForOfIteratorHelper(viewBlocks),
      _step2;

  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var view = _step2.value;
      view.classList.remove("active");
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }
}

function createViewBlock(dataView) {
  var activeTab = document.querySelector(".products-block__tabs-content.active"),
      viewBlock = document.createElement("div");
  viewBlock.classList.add("products-block__view");
  viewBlock.dataset.view = dataView;
  activeTab.append(viewBlock);
  return viewBlock;
}