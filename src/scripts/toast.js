export function toast (txt,color) {
    const body = document.querySelector("body");
    const divAnimation = document.createElement("div");
    const textAnimation = document.createElement("p");

    divAnimation.classList.add("toast__container", "toastadd");
    textAnimation.className = "textAnimation";

    divAnimation.style.backgroundColor = color

    textAnimation.innerHTML = txt;

    divAnimation.appendChild(textAnimation);
    body.appendChild(divAnimation);

    setTimeout(() => {
      divAnimation.classList.add("toast__remove");
    }, 3000);

    setTimeout(() => {
      body.removeChild(divAnimation);
    }, 3000);
}
