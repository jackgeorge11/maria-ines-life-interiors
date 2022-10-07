import { Gradient } from "./Gradient.js";
import { Contentful } from "./api.js";

// Create your instance
const gradient = new Gradient();

// Call `initGradient` with the selector to your canvas
gradient.initGradient("#gradient-canvas");

// sleep function for css transition delays
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Link related stuff

let pageState = "about";
const $main = document.querySelector("main");
const $loadingScreen = document.querySelector(".loading-screen");
const $about = document.querySelector("article.about");
const $services = document.querySelector("article.services");
const $contact = document.querySelector("article.contact");
const pages = [$about, $services, $contact];
let $nav = {};

const linkClick = (e) => {
  e.preventDefault();
  const toward = e.target.id;
  if (pageState !== toward) {
    pageState = toward;
    window.history.pushState("", "", pageState === "about" ? "/" : pageState);
    handleTransition(pageState);
  }
};

window.onload = async () => {
  document.querySelectorAll(".nav-link").forEach((a) => {
    $nav[a.id] = a;
  });
  pageState = window.location.pathname.substring(
    1,
    window.location.pathname.length
  );
  Contentful.getAllData();
  handleTransition(pageState ? pageState : "about");
  await sleep(1000);
  $loadingScreen.classList.add("fade-out");
  await sleep(600);
  $loadingScreen.style.display = "none";
};

document.querySelectorAll(".trans-link").forEach((e) => {
  e.addEventListener("click", (e) => linkClick(e));
});

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

const $revealInfo = document.querySelector("h3.reveal");

$revealInfo.addEventListener("click", async (e) => {
  e.preventDefault();
  $revealInfo.style.opacity = 0;
  await sleep(300);
  $revealInfo.textContent = "";
  // const $phone = document.createElement("a");
  // $phone.textContent = "+1 (310) 866-2453";
  // $phone.href = "tel:+1 (310) 866-2453";
  const $email = document.createElement("a");
  $email.textContent = "ines@mariaineslifeinteriors.com";
  $email.href = "mailto:ines@mariaineslifeinteriors.com";
  // const $spacer = document.createElement("span");
  // $spacer.className = "spacer";
  // $revealInfo.appendChild($phone);
  // $revealInfo.appendChild($spacer);
  $revealInfo.appendChild($email);
  $revealInfo.style.opacity = 1;
});
