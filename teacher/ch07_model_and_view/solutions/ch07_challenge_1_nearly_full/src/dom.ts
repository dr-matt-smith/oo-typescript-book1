// Helpers for finding elements on the page. View code only: the model never imports this file.

/**
 * The element that matches `selector` - or an error naming the selector, if there is none.
 * querySelector quietly gives null for a typo like "#cuont"; this makes the mistake loud,
 * in the browser's console, the moment the page starts.
 */
export const requireElement = <T extends HTMLElement>(selector: string): T => {
  const element = document.querySelector<T>(selector);
  if (element === null) {
    throw new Error(`No element matches "${selector}" - check index.html`);
  }
  return element;
};
