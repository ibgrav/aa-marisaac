console.log("hello, world");

// const title = document.querySelector("h1.title");

function addScrollClassName() {
  if (globalThis.scrollY > 100) {
    document.body.classList.add("scroll");
  } else {
    document.body.classList.remove("scroll");
  }
}

addScrollClassName();

globalThis.addEventListener("scroll", addScrollClassName);
