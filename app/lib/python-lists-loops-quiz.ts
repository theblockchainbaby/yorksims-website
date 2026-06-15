/**
 * Python Lists & Loops Quiz — 20 original questions on Python's data
 * collections (lists, sets, tuples, dictionaries), control flow (while/for),
 * loop control statements, and function arguments/return values.
 *
 * Aligns with the second-unit topics in Python for Everybody by Dr. Charles
 * R. Severance (py4e.com, CC BY 3.0). Questions and explanations are
 * original to YorkSims.
 */

export type Topic =
  | "lists"
  | "list-methods"
  | "collections"
  | "while-loops"
  | "for-loops"
  | "loop-control"
  | "function-args";

export interface QuizQuestion {
  id: string;
  topic: Topic;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export const TOPIC_LABELS: Record<Topic, string> = {
  lists: "Lists & Indexing",
  "list-methods": "List Methods & Slicing",
  collections: "Sets, Tuples & Dictionaries",
  "while-loops": "While Loops",
  "for-loops": "For Loops & Range",
  "loop-control": "Break, Continue & Nesting",
  "function-args": "Arguments & Return Values",
};

export const QUESTIONS: QuizQuestion[] = [
  {
    id: "q01",
    topic: "lists",
    question:
      "Given `colors = ['red', 'green', 'blue']`, what does `colors[0]` return?",
    options: ["'green'", "'red'", "1", "Error — lists don't use brackets"],
    correctIndex: 1,
    explanation:
      "Lists are zero-indexed. `colors[0]` is the first element, `'red'`. `colors[1]` would be `'green'`. Off-by-one errors here are one of the most common Python bugs for beginners.",
  },
  {
    id: "q02",
    topic: "lists",
    question:
      "What does `colors[-1]` return for `colors = ['red', 'green', 'blue']`?",
    options: ["Error — negative indexes aren't allowed", "'red'", "'blue'", "None"],
    correctIndex: 2,
    explanation:
      "Negative indexes count from the end. `colors[-1]` is the last element, `'blue'`. `colors[-2]` would be `'green'`. Handy when you don't know the list's length.",
  },
  {
    id: "q03",
    topic: "lists",
    question: "Which statement about Python lists is TRUE?",
    options: [
      "All elements must be the same type",
      "Lists are immutable — you can't change them after creation",
      "Lists can hold mixed types and can be modified after creation",
      "Lists can only hold strings or numbers, not other lists",
    ],
    correctIndex: 2,
    explanation:
      "Python lists are mutable (you can change them) and heterogeneous (mixed types are fine). `[1, 'two', 3.0, [4, 5]]` is a perfectly valid list. That's different from arrays in languages like Java or C.",
  },
  {
    id: "q04",
    topic: "list-methods",
    question: "What does `nums.append(5)` do, given `nums = [1, 2, 3]`?",
    options: [
      "Returns a new list `[1, 2, 3, 5]`; `nums` is unchanged",
      "Modifies `nums` in place to `[1, 2, 3, 5]` and returns None",
      "Replaces `nums` with just `[5]`",
      "Throws an error — you need `.add()` for lists",
    ],
    correctIndex: 1,
    explanation:
      "`.append()` mutates the list in place and returns None. So `nums = nums.append(5)` is a classic bug — `nums` becomes None. Just call `nums.append(5)` on its own line.",
  },
  {
    id: "q05",
    topic: "list-methods",
    question:
      "What does `letters[1:4]` return for `letters = ['a', 'b', 'c', 'd', 'e']`?",
    options: [
      "['a', 'b', 'c']",
      "['b', 'c', 'd']",
      "['b', 'c', 'd', 'e']",
      "['a', 'b', 'c', 'd']",
    ],
    correctIndex: 1,
    explanation:
      "Slicing uses `[start:stop]` where `stop` is exclusive. `[1:4]` gives indexes 1, 2, 3 — that's `['b', 'c', 'd']`. The stop value is the index you do NOT include. Same rule as `range()`.",
  },
  {
    id: "q06",
    topic: "list-methods",
    question:
      "What's the difference between `list.append(x)` and `list.extend(x)`?",
    options: [
      "They're identical",
      "`append` adds one element; `extend` unpacks an iterable and adds each element",
      "`extend` is faster than `append`",
      "`append` works on numbers; `extend` works on strings",
    ],
    correctIndex: 1,
    explanation:
      "`[1,2].append([3,4])` gives `[1, 2, [3, 4]]` — one nested list element. `[1,2].extend([3,4])` gives `[1, 2, 3, 4]` — each element unpacked. Pick based on whether you want nesting.",
  },
  {
    id: "q07",
    topic: "collections",
    question:
      "Which built-in type is created with curly braces and rejects duplicate values?",
    options: ["List", "Tuple", "Set", "String"],
    correctIndex: 2,
    explanation:
      "`my_set = {1, 2, 3}` is a set — no duplicates allowed, no guaranteed order. Sets are excellent for membership tests and de-duplication. Tuples use `()`, lists use `[]`.",
  },
  {
    id: "q08",
    topic: "collections",
    question: "Which collection type is ordered AND immutable?",
    options: ["List", "Set", "Dictionary", "Tuple"],
    correctIndex: 3,
    explanation:
      "Tuples preserve order and can't be modified after creation: `(1, 2, 3)`. Use them for fixed groupings (coordinates, RGB values) or as dictionary keys — lists can't be keys, but tuples can.",
  },
  {
    id: "q09",
    topic: "collections",
    question:
      "Given `prices = {'apple': 1.0, 'pear': 1.5}`, how do you get the price of apple?",
    options: ["prices.apple", "prices['apple']", "prices(apple)", "prices.get(0)"],
    correctIndex: 1,
    explanation:
      "Dictionaries use bracket access with the key: `prices['apple']`. If the key might be missing and you don't want an error, use `prices.get('apple')` which returns None instead of crashing.",
  },
  {
    id: "q10",
    topic: "collections",
    question:
      "What does `'apple' in prices` return for `prices = {'apple': 1.0, 'pear': 1.5}`?",
    options: [
      "True — `in` checks keys",
      "True — `in` checks values",
      "1.0 — `in` returns the value",
      "Error — `in` only works on lists",
    ],
    correctIndex: 0,
    explanation:
      "By default, `in` checks dictionary keys, not values. To check values use `1.0 in prices.values()`. Key lookups are fast (hash-based); value scans are slower because they walk the whole dict.",
  },
  {
    id: "q11",
    topic: "while-loops",
    question: "What's the most common cause of an infinite `while` loop?",
    options: [
      "Using `=` instead of `==` in the condition",
      "Nothing inside the loop updates the variable the condition depends on",
      "Forgetting to add a colon at the end",
      "Using a string as the condition",
    ],
    correctIndex: 1,
    explanation:
      "Classic infinite loop: `while x < 10:` with no `x = x + 1` (or equivalent) inside the body. Some piece of state has to change inside the loop, or the stop condition is never reachable.",
  },
  {
    id: "q12",
    topic: "while-loops",
    question:
      "How many times does this print? `n = 3` ; `while n > 0: print(n); n -= 1`",
    options: ["2", "3", "4", "Infinite"],
    correctIndex: 1,
    explanation:
      "Prints 3, 2, 1 — three iterations. When `n` becomes 0, the condition `n > 0` is False and the loop exits. The decrement happens AFTER `print`, so 0 never gets printed.",
  },
  {
    id: "q13",
    topic: "for-loops",
    question: "What does `range(5)` produce?",
    options: [
      "The numbers 1, 2, 3, 4, 5",
      "The numbers 0, 1, 2, 3, 4",
      "The numbers 0, 1, 2, 3, 4, 5",
      "A list containing just the number 5",
    ],
    correctIndex: 1,
    explanation:
      "`range(stop)` produces 0 up to but NOT including `stop`. So `range(5)` is 0, 1, 2, 3, 4 — five values total. The stop value is exclusive, same as slicing.",
  },
  {
    id: "q14",
    topic: "for-loops",
    question: "What does `range(2, 10, 3)` produce?",
    options: [
      "2, 5, 8",
      "2, 5, 8, 10",
      "2, 3, 4, 5, 6, 7, 8, 9",
      "Error — too many arguments",
    ],
    correctIndex: 0,
    explanation:
      "`range(start, stop, step)` — start at 2, step by 3, stop before 10. So 2, 5, 8. The next would be 11 but that exceeds 10, so it stops. Negative steps work too: `range(10, 0, -1)`.",
  },
  {
    id: "q15",
    topic: "for-loops",
    question:
      "What's the cleanest way to iterate over both index and value in a list?",
    options: [
      "for i in range(len(my_list)): item = my_list[i]",
      "for item, i in my_list:",
      "for i, item in enumerate(my_list):",
      "for i in my_list.indexes():",
    ],
    correctIndex: 2,
    explanation:
      "`enumerate()` gives you `(index, value)` pairs for free. `for i, item in enumerate(my_list):` is idiomatic Python. The `range(len(...))` version works but is considered un-Pythonic.",
  },
  {
    id: "q16",
    topic: "loop-control",
    question: "What does the `break` statement do inside a loop?",
    options: [
      "Skips the current iteration and continues with the next",
      "Exits the entire loop immediately",
      "Restarts the loop from the beginning",
      "Pauses the loop until input is received",
    ],
    correctIndex: 1,
    explanation:
      "`break` exits the loop entirely — execution jumps to the line after the loop. In a nested loop, `break` only exits the innermost loop, not all of them. Use a flag or refactor into a function if you need to exit several layers.",
  },
  {
    id: "q17",
    topic: "loop-control",
    question: "What's the difference between `break` and `continue`?",
    options: [
      "They do the same thing",
      "`break` exits the loop; `continue` skips to the next iteration",
      "`break` is for `for` loops; `continue` is for `while` loops",
      "`break` is faster than `continue`",
    ],
    correctIndex: 1,
    explanation:
      "`break` stops the loop entirely. `continue` skips the rest of the current iteration and jumps back to the loop's condition check. Both work in `for` and `while`.",
  },
  {
    id: "q18",
    topic: "function-args",
    question: "What does a Python function return if it has no `return` statement?",
    options: ["0", "An empty string", "None", "It throws an error"],
    correctIndex: 2,
    explanation:
      "Functions without an explicit `return` (or with a bare `return`) return `None`. That's why `result = print('hi')` sets `result` to None — `print()` returns None, not the string it printed.",
  },
  {
    id: "q19",
    topic: "function-args",
    question:
      "What's `total` after this code? `total = 0`, then `def add(x): total = x`, then `add(5)`?",
    options: [
      "5 — the function modifies the outer total",
      "0 — the function creates a local `total` that shadows the outer one",
      "Error — you can't have two variables named `total`",
      "None",
    ],
    correctIndex: 1,
    explanation:
      "Assignment inside a function creates a new local variable by default. The outer `total` is untouched. To modify the outer variable, you'd need the `global` keyword — usually a sign the code should be refactored to return a value instead.",
  },
  {
    id: "q20",
    topic: "function-args",
    question: "Can a Python function return multiple values?",
    options: [
      "No — only one value per function",
      "Yes — return them comma-separated, e.g. `return a, b`",
      "Yes — but only if you declare the function with `multi_return`",
      "Only if you wrap them in a list",
    ],
    correctIndex: 1,
    explanation:
      "`return a, b` returns a tuple of both values. The caller unpacks it with `x, y = my_func()`. Cleaner than packing into a list and indexing into it.",
  },
];

export const TOPICS: Topic[] = [
  "lists",
  "list-methods",
  "collections",
  "while-loops",
  "for-loops",
  "loop-control",
  "function-args",
];
