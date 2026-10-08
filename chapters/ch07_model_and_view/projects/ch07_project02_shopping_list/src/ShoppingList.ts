// The model: the items on a shopping list, in the order they were added.
// It keeps its own rules - no blank items, no item twice - and knows nothing about the page.

export class ShoppingList {
  private readonly items: string[] = [];

  /**
   * What is wrong with adding `text`, as a message for the user - or null if it can be added.
   * The view asks this first, so it can show the message instead of adding.
   */
  public problemWith(text: string): string | null {
    const name = text.trim();
    if (name === "") {
      return "Type an item first";
    }
    const lower = name.toLowerCase();
    if (this.items.some((item) => item.toLowerCase() === lower)) {
      return `${name} is already on the list`;
    }
    return null;
  }

  /** Adds an item, without the spaces round it. Throws if problemWith would complain. */
  public add(text: string): void {
    const problem = this.problemWith(text);
    if (problem !== null) {
      throw new Error(problem);
    }
    this.items.push(text.trim());
  }

  /** Removes the item at `index` (0 is the first). */
  public remove(index: number): void {
    if (index < 0 || index >= this.items.length) {
      throw new Error(`There is no item ${index} - the list has ${this.items.length}`);
    }
    // splice(index, 1) cuts one element out of the array, at that index.
    this.items.splice(index, 1);
  }

  /** A copy of the items, so code outside cannot change the list behind the model's back. */
  public get all(): string[] {
    return [...this.items];
  }

  /** How many items are on the list. */
  public get size(): number {
    return this.items.length;
  }
}
