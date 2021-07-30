const headerLinks = document.querySelectorAll('.nav_link');
const headerMenu = document.querySelector('.header_menu');
const header = document.querySelector('.header');
const body = document.querySelector('body');
const catalogWrapper = document.querySelector('.catalog_wrapper');
const pagination = document.querySelector('.pagination');
const paginationButtonLeft = document.querySelector('.pagination_button_left');
const paginationButtonRight = document.querySelector('.pagination_button_right');
const searchButton = document.querySelector('.catalog_search_icon');
const searchInput = document.querySelector('.catalog_search_input');
const reviewsButtonLeft = document.querySelector('.reviews_arrow-left');
const reviewsButtonRight = document.querySelector('.reviews_arrow-right');
const reviewsWrapper = document.querySelector('.reviews_list_wrapper');
let amountOfItemsInCatalog = 6;
let paginationButtonPages = document.querySelectorAll('.pagination_button_page');
let indexCurrentPage = 1;
let reviewsIndex = 1;
let amountReviewsItem = 3;

window.addEventListener('resize', onResize);
onResize();


headerMenu.onclick = function () {
  header.classList.toggle('active');
  body.classList.toggle('active');
}

headerLinks.forEach(function(headerLink){
  headerLink.onclick = function() {
    header.classList.remove('active');
    body.classList.remove('active');
  }
});


// headerMenu.addEventListener('click', function() {
//   header.classList.toggle('active');
//   body.classList.toggle('active');
// })

searchButton.onclick = function () {
  let searchText = searchInput.value;
  let filteredCatalogData = catalogData.filter(function(element) {
    if (element.name.indexOf(searchText) > -1) {
      return true;
    } else {
      return false;
    }
  });
  showCatalogItems(filteredCatalogData.slice(0, amountOfItemsInCatalog));
  insertPaginationPages(filteredCatalogData.length || 1);
  if (filteredCatalogData.length == 0) {
    catalogWrapper.innerHTML = 'По Вашему запросу ничего не найдено :(';
  }
}

paginationButtonLeft.onclick = function () {
  if (indexCurrentPage > 1) {
    clickCurrentPage(indexCurrentPage - 1);
    activeCurrentPage(indexCurrentPage);
  } 
}

paginationButtonRight.onclick = function () {
  if (indexCurrentPage < paginationButtonPages.length) {
    clickCurrentPage(indexCurrentPage + 1);
    activeCurrentPage(indexCurrentPage);
  }
}

reviewsButtonLeft.onclick = function () {
  if (reviewsIndex > 1) {
    reviewsIndex -= 1;
    reviewsWrapper.style.transform = `translateX(-${(reviewsIndex - 1) * 20.38}%)`;
  }
}

reviewsButtonRight.onclick = function () {
  if (reviewsIndex + amountReviewsItem < 6) {
    reviewsIndex += 1;
    reviewsWrapper.style.transform = `translateX(-${(reviewsIndex - 1) * 20.38}%)`;
  }
}

showCatalogItems(catalogData.slice(0, amountOfItemsInCatalog));
insertPaginationPages(catalogData.length);

function insertCatalogItem(element) {
  let catalogItem = document.createElement('div');
  catalogItem.className = 'catalog_item';

  let itemTitleMb = document.createElement('h3');
  itemTitleMb.className = 'catalog_item_title title-mb';
  itemTitleMb.innerHTML = element.name;

  catalogItem.appendChild(itemTitleMb);

  let itemImage = document.createElement('img');
  itemImage.className = 'catalog_item_img';
  itemImage.src = element.image;
  itemImage.alt = element.name;

  catalogItem.appendChild(itemImage);

  let itemDescription = document.createElement('div');
  itemDescription.className = 'catalog_item_description';

  let itemTitle = document.createElement('h3');
  itemTitle.className = 'catalog_item_title title-pc';
  itemTitle.innerHTML = element.name;

  itemDescription.appendChild(itemTitle);

  let itemText = document.createElement('p');
  itemText.className = 'catalog_item_text';
  itemText.innerHTML =  element.description;

  itemDescription.appendChild(itemText);

  let itemBuy = document.createElement('div');
  itemBuy.className = 'catalog_item_buy';

  let itemPrice = document.createElement('span');
  itemPrice.className = 'catalog_item_price';
  itemPrice.innerHTML = '$' + element.price;

  itemBuy.appendChild(itemPrice);

  let itemButton = document.createElement('button');
  itemButton.className = 'catalog_item_button';

  let itemCart = document.createElement('img');
  itemCart.className = 'catalog_item_cart';
  itemCart.src = 'img/shopping-cart.svg';
  itemCart.alt = 'shopping';

  itemButton.appendChild(itemCart);

  itemBuy.appendChild(itemButton);

  itemDescription.appendChild(itemBuy);

  catalogItem.appendChild(itemDescription);

  catalogWrapper.appendChild(catalogItem);
}

function showCatalogItems(array) {
  catalogWrapper.innerHTML = '';
  array.forEach(insertCatalogItem);
}

function insertPaginationPages(length) {
  paginationButtonPages = document.querySelectorAll('.pagination_button_page');
  paginationButtonPages.forEach(function(paginationButtonPage) {
    paginationButtonPage.remove();
  })

  for (let i = 0; i * amountOfItemsInCatalog < length; i++) {
    let paginationButton = document.createElement('button');
    paginationButton.className = 'pagination_button pagination_button_page';
    paginationButton.innerHTML = i + 1;

    pagination.appendChild(paginationButton);
  }

  pagination.appendChild(paginationButtonRight);

  paginationButtonPages = document.querySelectorAll('.pagination_button_page');

  paginationButtonPages[0].disabled = true;
  paginationButtonPages[0].classList.add('active');

  paginationButtonPages.forEach(function(paginationButtonPage) {
    paginationButtonPage.onclick = function() {
      clickCurrentPage(parseInt(paginationButtonPage.innerHTML));
      activeCurrentPage(indexCurrentPage);
    }
  })
}

function clickCurrentPage(index) {
  indexCurrentPage = index;
  showCatalogItems(catalogData.slice(amountOfItemsInCatalog * (index - 1), amountOfItemsInCatalog * index));
}

function activeCurrentPage(index) {
  paginationButtonPages.forEach(function(button) {
    button.classList.remove('active');
    button.disabled = false;
  });
  paginationButtonPages[index - 1].classList.add('active');
  paginationButtonPages[index - 1].disabled = true;
}

function onResize() {
  if (window.innerWidth < 550) {
    amountOfItemsInCatalog = 4;
    amountReviewsItem = 1;
  } else if (window.innerWidth < 900) {
    amountOfItemsInCatalog = 4;
    amountReviewsItem = 2;
  } else {
    amountOfItemsInCatalog = 6;
    amountReviewsItem = 3;
  }
  showCatalogItems(catalogData.slice(0, amountOfItemsInCatalog));
  insertPaginationPages(catalogData.length);
}