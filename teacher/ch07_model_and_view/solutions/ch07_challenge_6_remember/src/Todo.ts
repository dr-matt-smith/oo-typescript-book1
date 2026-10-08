// The model for one thing to do: an id that never changes, its text, and whether it is done.

export class Todo {
  private isDone: boolean;

  // CHALLENGE 6: a to-do loaded from storage may already be done
  constructor(public readonly id: number, public readonly text: string, done: boolean = false) {
    this.isDone = done;
  }

  /** True once the to-do has been ticked off. */
  public get done(): boolean {
    return this.isDone;
  }

  /** Done becomes not done, and not done becomes done. */
  public toggle(): void {
    this.isDone = !this.isDone;
  }
}
