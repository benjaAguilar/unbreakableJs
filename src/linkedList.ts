type Val = {
  type: string;
  code: string;
  reasoning: string;
};

export class LinkedList {
  val: Val;
  next: LinkedList | null;
  prev: LinkedList | null;

  constructor(val: Val, next?: LinkedList | null, prev?: LinkedList | null) {
    this.val = val;
    this.next = next instanceof LinkedList ? next : null;
    this.prev = prev instanceof LinkedList ? prev : null;
  }

  getArrayOfSteps(): Val[] {
    const arr = [];
    let current: LinkedList | null = this;

    while (current !== null) {
      arr.push(current.val);
      current = current.next;
    }

    return arr;
  }

  tail(): LinkedList {
    let current: LinkedList = this;

    while (current.next !== null) {
      current = current.next;
    }

    return current;
  }
}
