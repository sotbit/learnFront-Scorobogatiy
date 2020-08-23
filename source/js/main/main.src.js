svg4everybody();

const containerCards = document.querySelector(".products-block__view");
ajaxGetCards(containerCards,"tails");
addEventToViewBtn();

function insertCardsProduct(arrCards,containerCards,view) {
    arrCards.forEach(function(elem) {
        if(view=="tails"){
            const newCard = new CardProductVertical(elem);
            newCard.createCardProduct(containerCards);
        }
        else if(view=="list"){
            const newCard = new CardProductHorizontal(elem);
            newCard.createCardProduct(containerCards);
        }
      
    });
}

function ajaxGetCards(containerCards,view) {
    const xhr = new XMLHttpRequest();
    
    xhr.open("POST", "http://alex-checktask.devsotbit.ru/teaching/products.php");
    xhr.timeout = 2000;
    xhr.onload = function() {  
        if (xhr.status != 200) { 
            addErrorText(containerCards,"error");
        } 
        else { 
            const arrCards =  JSON.parse(xhr.response);
            insertCardsProduct(arrCards,containerCards,view);
            removePreloader();
        }
    };
    
    xhr.ontimeout = function () {
        addErrorText(containerCards,"timeout");
        removePreloader();
    };
    
    xhr.send();
    showPreloader();
}

function addEventToViewBtn() {
    const btnViewList = document.querySelectorAll(".products-block__view-choose-item");

    for(let view of btnViewList) {
        view.addEventListener("click", function(){
            const viewBlock = checkView(this.dataset.view);

            removeActiveClass("products-block__view");
            removeActiveClass("products-block__view-choose-item");
            this.classList.add("active");

            if(viewBlock) {
                viewBlock.classList.add("active");
            }
            else {
               const newViewBlock = createViewBlock(this.dataset.view);
               ajaxGetCards(newViewBlock,this.dataset.view);
               newViewBlock.classList.add("active");
            }
        });
    }
}

function checkView(dataView) {
    const activeTab = document.querySelector(".products-block__tabs-content.active"),
        view = activeTab.querySelector(".products-block__view[data-view='"+dataView+"']");
    return view;
}

function removeActiveClass (nameClass) {
    const viewBlocks = document.querySelectorAll("." + nameClass);
    for(let view of viewBlocks) {
        view.classList.remove("active");
    }
}

function createViewBlock(dataView) {
    const activeTab = document.querySelector(".products-block__tabs-content.active"),
        viewBlock = document.createElement("div");
    
    viewBlock.classList.add("products-block__view");
    viewBlock.dataset.view = dataView;
    activeTab.append(viewBlock);

    return viewBlock;
}










