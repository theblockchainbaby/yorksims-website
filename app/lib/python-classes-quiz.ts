/**
 * Python Classes & Modules Quiz — 20 original questions on object-oriented
 * Python: classes, __init__, attributes, methods, inheritance, scope,
 * modules, and file I/O.
 *
 * Aligns with the third-unit topics in Python for Everybody by Dr. Charles
 * R. Severance (py4e.com, CC BY 3.0). Questions and explanations are
 * original to YorkSims.
 */

export type Topic =
  | "classes"
  | "init-attrs"
  | "methods"
  | "inheritance"
  | "scope"
  | "modules"
  | "files";

export interface QuizQuestion {
  id: string;
  topic: Topic;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export const TOPIC_LABELS: Record<Topic, string> = {
  classes: "Classes & Objects",
  "init-attrs": "Init & Attributes",
  methods: "Methods & self",
  inheritance: "Inheritance",
  scope: "Scope",
  modules: "Modules & Imports",
  files: "File I/O",
};

export const QUESTIONS: QuizQuestion[] = [
  {
    id: "q01",
    topic: "classes",
    question: "What's the difference between a class and an instance?",
    options: [
      "Nothing — they're the same",
      "A class is the blueprint; an instance is a specific object built from that blueprint",
      "An instance is the blueprint; a class is the object",
      "Classes hold methods; instances hold attributes",
    ],
    correctIndex: 1,
    explanation:
      "Think of the class as a recipe and instances as the actual dishes you cook from it. Same structure, different state. `Car` is the class; `my_car = Car()` is an instance.",
  },
  {
    id: "q02",
    topic: "classes",
    question: "What does the `class` keyword (lowercase) do in Python?",
    options: [
      "Defines a new class",
      "Imports a class from another module",
      "Declares a variable as a class attribute",
      "Marks a function as a method",
    ],
    correctIndex: 0,
    explanation:
      "`class MyClass:` defines a new class. By convention, class names use `CapWords` (PEP 8), unlike functions and variables which are `snake_case`. The colon and indented block work the same as `if` and `def`.",
  },
  {
    id: "q03",
    topic: "classes",
    question:
      "What's the convention for class names vs. function and variable names in Python?",
    options: [
      "Everything is snake_case",
      "Everything is CapWords",
      "Classes are CapWords; functions and variables are snake_case",
      "There is no convention — pick whatever you want",
    ],
    correctIndex: 2,
    explanation:
      "Per PEP 8: classes use `CapWords` (also called PascalCase), e.g. `UserAccount`. Functions and variables use `snake_case`, e.g. `get_user`. Constants are `SCREAMING_SNAKE_CASE`. Following this makes code instantly readable.",
  },
  {
    id: "q04",
    topic: "init-attrs",
    question: "When is `__init__` called?",
    options: [
      "When the program starts",
      "Once per class definition",
      "Every time you create a new instance of the class",
      "Manually — you have to call it yourself",
    ],
    correctIndex: 2,
    explanation:
      "`__init__` runs automatically when you create an instance. `User('alice')` calls `User.__init__(self, 'alice')` behind the scenes. Use it to set up the instance's starting attributes.",
  },
  {
    id: "q05",
    topic: "init-attrs",
    question: "Why does `__init__` take `self` as its first parameter?",
    options: [
      "Just a Python quirk — you can skip it",
      "`self` refers to the specific instance being initialized, so the method can set its attributes",
      "`self` is the class itself",
      "It's the return value",
    ],
    correctIndex: 1,
    explanation:
      "`self` is the instance being built. `self.name = name` sets an attribute on this specific object. The name `self` is just convention — you could rename it, but every Python developer would hate reading your code.",
  },
  {
    id: "q06",
    topic: "init-attrs",
    question:
      "Inside `__init__`, how do you create an instance attribute called `count` and set it to 0?",
    options: ["count = 0", "self.count = 0", "this.count = 0", "instance.count = 0"],
    correctIndex: 1,
    explanation:
      "`self.count = 0` creates an attribute on the instance. Plain `count = 0` would be a local variable that disappears when `__init__` returns. `this` is a JavaScript/Java keyword, not Python.",
  },
  {
    id: "q07",
    topic: "methods",
    question: "What's the difference between a function and a method?",
    options: [
      "Nothing — interchangeable terms",
      "A method is a function defined inside a class and bound to an instance",
      "Methods can't return values",
      "Functions can take arguments; methods can't",
    ],
    correctIndex: 1,
    explanation:
      "A method is just a function that lives on a class. When you call `obj.greet()`, Python passes `obj` as the first argument (`self`) automatically. That's the real difference — the implicit `self`.",
  },
  {
    id: "q08",
    topic: "methods",
    question:
      "If `dog` is an instance and `Dog` has a method `bark(self)`, how do you call it?",
    options: ["bark(dog)", "dog.bark()", "Dog.bark()", "dog->bark()"],
    correctIndex: 1,
    explanation:
      "`dog.bark()` — Python passes `dog` as `self` automatically. `Dog.bark(dog)` technically works but nobody writes it that way. The arrow `->` is from C++/PHP, not Python.",
  },
  {
    id: "q09",
    topic: "inheritance",
    question: "How do you declare that class `B` inherits from class `A`?",
    options: [
      "class B inherits A:",
      "class B(A):",
      "class B extends A:",
      "class B << A:",
    ],
    correctIndex: 1,
    explanation:
      "`class B(A):` — the parent class goes in parentheses. `B` automatically gets all of `A`'s methods and attributes. `extends` is Java/TypeScript syntax; Python uses parens.",
  },
  {
    id: "q10",
    topic: "inheritance",
    question: "What does `super().__init__()` do?",
    options: [
      "Calls the parent class's `__init__` so its setup also runs",
      "Creates a brand-new parent instance",
      "Returns the parent class",
      "Skips the parent's initialization",
    ],
    correctIndex: 0,
    explanation:
      "`super().__init__()` runs the parent's `__init__` before (or after) your subclass does its own setup. Without it, the parent's attribute assignments are skipped — usually a bug if the parent had any.",
  },
  {
    id: "q11",
    topic: "inheritance",
    question:
      "If a method is defined in both the parent and the child class, which one runs when called on the child instance?",
    options: [
      "The parent's — it was defined first",
      "The child's — it overrides the parent",
      "Both — they run in order",
      "Neither — Python raises an error",
    ],
    correctIndex: 1,
    explanation:
      "The child's method wins. This is called method overriding. To still call the parent's version from inside the child, use `super().method_name()`.",
  },
  {
    id: "q12",
    topic: "scope",
    question: "What is 'scope' in Python?",
    options: [
      "The size of the project",
      "The region of code where a name (variable, function, class) is accessible",
      "How much memory a variable uses",
      "A type of decorator",
    ],
    correctIndex: 1,
    explanation:
      "Scope is about where names are visible. A variable defined inside a function exists only in that function (local scope). Variables outside any function live at module/global scope.",
  },
  {
    id: "q13",
    topic: "scope",
    question: "What does the `global` keyword do?",
    options: [
      "Makes a function callable from anywhere",
      "Lets a function modify a variable in the surrounding global scope instead of creating a local one",
      "Marks a variable as constant",
      "Imports a module",
    ],
    correctIndex: 1,
    explanation:
      "`global counter` inside a function tells Python: 'when I assign to counter, modify the module-level one, don't create a new local.' If you find yourself reaching for `global` often, consider returning a value instead — usually cleaner.",
  },
  {
    id: "q14",
    topic: "modules",
    question: "What is a Python module?",
    options: [
      "A class with many methods",
      "A file containing Python code (functions, classes, variables) you can import elsewhere",
      "A pre-compiled binary",
      "A type of decorator",
    ],
    correctIndex: 1,
    explanation:
      "A module is just a `.py` file. `utils.py` is a module named `utils`. Import it with `import utils` and call its functions with `utils.helper()`. Modules are how you organize larger Python projects.",
  },
  {
    id: "q15",
    topic: "modules",
    question:
      "What's the difference between `import math` and `from math import sqrt`?",
    options: [
      "Nothing — both load everything",
      "`import math` lets you use `math.sqrt`; `from math import sqrt` lets you use `sqrt` directly",
      "`from` is faster",
      "`import` is deprecated",
    ],
    correctIndex: 1,
    explanation:
      "`import math` brings in the module, accessed as `math.sqrt(9)`. `from math import sqrt` brings in just that name, used as `sqrt(9)`. The first is safer (no risk of name collisions); the second is shorter.",
  },
  {
    id: "q16",
    topic: "modules",
    question: "Why is `from math import *` usually a bad idea?",
    options: [
      "It's invalid syntax",
      "It imports every name from math into the current namespace, which can silently overwrite your own variables",
      "It only imports the `*` operator",
      "It marks the module as required",
    ],
    correctIndex: 1,
    explanation:
      "Star-imports dump everything from the module into your namespace. If `math` defines `pi` and you have your own `pi` variable, the import silently overwrites it. Be explicit: `from math import pi, sqrt`.",
  },
  {
    id: "q17",
    topic: "files",
    question: "What mode opens a file for writing, erasing anything already in it?",
    options: ["'r'", "'a'", "'w'", "'x'"],
    correctIndex: 2,
    explanation:
      "`'w'` (write) truncates the file to empty, then writes. `'a'` (append) keeps existing content and adds to the end. `'r'` is read-only (default). `'x'` is exclusive create — fails if the file already exists.",
  },
  {
    id: "q18",
    topic: "files",
    question: "Why is `with open(...) as f:` preferred over plain `f = open(...)`?",
    options: [
      "It's shorter to type",
      "`with` automatically closes the file when the block exits, even if an exception is raised",
      "`open()` is deprecated",
      "It supports more file modes",
    ],
    correctIndex: 1,
    explanation:
      "The `with` statement is a context manager — it guarantees `f.close()` runs even if an error happens mid-read. A forgotten `f.close()` can leak file handles or leave data unwritten on disk.",
  },
  {
    id: "q19",
    topic: "files",
    question: "What does `f.read()` return on a text file?",
    options: [
      "A list of lines",
      "The entire file as one string",
      "The first line only",
      "An integer (number of characters)",
    ],
    correctIndex: 1,
    explanation:
      "`f.read()` returns the whole file as a single string. `f.readlines()` returns a list of lines. For huge files, iterate with `for line in f:` — it streams one line at a time and uses far less memory.",
  },
  {
    id: "q20",
    topic: "files",
    question:
      "What happens if you call `open('missing.txt')` and the file doesn't exist?",
    options: [
      "It returns None",
      "Python creates an empty file",
      "It raises a FileNotFoundError",
      "It opens the closest matching filename",
    ],
    correctIndex: 2,
    explanation:
      "Read mode (`'r'`, the default) raises FileNotFoundError if the file is missing. Wrap the open in `try/except FileNotFoundError` to handle it gracefully — or use write/append modes which create the file if needed.",
  },
];

export const TOPICS: Topic[] = [
  "classes",
  "init-attrs",
  "methods",
  "inheritance",
  "scope",
  "modules",
  "files",
];
