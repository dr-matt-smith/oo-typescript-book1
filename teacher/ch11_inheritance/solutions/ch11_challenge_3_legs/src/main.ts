// The page: a list of animals, a Speak button for each, and buttons to add a cat or a dog.
// main.ts is the only file that touches the page.

import type { Animal } from "./Animal.ts";
import { Bird } from "./Bird.ts"; // CHALLENGE 3
import { Cat } from "./Cat.ts";
import { Dog } from "./Dog.ts";
import { chorus } from "./farm.ts";

/** Finds an element, or stops with an error that names the missing selector (Chapter 7). */
const requireElement = <T extends HTMLElement>(selector: string): T => {
  const element = document.querySelector<T>(selector);
  if (element === null) {
    throw new Error(`No element matches ${selector}`);
  }
  return element;
};

// One array holds cats and dogs together, because both are Animals.
const animals: Animal[] = [new Cat("Tom"), new Dog("Rex"), new Cat("Felix")];

const list = requireElement<HTMLUListElement>("#animals");
const said = requireElement<HTMLParagraphElement>("#said");
const nameBox = requireElement<HTMLInputElement>("#name");

const render = (): void => {
  list.innerHTML = "";
  for (const animal of animals) {
    const item = document.createElement("li");
    item.className = "card";
    const label = document.createElement("span");
    // `${animal}` calls animal.toString() - the Cat or Dog version.
    label.textContent = `${animal} (${animal.getLegs()} legs)`; // CHALLENGE 3
    const speakButton = document.createElement("button");
    speakButton.textContent = "Speak";
    speakButton.addEventListener("click", () => {
      said.textContent = animal.speak();
    });
    item.append(label, speakButton);
    list.appendChild(item);
  }
};

/** The name typed in the box, or a default if the box is empty. */
const typedName = (fallback: string): string => nameBox.value.trim() || fallback;

requireElement<HTMLButtonElement>("#add-cat").addEventListener("click", () => {
  animals.push(new Cat(typedName("Kitty")));
  nameBox.value = "";
  render();
});

requireElement<HTMLButtonElement>("#add-dog").addEventListener("click", () => {
  animals.push(new Dog(typedName("Buddy")));
  nameBox.value = "";
  render();
});

// CHALLENGE 3
requireElement<HTMLButtonElement>("#add-bird").addEventListener("click", () => {
  animals.push(new Bird(typedName("Tweety")));
  nameBox.value = "";
  render();
});

requireElement<HTMLButtonElement>("#all-speak").addEventListener("click", () => {
  said.textContent = chorus(animals).join(" · ");
});

render();
