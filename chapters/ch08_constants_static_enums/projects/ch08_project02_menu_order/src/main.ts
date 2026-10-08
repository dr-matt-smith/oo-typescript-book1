// The menu page: the dishes from menu.json, one section per course, filtered by diet, with an
// "Add" button on each dish, and the order and its total underneath.
// main.ts is the only file that touches the page.

import { COURSES, type Diet, dietLabel } from "./diet.ts";
import { Dish } from "./Dish.ts";
import { dishesFor } from "./menu.ts";
import menu from "./menu.json" with { type: "json" };
import { Order } from "./Order.ts";

// Dish.fromData checks every course and diet, so a mistake in menu.json stops the page here,
// with a message saying which value was wrong - not later, with a dish in no section.
const MENU: Dish[] = menu.map((data) => Dish.fromData(data));

/** The filter buttons, in order: null means "show every dish". */
const FILTERS: (Diet | null)[] = [null, "vegetarian", "vegan"];

const order = new Order();
let chosenDiet: Diet | null = null;

const filtersBox = document.querySelector<HTMLElement>("#filters");
const menuBox = document.querySelector<HTMLElement>("#menu");
const orderList = document.querySelector<HTMLElement>("#order");
const totalText = document.querySelector<HTMLElement>("#total");
const clearButton = document.querySelector<HTMLButtonElement>("#clear");

/** One row of the menu: name, diet, price and an Add button. */
const dishRow = (dish: Dish): HTMLElement => {
  const row = document.createElement("li");
  row.className = "dish";

  const name = document.createElement("span");
  name.textContent = dish.name;

  const diet = document.createElement("span");
  // The class is made from the Diet value - diet-vegan, diet-vegetarian, diet-meat - for its colour.
  diet.className = `diet diet-${dish.diet}`;
  diet.textContent = dietLabel(dish.diet);

  const price = document.createElement("span");
  price.className = "price";
  price.textContent = Order.formatPrice(dish.priceInCents);

  const add = document.createElement("button");
  add.textContent = "Add";
  add.addEventListener("click", () => {
    order.add(dish);
    render();
  });

  row.append(name, diet, price, add);
  return row;
};

const renderMenu = (): void => {
  if (menuBox === null) {
    return;
  }
  menuBox.textContent = "";
  // COURSES exists at run time (it is an array, not just a type), so the page can loop over it.
  for (const course of COURSES) {
    const heading = document.createElement("h2");
    heading.textContent = course;
    const list = document.createElement("ul");
    for (const dish of dishesFor(MENU, course, chosenDiet)) {
      list.appendChild(dishRow(dish));
    }
    menuBox.append(heading, list);
  }
};

const renderOrder = (): void => {
  if (orderList !== null) {
    orderList.textContent = "";
    for (const dish of order.getDishes()) {
      const item = document.createElement("li");
      item.textContent = `${dish.name} - ${Order.formatPrice(dish.priceInCents)}`;
      orderList.appendChild(item);
    }
  }
  if (totalText !== null) {
    totalText.textContent = `Total: ${Order.formatPrice(order.totalInCents())}`;
  }
};

const renderFilters = (): void => {
  if (filtersBox === null) {
    return;
  }
  filtersBox.textContent = "";
  for (const diet of FILTERS) {
    const button = document.createElement("button");
    button.textContent = diet === null ? "Everything" : dietLabel(diet);
    button.classList.toggle("secondary", diet !== chosenDiet);
    button.addEventListener("click", () => {
      chosenDiet = diet;
      render();
    });
    filtersBox.appendChild(button);
  }
};

const render = (): void => {
  renderFilters();
  renderMenu();
  renderOrder();
};

clearButton?.addEventListener("click", () => {
  order.clear();
  render();
});

render();
