"use strict";

function showPreloader() {
  var preloader = document.createElement("div");
  var preloaderIcon = "<div id=\"cube-loader\">" + "<div class=\"caption\">" + "<div class=\"cube-loader\">" + "<div class=\"cube loader-1\"></div>" + "<div class=\"cube loader-2\"></div>" + "<div class=\"cube loader-4\"></div>" + "<div class=\"cube loader-3\"></div>" + "</div>" + "</div>" + "</div>";
  preloader.classList.add("preloader");
  preloader.innerHTML = preloaderIcon;
  document.body.append(preloader);
}

function removePreloader() {
  var preloader = document.querySelector(".preloader");
  preloader.remove();
}

function addErrorText(container, typeError) {
  var errorText = document.createElement("p");

  if (typeError == "timeout") {
    errorText.textContent = "Превышено время ожидания ответа от сервера.";
  }

  if (typeError == "error") {
    errorText.textContent = "Что-то пошло не так.";
  }

  errorText.style.color = "red";
  container.append(errorText);
}