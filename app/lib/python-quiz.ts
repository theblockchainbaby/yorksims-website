/**
 * Python Basics Quiz — 20 questions adapted from the Python for Everybody
 * curriculum by Dr. Charles R. Severance (py4e.com, CC BY 3.0).
 *
 * Topics: programming fundamentals, data types, numbers/operators, strings,
 * conditionals/booleans, functions/methods, exceptions.
 *
 * Each question has 4 options, exactly one correct answer, and an explanation
 * shown after the user answers.
 */

export type Topic =
  | "fundamentals"
  | "data-types"
  | "numbers"
  | "strings"
  | "conditionals"
  | "functions"
  | "exceptions";

export interface QuizQuestion {
  id: string;
  topic: Topic;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export const TOPIC_LABELS: Record<Topic, string> = {
  fundamentals: "Programming Fundamentals",
  "data-types": "Data Types & Variables",
  numbers: "Numbers & Operators",
  strings: "Strings",
  conditionals: "Conditionals & Booleans",
  functions: "Functions & Methods",
  exceptions: "Errors & Exceptions",
};

export const QUESTIONS: QuizQuestion[] = [
  {
    id: "q01",
    topic: "fundamentals",
    question:
      "Which three operations do almost every program perform, in order?",
    options: [
      "Compile, link, execute",
      "Input, processing, output",
      "Open, read, close",
      "Declare, assign, return",
    ],
    correctIndex: 1,
    explanation:
      "Programs read data in (input), do something with it (processing), and produce a result (output). Almost everything you build is some version of this loop.",
  },
  {
    id: "q02",
    topic: "fundamentals",
    question: "What is an algorithm?",
    options: [
      "A type of variable",
      "A logical, step-by-step plan for solving a problem",
      "A Python keyword",
      "A graphical user interface",
    ],
    correctIndex: 1,
    explanation:
      "An algorithm is the logic — the ordered sequence of steps — that solves a problem. You design the algorithm first, then translate it into code.",
  },
  {
    id: "q03",
    topic: "data-types",
    question: "What is the result of `type(\"42\")` in Python?",
    options: [
      "<class 'int'>",
      "<class 'str'>",
      "<class 'float'>",
      "Error — quotes don't work on numbers",
    ],
    correctIndex: 1,
    explanation:
      "The quotes make it a string literal, even though the characters happen to be digits. `type()` returns `<class 'str'>`. Quotes always win over content.",
  },
  {
    id: "q04",
    topic: "data-types",
    question: "Which of these is NOT a legal Python variable name?",
    options: ["my_var", "_myVar", "myVar2", "2myVar"],
    correctIndex: 3,
    explanation:
      "Variable names cannot start with a digit. `2myVar` is illegal. The others are all fine — underscores and trailing digits are allowed, leading digits are not.",
  },
  {
    id: "q05",
    topic: "data-types",
    question:
      "In Python, are `myVar`, `MyVar`, and `MYVAR` the same variable?",
    options: [
      "Yes — Python is case-insensitive",
      "No — Python is case-sensitive, they are three different variables",
      "Only the first two are the same",
      "It depends on the data type",
    ],
    correctIndex: 1,
    explanation:
      "Python variable names are case-sensitive. `myVar`, `MyVar`, and `MYVAR` are three different variables. Mixing them is a common source of bugs.",
  },
  {
    id: "q06",
    topic: "numbers",
    question: "What does `7 % 3` evaluate to?",
    options: ["2", "1", "2.33", "0"],
    correctIndex: 1,
    explanation:
      "The `%` operator is modulus — it returns the remainder. 7 divided by 3 is 2 with a remainder of 1. Modulus is useful for checking divisibility and extracting digits.",
  },
  {
    id: "q07",
    topic: "numbers",
    question: "What does `2 ** 4` evaluate to?",
    options: ["8", "16", "24", "6"],
    correctIndex: 1,
    explanation:
      "`**` is the exponent operator in Python. 2 to the 4th power is 16 (2 × 2 × 2 × 2). Don't confuse it with `*` (multiplication) or `^` (which is bitwise XOR in Python, not exponent).",
  },
  {
    id: "q08",
    topic: "numbers",
    question: "Following PEMDAS, what is `2 + 3 * 4` in Python?",
    options: ["20", "14", "11", "9"],
    correctIndex: 1,
    explanation:
      "Multiplication happens before addition. `3 * 4 = 12`, then `2 + 12 = 14`. If you wanted 20, you'd need parentheses: `(2 + 3) * 4`.",
  },
  {
    id: "q09",
    topic: "numbers",
    question: "What is `int(2.95)` in Python?",
    options: ["3 (rounded)", "2 (truncated)", "2.95", "Error"],
    correctIndex: 1,
    explanation:
      "`int()` truncates the decimal — it doesn't round. `int(2.95)` is 2, not 3. If you need rounding, use `round(2.95)` which returns 3.",
  },
  {
    id: "q10",
    topic: "strings",
    question: "What does `\"abc\" + \"def\"` produce?",
    options: ["\"abcdef\"", "\"abc def\"", "Error — can't add strings", "7"],
    correctIndex: 0,
    explanation:
      "The `+` operator concatenates strings — joins them end-to-end. Note: no space is added between them. You'd write `\"abc\" + \" \" + \"def\"` for `\"abc def\"`.",
  },
  {
    id: "q11",
    topic: "strings",
    question: "What does `\"ab\" * 3` produce?",
    options: ["\"abababab\"", "\"ababab\"", "Error", "6"],
    correctIndex: 1,
    explanation:
      "The `*` operator on a string and integer repeats the string. `\"ab\" * 3` = `\"ababab\"` (three copies). It does NOT work between two strings or with a float.",
  },
  {
    id: "q12",
    topic: "strings",
    question: "What does `len(\"Hello World\")` return?",
    options: ["10", "11", "12", "2"],
    correctIndex: 1,
    explanation:
      "`len()` counts every character including spaces and punctuation. \"Hello World\" has 11 characters: H-e-l-l-o-[space]-W-o-r-l-d.",
  },
  {
    id: "q13",
    topic: "strings",
    question: "How do you include a single quote inside a single-quoted string?",
    options: [
      "Use `It's`",
      "Use `It\\'s` (backslash-escape the quote)",
      "You can't — switch to double quotes",
      "Both B and C work",
    ],
    correctIndex: 3,
    explanation:
      "Either `'It\\'s'` (escape with backslash) or `\"It's\"` (use double quotes around the string) works. The bare `'It's'` is a syntax error because the second quote ends the string early.",
  },
  {
    id: "q14",
    topic: "conditionals",
    question:
      "What character must end the header line of an `if`, `elif`, `else`, or function definition in Python?",
    options: [
      "A semicolon (`;`)",
      "A colon (`:`)",
      "Curly braces (`{}`)",
      "Nothing — Python uses indentation only",
    ],
    correctIndex: 1,
    explanation:
      "Every compound statement (if, elif, else, for, while, def, etc.) ends its header with a colon. The indented block below is what runs when the condition is true.",
  },
  {
    id: "q15",
    topic: "conditionals",
    question: "What does `elif` mean in Python?",
    options: [
      "End loop if",
      "Else if — chains another condition onto an `if`",
      "Equal-to logical-if",
      "It's not a real Python keyword",
    ],
    correctIndex: 1,
    explanation:
      "`elif` is shorthand for `else if`. It lets you chain multiple conditions cleanly. Only one branch of an if/elif/else chain runs — the first one whose condition is True.",
  },
  {
    id: "q16",
    topic: "conditionals",
    question: "What is the result of `True and not False`?",
    options: ["True", "False", "Error", "None"],
    correctIndex: 0,
    explanation:
      "`not False` is `True`, so the expression becomes `True and True`, which is `True`. `not` binds tighter than `and`, so it's evaluated first.",
  },
  {
    id: "q17",
    topic: "functions",
    question:
      "What's the difference between a function `parameter` and an `argument`?",
    options: [
      "They're the same thing",
      "A parameter is in the function definition; an argument is the actual value passed in when calling",
      "An argument is in the function definition; a parameter is the actual value",
      "Parameters are for built-in functions only; arguments are for user-defined functions",
    ],
    correctIndex: 1,
    explanation:
      "In `def greet(name):`, `name` is the parameter. In `greet(\"York\")`, `\"York\"` is the argument. Parameters live in the signature; arguments are the actual values you pass when calling.",
  },
  {
    id: "q18",
    topic: "functions",
    question: "What does `\"Python\".upper()` return?",
    options: ["\"python\"", "\"PYTHON\"", "\"Python\"", "Error"],
    correctIndex: 1,
    explanation:
      "`.upper()` is a string method that returns a new string with all letters uppercased. The original string is unchanged — strings in Python are immutable.",
  },
  {
    id: "q19",
    topic: "exceptions",
    question:
      "Which block runs when an error is raised inside the corresponding `try` block?",
    options: ["catch", "rescue", "except", "error"],
    correctIndex: 2,
    explanation:
      "Python uses `try` / `except`. Other languages call it `try` / `catch` (Java, JavaScript) or `begin` / `rescue` (Ruby), but in Python it's `except`.",
  },
  {
    id: "q20",
    topic: "exceptions",
    question:
      "What's the difference between a syntax error and a runtime exception?",
    options: [
      "Nothing — they're synonyms",
      "Syntax errors prevent the program from starting; runtime exceptions happen during execution",
      "Syntax errors only happen in functions; runtime exceptions only happen in main code",
      "Syntax errors are warnings; runtime exceptions are fatal",
    ],
    correctIndex: 1,
    explanation:
      "A syntax error means your code violates Python's grammar — the interpreter can't even start. A runtime exception happens while the program is running (e.g. dividing by zero, converting `\"abc\"` to int). You can catch runtime exceptions with try/except; you can't catch a syntax error.",
  },
];

export const TOPICS: Topic[] = [
  "fundamentals",
  "data-types",
  "numbers",
  "strings",
  "conditionals",
  "functions",
  "exceptions",
];
