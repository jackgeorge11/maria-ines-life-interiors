import { Gradient } from "./Gradient.js";
import { Contentful } from "./api.js";

// Create your instance
const gradient = new Gradient();

// Call `initGradient` with the selector to your canvas
gradient.initGradient("#gradient-canvas");

// Link related stuff

let pageState;
const $article = document.querySelector("article");
let $nav = {};

window.onload = () => {
  document.querySelectorAll(".false-link").forEach((a) => {
    $nav[a.id] = a;
    a.addEventListener("click", (e) => {
      e.preventDefault();
      const toward = e.target.id;
      if (pageState !== toward) {
        pageState = toward;
        window.history.pushState(
          "",
          "",
          pageState === "about" ? "/" : pageState
        );
        handleTransition(pageState);
      }
    });
  });
  pageState = window.location.pathname.substring(
    1,
    window.location.pathname.length
  );
  handleTransition(pageState ? pageState : "about");
};

const handleTransition = (p) => {
  Object.keys($nav).forEach((a) => {
    a === p
      ? $nav[a].classList?.add("is--active")
      : $nav[a].classList.remove("is--active");
  });
  $article.className = `${p}`;
  // document.querySelector(`#${p}`).classList.add("is--active");
  // const pages = ["home", "projects", "about", "contact"];
  // const i = pages.indexOf(pageState);
  // pages.splice(i, 1);
  // $article.classList.add(pageState);
  // pages.forEach((p) => $article.classList.remove(p));
};

Contentful.getServices(document.querySelector("main.services"));
