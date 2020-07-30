const app = document.getElementById("app");
let menuActive = true;

const hash = window.location.hash;
let activePage = hash ? hash.replace(/^#/, "") : "home";

const menu = document.getElementById("menu");

let selectedCard = 0;
let selectedRow = 0;
let hPress = 0;
let vPress = 0;
let rows;

const pages = {
  home: "home",
  page1: "page1",
  page2: "page2",
  page3: "page3",
};

function appendPage(page) {
  fetch("./pages/" + page + ".html")
    .then((response) => response.text())
    .then((data) => {
      app.innerHTML = data;
    });
}

function Home() {
  appendPage(pages.home);
}
function Page1() {
  appendPage(pages.page1);
}
function Page2() {
  appendPage(pages.page2);
}
function Page3() {
  appendPage(pages.page3);
}

function BuildMenu() {
  // reset menu content
  menu.innerHTML = "";
  var ul = document.createElement("ul");
  menu.appendChild(ul);
  const pagesKeys = Object.keys(pages);
  const activeIndex = pagesKeys.indexOf(activePage);

  // build looping menu
  items().forEach(renderUnActiveList);
  renderActiveList(activePage);
  items().forEach(renderUnActiveList);

  function renderUnActiveList(page) {
    const li = document.createElement("li");
    const a = document.createElement("a");
    li.setAttribute("class", "item");
    a.setAttribute("href", "#" + pages[page]);
    ul.appendChild(li);
    li.appendChild(a);
    a.innerHTML = page;
  }

  function renderActiveList(page) {
    const li = document.createElement("li");
    const a = document.createElement("a");
    // add active LI item
    li.setAttribute("class", "item active");
    a.setAttribute("href", "#" + pages[page]);
    ul.appendChild(li);
    li.appendChild(a);
    a.innerHTML = page;
    a.click();

    // add empty LI for space
    const spacerLI = document.createElement("li");
    spacerLI.setAttribute("class", "spacer");
    ul.appendChild(spacerLI);
  }

  function items() {
    const newArr = [];
    let loopIndex = activeIndex == pagesKeys.length - 1 ? 0 : activeIndex + 1;
    while (loopIndex !== activeIndex) {
      if (loopIndex == pagesKeys.length) {
        loopIndex = 0;
        if (activeIndex === 0) {
          break;
        }
      }
      newArr.push(pagesKeys[loopIndex]);
      loopIndex++;
    }
    return newArr;
  }
}
function clearActiveCard() {
  rows.forEach((row) => {
    const cards = row.querySelectorAll(".card");
    cards.forEach((card) => card.classList.remove("active"));
  });
}
function cardMove(move) {
  let row;
  let cards;
  switch (move) {
    case "right":
      if (!selectedCard) {
        hPress = 0;
      } else {
        hPress++;
      }
      row = rows[vPress];
      cards = row.querySelectorAll(".card");
      if (hPress == cards.length - 1) {
        selectedCard = cards[cards.length - 1];
        return;
      }
      clearActiveCard();
      selectedCard = cards[hPress];
      selectedCard.classList.add("active");
      break;
    case "left":
      hPress--;
      row = rows[vPress];
      cards = row.querySelectorAll(".card");
      clearActiveCard();
      selectedCard = cards[hPress];
      selectedCard.classList.add("active");
      break;
    case "down":
      if (vPress == rows.length - 1) {
        selectedRow = rows[rows.length - 1];
        return;
      }
      vPress++;
      row = rows[vPress];
      cards = row.querySelectorAll(".card");
      clearActiveCard();
      selectedCard = cards[hPress];
      selectedCard.classList.add("active");
      break;
    case "up":
      if (vPress == 0) {
        selectedRow = 0;
        return;
      }
      vPress--;
      row = rows[vPress];
      cards = row.querySelectorAll(".card");
      clearActiveCard();
      selectedCard = cards[hPress];
      selectedCard.classList.add("active");
      break;
    default:
      break;
  }
}

function showMenu() {
  menuActive = true;
  menu.classList.remove("hidden");
  app.classList.add("menu-active");
}
function hideMenu() {
  menuActive = false;
  menu.classList.add("hidden");
  app.classList.remove("menu-active");
}
function moveLeft() {
  if (!menuActive && !hPress) {
    showMenu();
  } else if (!menuActive) {
    cardMove("left");
  }
}
function moveUp() {
  if (menuActive) {
    const pagesKeys = Object.keys(pages);
    const activeIndex = pagesKeys.indexOf(activePage);
    const previousPage =
      activeIndex == 0
        ? pagesKeys[pagesKeys.length - 1]
        : pagesKeys[activeIndex - 1];
    activePage = previousPage;
    BuildMenu(previousPage);
  } else {
    cardMove("up");
  }
}
function moveRight() {
  if (menuActive) {
    hideMenu();
  } else {
    // move between cards
    cardMove("right");
  }
}
function moveDown() {
  if (menuActive) {
    const pagesKeys = Object.keys(pages);
    const activeIndex = pagesKeys.indexOf(activePage);
    const nextPage =
      activeIndex == pagesKeys.length - 1
        ? pagesKeys[0]
        : pagesKeys[activeIndex + 1];
    activePage = nextPage;
    BuildMenu(nextPage);
  } else {
    cardMove("down");
  }
}

function getKeyAndMove(key) {
  const key_code = key.which || key.keyCode;
  switch (key_code) {
    case 37: //left arrow key
      moveLeft();
      break;
    case 38: //Up arrow key
      key.preventDefault();
      moveUp();
      break;
    case 39: //right arrow key
      moveRight();
      break;
    case 40: //down arrow key
      key.preventDefault();
      moveDown();
      break;
  }
}

function resetProps() {
  selectedCard = 0;
  selectedRow = 0;
  hPress = 0;
  vPress = 0;
  rows;
  window.scrollTo(0, 0);
  setTimeout(() => {
    rows = document.querySelectorAll(".page .row");
  }, 1000);
}

function renderPage(page) {
  switch (page) {
    case "home":
      Home();
      break;
    case "page1":
      Page1();
      break;
    case "page2":
      Page2();
      break;
    case "page3":
      Page3();
      break;
    default:
      Home();
  }
}
document.addEventListener("DOMContentLoaded", function () {
  const page = location.hash.replace(/^#/, "");
  renderPage(page);
  BuildMenu(activePage);
  setTimeout(() => {
    rows = document.querySelectorAll(".page .row");
  }, 1000);
});

window.addEventListener("hashchange", function () {
  const page = location.hash.replace(/^#/, "");
  resetProps();
  renderPage(page);
});
