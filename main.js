import { Gradient } from "./Gradient.js";
import { Contentful } from "./api.js";

// Create your instance
const gradient = new Gradient();

// Call `initGradient` with the selector to your canvas
gradient.initGradient("#gradient-canvas");

// Link related stuff

let pageState;
const $main = document.querySelector("main");
const $about = document.querySelector("article.about");
const $services = document.querySelector("article.services");
const $contact = document.querySelector("article.contact");
const pages = [$about, $services, $contact];
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

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const handleTransition = (p) => {
  Object.keys($nav).forEach((a) => {
    a === p
      ? $nav[a].classList?.add("is--active")
      : $nav[a].classList.remove("is--active");
  });
  $main.className = `${p}`;
  // pages.forEach(async ($page) => {
  //   $page.style.opacity = 0;
  // });
  pages.forEach(async ($page) => {
    $page.style.opacity = 0;
    await sleep(300);
    $page.style.display = "none";
    if ($page.className === p) {
      $page.style.display = "block";
      await sleep(10);
      $page.style.opacity = 1;
    }
  });
};

Contentful.getBlurb(document.querySelector(".signature"));
Contentful.getAbout(document.querySelector("article.about"));
Contentful.getServices(document.querySelector("article.services"));

const $revealInfo = document.querySelector("h3.reveal");

$revealInfo.addEventListener("click", async (e) => {
  e.preventDefault();
  $revealInfo.style.opacity = 0;
  await sleep(300);
  $revealInfo.textContent = "";
  const $phone = document.createElement("a");
  $phone.textContent = "+1 (310) 866-2453";
  $phone.href = "tel:+1 (310) 866-2453";
  const $email = document.createElement("a");
  $email.textContent = "mariaines@icloud.com";
  $email.href = "mailto:mariaines@icloud.com";
  $revealInfo.appendChild($phone);
  $revealInfo.appendChild(document.createElement("br"));
  $revealInfo.appendChild($email);
  $revealInfo.style.opacity = 1;
});
