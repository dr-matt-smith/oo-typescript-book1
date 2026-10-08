// Finds out the time, and shows it on the page.

// new Date() makes an object holding the date and time, right now - like Java's LocalDateTime.now().
const now = new Date();

// getHours() gives the hour, from 0 to 23. Its type is number - TypeScript's only type for numbers.
const hour: number = now.getHours();

const time = document.querySelector("#time");
if (time !== null) {
  // toLocaleTimeString() gives the time as text, written the way your computer is set up to show it.
  time.textContent = `The time is ${now.toLocaleTimeString()}`;
}

const hourText = document.querySelector("#hour");
if (hourText !== null) {
  hourText.textContent = `The hour is ${hour}`;
}
