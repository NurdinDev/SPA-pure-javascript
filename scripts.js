const app = document.getElementById("app");
let menuActive = true;
let activePage = "home";
const menu = document.getElementById("menu");

const pages = {
  home: "home",
  menu1: "menu1",
  menu2: "menu2",
  menu3: "menu3",
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

function showMenu() {
  menuActive = true;
  menu.classList.remove("hidden");
}
function hideMenu() {
  menuActive = false;
  menu.classList.add("hidden");
}
function moveLeft() {
  showMenu();
}
function moveUp() {
  const pagesKeys = Object.keys(pages);
  const activeIndex = pagesKeys.indexOf(activePage);
  const previousPage =
    activeIndex == 0
      ? pagesKeys[pagesKeys.length - 1]
      : pagesKeys[activeIndex - 1];
  activePage = previousPage;
  BuildMenu(previousPage);
}
function moveRight() {
  console.log("move right");
  hideMenu();
}
function moveDown() {
  const pagesKeys = Object.keys(pages);
  const activeIndex = pagesKeys.indexOf(activePage);
  const nextPage =
    activeIndex == pagesKeys.length - 1
      ? pagesKeys[0]
      : pagesKeys[activeIndex + 1];
  activePage = nextPage;
  BuildMenu(nextPage);
}

function getKeyAndMove(key) {
  const key_code = key.which || key.keyCode;
  switch (key_code) {
    case 37: //left arrow key
      moveLeft();
      break;
    case 38: //Up arrow key
      moveUp();
      break;
    case 39: //right arrow key
      moveRight();
      break;
    case 40: //down arrow key
      moveDown();
      break;
  }
}

document.addEventListener("DOMContentLoaded", function () {
  console.log("document loaded");
  BuildMenu(activePage);
  Home();
});

// window.addEventListener("hashchange", function () {
//   console.log(location.has);
// });
