// The post office: two desks, Parcels and Payments, each with its own ticket machine and queue.
// main.ts is the only file that touches the page.
// CHALLENGE 5: rewritten for two desks. Each desk is a TicketQueue with its own TicketMachine.

import { TicketMachine } from "./TicketMachine.ts";
import { TicketQueue } from "./TicketQueue.ts";

/** One desk on the page: its name, its machine, its queue, and the elements that show it. */
type Desk = {
  name: string;
  prefix: string;
  machine: TicketMachine;
  queue: TicketQueue;
  waitingList: HTMLElement;
  servingText: HTMLElement;
  issuedText: HTMLElement;
};

const desksBox = document.querySelector<HTMLElement>("#desks");
const newDayButton = document.querySelector<HTMLButtonElement>("#new-day");

const renderDesk = (desk: Desk): void => {
  desk.waitingList.textContent = "";
  for (const ticket of desk.queue.getWaiting()) {
    const item = document.createElement("li");
    item.textContent = ticket.toString();
    desk.waitingList.appendChild(item);
  }
  const serving = desk.queue.nowServing();
  desk.servingText.textContent = serving === undefined ? "---" : serving.toString();
  desk.issuedText.textContent = `Tickets issued today: ${desk.machine.issuedCount()}`;
};

/** Builds one desk's card on the page, with its own buttons. */
const makeDesk = (name: string, prefix: string): Desk => {
  const card = document.createElement("section");
  card.className = "card";
  const heading = document.createElement("h2");
  heading.textContent = name;
  const takeButton = document.createElement("button");
  takeButton.textContent = "Take a ticket";
  const waitingList = document.createElement("ul");
  waitingList.className = "tickets";
  const servingText = document.createElement("p");
  servingText.className = "serving";
  const serveButton = document.createElement("button");
  serveButton.textContent = "Serve next";
  const issuedText = document.createElement("p");
  issuedText.className = "muted";
  card.append(heading, takeButton, waitingList, servingText, serveButton, issuedText);
  desksBox?.appendChild(card);

  const machine = new TicketMachine(prefix);
  const desk: Desk = {
    name,
    prefix,
    machine,
    queue: new TicketQueue(machine),
    waitingList,
    servingText,
    issuedText,
  };
  takeButton.addEventListener("click", () => {
    desk.queue.take();
    renderDesk(desk);
  });
  serveButton.addEventListener("click", () => {
    desk.queue.serveNext();
    renderDesk(desk);
  });
  return desk;
};

if (desksBox !== null) {
  desksBox.textContent = "";
}
const desks: Desk[] = [makeDesk("Parcels", "P"), makeDesk("Payments", "M")];

newDayButton?.addEventListener("click", () => {
  // A new day: a new machine (starting at 1) and an empty queue for every desk.
  for (const desk of desks) {
    desk.machine = new TicketMachine(desk.prefix);
    desk.queue = new TicketQueue(desk.machine);
    renderDesk(desk);
  }
});

for (const desk of desks) {
  renderDesk(desk);
}
