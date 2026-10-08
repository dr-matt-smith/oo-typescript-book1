// The deli counter: one button takes a ticket, another serves the next customer.
// main.ts is the only file that touches the page.

import { Ticket } from "./Ticket.ts";
import { TicketQueue } from "./TicketQueue.ts";

// let, not const: "New day" replaces the queue with a new, empty one.
let queue = new TicketQueue();

const takeButton = document.querySelector<HTMLButtonElement>("#take");
const serveButton = document.querySelector<HTMLButtonElement>("#serve");
const newDayButton = document.querySelector<HTMLButtonElement>("#new-day");
const yourTicket = document.querySelector<HTMLElement>("#your-ticket");
const waitingList = document.querySelector<HTMLElement>("#waiting");
const servingText = document.querySelector<HTMLElement>("#serving");
const issuedText = document.querySelector<HTMLElement>("#issued");

const render = (): void => {
  if (waitingList !== null) {
    waitingList.textContent = "";
    for (const ticket of queue.getWaiting()) {
      const item = document.createElement("li");
      item.textContent = ticket.toString();
      waitingList.appendChild(item);
    }
  }
  if (servingText !== null) {
    const serving = queue.nowServing();
    servingText.textContent = serving === undefined ? "---" : serving.toString();
  }
  if (issuedText !== null) {
    // A static method, called on the class: no ticket is needed to ask how many were issued.
    issuedText.textContent = `Tickets issued today: ${Ticket.issuedCount()}`;
  }
};

takeButton?.addEventListener("click", () => {
  const ticket = queue.take();
  if (yourTicket !== null) {
    yourTicket.textContent = `Your ticket is ${ticket}.`;
  }
  render();
});

serveButton?.addEventListener("click", () => {
  queue.serveNext();
  render();
});

newDayButton?.addEventListener("click", () => {
  Ticket.resetNumbering();
  queue = new TicketQueue();
  if (yourTicket !== null) {
    yourTicket.textContent = "A new day: numbering starts again at 1.";
  }
  render();
});

if (yourTicket !== null) {
  yourTicket.textContent = "Press the button to take a ticket.";
}
render();
