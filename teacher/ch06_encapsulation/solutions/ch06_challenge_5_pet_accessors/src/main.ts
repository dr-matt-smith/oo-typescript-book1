// Shows one pet, with buttons to play with it, feed it, give it a birthday and rename it.
// main.ts can only use Pet's public methods; every change goes through them, then render() shows
// the result.

import { Pet } from "./Pet.ts";

const pet = new Pet("Rex", "dog", 3);

const description = document.querySelector<HTMLElement>("#description");
const mood = document.querySelector<HTMLElement>("#mood");
const message = document.querySelector<HTMLElement>("#message");
const nameBox = document.querySelector<HTMLInputElement>("#new-name");

const render = (): void => {
  if (description !== null) {
    description.textContent = pet.toString();
  }
  if (mood !== null) {
    // CHALLENGE 5: pet.hungry and pet.name are properties now
    mood.textContent = pet.hungry ? `${pet.name} is hungry!` : `${pet.name} is happy.`;
    mood.className = pet.hungry ? "bad" : "good";
  }
};

const showMessage = (text: string): void => {
  if (message !== null) {
    message.textContent = text;
  }
};

document.querySelector("#play")?.addEventListener("click", () => {
  pet.play();
  render();
});
document.querySelector("#feed")?.addEventListener("click", () => {
  pet.feed();
  render();
});
document.querySelector("#birthday")?.addEventListener("click", () => {
  pet.haveBirthday();
  render();
});
document.querySelector("#rename")?.addEventListener("click", () => {
  if (nameBox === null) {
    return;
  }
  // The name setter throws an Error if the name is blank. try/catch (as in Java) catches it, and the
  // page shows the Error's message instead of stopping.
  try {
    pet.name = nameBox.value; // CHALLENGE 5: an assignment, which runs the setter
    showMessage("");
  } catch (error) {
    showMessage(error instanceof Error ? error.message : String(error));
  }
  render();
});

render();
