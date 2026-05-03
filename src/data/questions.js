// ============================================================
//  BRILLIANT — FULL QUESTION BANK
//  Each lesson has: intro text, 3–5 questions with explanations
// ============================================================

export const questionBank = {

  // ══════════════════════════════════════════════════
  //  UNIT 1 — INSTRUCTIONS & STEPS
  // ══════════════════════════════════════════════════

  "u1-l1": {
    lessonTitle: "What is an Instruction?",
    intro: "Computers follow instructions — one at a time, in exact order. An instruction is a single, clear command that tells a machine (or person) exactly what to do.",
    concept: "Just like a recipe tells you to add 2 eggs *before* you bake, programs tell the computer what to do, in what order.",
    questions: [
      {
        id: "q1",
        type: "mcq",
        question: "Which of these is the best example of a clear instruction a computer could follow?",
        options: ["Be nice", "Add 5 to the number stored in memory", "Think about the answer", "Do something useful"],
        correct: 1,
        explanation: "Computers need precise, unambiguous commands. 'Add 5 to the number stored in memory' is specific and actionable — the others are vague."
      },
      {
        id: "q2",
        type: "mcq",
        question: "A robot is told: \"Pick up the ball.\" What must be true for this instruction to work?",
        options: [
          "The robot must feel motivated",
          "The robot must know where the ball is",
          "The ball must be blue",
          "The instruction must be in a language the robot likes"
        ],
        correct: 1,
        explanation: "Instructions only work if the computer or robot has all the context it needs. Without knowing where the ball is, 'pick it up' is incomplete."
      },
      {
        id: "q3",
        type: "truefalse",
        question: "A computer can figure out what you mean even if your instruction is unclear.",
        correct: false,
        explanation: "Computers do exactly what they're told — nothing more. They cannot guess intent. If an instruction is ambiguous, the program will either crash or produce wrong output."
      },
      {
        id: "q4",
        type: "mcq",
        question: "Which word best describes how a computer executes instructions?",
        options: ["Creatively", "Literally", "Randomly", "Emotionally"],
        correct: 1,
        explanation: "Computers are perfectly literal. They execute instructions exactly as written, which is why precision in programming is so important."
      }
    ]
  },

  "u1-l2": {
    lessonTitle: "Order Matters",
    intro: "The sequence of instructions determines the result. Changing the order — even slightly — can lead to completely different outcomes.",
    concept: "Imagine making a sandwich: bread → filling → bread. If you put the filling first, you don't get a sandwich. Order is everything.",
    questions: [
      {
        id: "q1",
        type: "order",
        question: "Put these steps in the correct order to make toast:",
        items: ["Put bread in toaster", "Press the lever down", "Wait for toast to pop up", "Butter the toast", "Eat!"],
        correct: [0, 1, 2, 3, 4],
        explanation: "Each step depends on the previous one. You can't butter toast that hasn't been made yet!"
      },
      {
        id: "q2",
        type: "mcq",
        question: "A program runs these steps: (1) Print result, (2) Calculate result. What will happen?",
        options: [
          "It prints the correct result",
          "It prints nothing or an error — result hasn't been calculated yet",
          "It skips step 1",
          "It runs fine because computers can reorder automatically"
        ],
        correct: 1,
        explanation: "Computers run instructions in the order given. Printing before calculating means there's nothing to print yet."
      },
      {
        id: "q3",
        type: "mcq",
        question: "Steps A → B → C produce result X. If you run B → A → C, you will get:",
        options: ["Result X (same)", "A different result or error", "Nothing at all", "Result X but slower"],
        correct: 1,
        explanation: "Changing the order changes the result. Sequence is fundamental to how programs work."
      },
      {
        id: "q4",
        type: "truefalse",
        question: "In programming, the order of instructions never affects the final output.",
        correct: false,
        explanation: "Order almost always matters. Reading a file before opening it, or printing before calculating — all cause errors or wrong results."
      }
    ]
  },

  "u1-l3": {
    lessonTitle: "Missing Steps",
    intro: "A program fails when required steps are left out. Computers don't fill in gaps — they only do what they're told.",
    concept: "If a recipe says 'bake the cake' but never says 'preheat the oven,' the cake won't bake. Missing steps break everything downstream.",
    questions: [
      {
        id: "q1",
        type: "mcq",
        question: "A robot needs to go from Room A to Room B through a door. The instructions say: (1) Walk to the door, (2) Walk into Room B. What's missing?",
        options: ["Turn on the lights", "Open the door", "Say hello to Room B", "Look at the door"],
        correct: 1,
        explanation: "The robot will walk into a closed door! The step 'Open the door' is missing. Computers don't infer obvious steps."
      },
      {
        id: "q2",
        type: "truefalse",
        question: "If a step is obvious to humans, a computer will automatically perform it even if it's not written.",
        correct: false,
        explanation: "Computers have zero common sense. Every step must be explicitly stated, no matter how obvious it seems to humans."
      },
      {
        id: "q3",
        type: "mcq",
        question: "A program to calculate a student's grade is missing the step 'Read the student's score.' What will happen?",
        options: [
          "It calculates using 0 or crashes",
          "It asks the teacher",
          "It guesses the score",
          "It calculates correctly anyway"
        ],
        correct: 0,
        explanation: "Without reading the score, there's no data to work with. The program either crashes or uses a default value like 0."
      },
      {
        id: "q4",
        type: "mcq",
        question: "Which of these instruction sets is complete for boiling water?",
        options: [
          "Fill pot → boil water → done",
          "Fill pot with water → place on stove → turn on heat → wait for boil → done",
          "Get water → done",
          "Turn on stove → done"
        ],
        correct: 1,
        explanation: "Every step is needed: get the pot, fill it, place it, heat it, then wait. Skipping any step makes the process fail."
      }
    ]
  },

  "u1-l4": {
    lessonTitle: "Exact Instructions",
    intro: "Vague instructions produce unpredictable results. Computers need exact, specific commands — no room for interpretation.",
    concept: "If you tell a robot 'walk a bit forward,' it doesn't know how far. Say '3 steps forward' and it knows exactly what to do.",
    questions: [
      {
        id: "q1",
        type: "mcq",
        question: "Which instruction is most precise for a robot?",
        options: [
          "Move forward a little",
          "Move forward quickly",
          "Move forward 50 centimeters",
          "Move forward until it feels right"
        ],
        correct: 2,
        explanation: "'50 centimeters' is an exact measurement. Words like 'a little,' 'quickly,' or 'feels right' are subjective and meaningless to a computer."
      },
      {
        id: "q2",
        type: "mcq",
        question: "You tell a program: 'Store a big number.' What problem does this cause?",
        options: [
          "The program stores the number correctly",
          "The program doesn't know what 'big' means and may fail",
          "The program stores the number but prints it small",
          "Nothing — computers understand adjectives"
        ],
        correct: 1,
        explanation: "Computers need exact values. 'Big' is relative. Is it 100? 1,000,000? Without a specific value, the instruction is meaningless."
      },
      {
        id: "q3",
        type: "truefalse",
        question: "The instruction 'Print the answer' is precise enough for a computer to execute correctly.",
        correct: false,
        explanation: "Which answer? From where? 'Print the value stored in variable X' is precise. 'Print the answer' leaves too much undefined."
      },
      {
        id: "q4",
        type: "mcq",
        question: "A loop instruction says 'repeat a few times.' What should it say instead?",
        options: [
          "Repeat many times",
          "Repeat until done",
          "Repeat exactly 5 times",
          "Repeat as needed"
        ],
        correct: 2,
        explanation: "Loops need a specific count or a precise stopping condition. 'Exactly 5 times' gives the computer a clear target."
      },
      {
        id: "q5",
        type: "mcq",
        question: "Which is a valid, exact instruction for a drawing program?",
        options: [
          "Draw a nice circle somewhere",
          "Draw a circle at position (100, 150) with radius 40",
          "Make a round shape",
          "Draw a circle that looks good"
        ],
        correct: 1,
        explanation: "Exact coordinates and size leave no ambiguity. The computer knows precisely where to draw and how large to make it."
      }
    ]
  },

  "u1-l5": {
    lessonTitle: "Ambiguous Instructions",
    intro: "Ambiguous instructions have more than one valid interpretation. Humans resolve ambiguity using context — computers cannot.",
    concept: "\"Take the first left\" sounds clear to a human. But after how many steps? From which angle? Ambiguity leads to bugs.",
    questions: [
      {
        id: "q1",
        type: "mcq",
        question: "The instruction says 'Remove duplicate items.' List: [1, 2, 2, 3]. Which interpretation is ambiguous?",
        options: [
          "Keep one copy of each item: [1, 2, 3]",
          "Remove ALL copies of any duplicate: [1, 3]",
          "Shuffle the list randomly",
          "Both A and B are valid interpretations of the instruction"
        ],
        correct: 3,
        explanation: "\"Remove duplicates\" could mean keep one copy, or remove all instances. Without clarity, the program could behave in two completely different ways."
      },
      {
        id: "q2",
        type: "truefalse",
        question: "An ambiguous instruction will always cause a computer program to crash.",
        correct: false,
        explanation: "Ambiguous instructions often don't crash — they produce the wrong result silently. This is sometimes worse than a crash, because the bug is harder to spot."
      },
      {
        id: "q3",
        type: "mcq",
        question: "'Sort the list' is ambiguous. What information is missing?",
        options: [
          "The length of the list",
          "Whether to sort ascending or descending, and by what criteria",
          "The color of the items",
          "Nothing — sort is always ascending"
        ],
        correct: 1,
        explanation: "Sorting can be ascending, descending, alphabetical, numerical, by length... Without specifying, the programmer must guess — and may guess wrong."
      },
      {
        id: "q4",
        type: "mcq",
        question: "Which version of the instruction eliminates all ambiguity?",
        options: [
          "Print the number if it's large",
          "Print the number if it is greater than 100",
          "Print the number when appropriate",
          "Print the big numbers"
        ],
        correct: 1,
        explanation: "'Greater than 100' is a clear, testable condition. 'Large,' 'appropriate,' and 'big' are all subjective and ambiguous."
      }
    ]
  },

  "u1-l6": {
    lessonTitle: "Debug the Steps",
    intro: "Debugging means finding and fixing errors in a set of instructions. Bugs can be wrong steps, missing steps, or steps in the wrong order.",
    concept: "A bug isn't always obvious. Sometimes the program runs but gives the wrong answer — that's still a bug!",
    questions: [
      {
        id: "q1",
        type: "mcq",
        question: "A program to find the average of [4, 8, 12] runs:\n1. Add all numbers → 24\n2. Print result\n3. Divide by count (3)\nWhat's wrong?",
        options: [
          "The numbers are wrong",
          "Step 2 (Print) happens before the division — it prints 24 instead of 8",
          "Division by 3 is incorrect",
          "Nothing is wrong"
        ],
        correct: 1,
        explanation: "Printing before dividing prints the sum (24), not the average (8). Steps 2 and 3 need to be swapped."
      },
      {
        id: "q2",
        type: "mcq",
        question: "Which type of bug is hardest to find?",
        options: [
          "A crash bug (program stops running)",
          "A syntax error (program won't start)",
          "A logic bug (program runs but gives wrong answer)",
          "A typo in the code"
        ],
        correct: 2,
        explanation: "Logic bugs are the sneakiest. The program appears to work — but the result is wrong. These require careful thinking to track down."
      },
      {
        id: "q3",
        type: "truefalse",
        question: "If a program doesn't crash, it means there are no bugs in it.",
        correct: false,
        explanation: "A program can run perfectly without crashing and still produce wrong results. Not crashing ≠ correct behavior."
      },
      {
        id: "q4",
        type: "mcq",
        question: "Steps to log into a website:\n1. Enter password\n2. Open website\n3. Enter username\n4. Click login\n\nWhich step is out of order?",
        options: [
          "Step 4 should come first",
          "Steps 2 and 3 — you should open the website before entering credentials, and enter username before password",
          "Step 1 should be last",
          "Nothing is wrong"
        ],
        correct: 1,
        explanation: "Correct order: Open website → Enter username → Enter password → Click login. You must open the site first, and username typically comes before password."
      },
      {
        id: "q5",
        type: "mcq",
        question: "A 'hello world' program prints nothing. What's the most likely bug?",
        options: [
          "The word 'hello' is spelled wrong",
          "The print instruction is missing or commented out",
          "The computer is too slow",
          "The screen is off"
        ],
        correct: 1,
        explanation: "If the print instruction is absent or disabled (commented out), nothing will appear. This is a classic missing-step bug."
      }
    ]
  },

  // ══════════════════════════════════════════════════
  //  UNIT 2 — DECISIONS YES / NO
  // ══════════════════════════════════════════════════

  "u2-l1": {
    lessonTitle: "What Is a Decision?",
    intro: "Decisions allow programs to choose different paths based on conditions. Without decisions, a program would do the exact same thing every time.",
    concept: "Every 'if' statement is a fork in the road. The program checks a condition and goes left or right depending on the answer.",
    questions: [
      {
        id: "q1",
        type: "mcq",
        question: "What does an 'if' statement do in a program?",
        options: [
          "Repeats code multiple times",
          "Stores a value in memory",
          "Runs a block of code only when a condition is true",
          "Prints text to the screen"
        ],
        correct: 2,
        explanation: "An 'if' statement is a conditional — it checks whether something is true, and only runs the attached code if the check passes."
      },
      {
        id: "q2",
        type: "mcq",
        question: "A program checks: 'Is the temperature above 30°C?' If yes, it prints 'Hot!' Without this decision, what would happen?",
        options: [
          "It would never print anything",
          "It would print 'Hot!' all the time, even in winter",
          "It would guess the temperature",
          "It would crash"
        ],
        correct: 1,
        explanation: "Without a conditional, the code runs unconditionally. 'Hot!' would be printed regardless of actual temperature — that's not useful!"
      },
      {
        id: "q3",
        type: "truefalse",
        question: "A decision in programming always has exactly two outcomes: yes or no.",
        correct: false,
        explanation: "Decisions can have many branches: if / else if / else covers multiple conditions. A switch statement can have dozens of cases."
      },
      {
        id: "q4",
        type: "mcq",
        question: "Which real-world system uses decision-making most like a computer?",
        options: [
          "A rock",
          "A traffic light controller that changes based on sensor input",
          "A painting",
          "A book"
        ],
        correct: 1,
        explanation: "A traffic light controller constantly checks sensor conditions (car detected? timer elapsed?) and makes decisions — exactly like a conditional in code."
      }
    ]
  },

  "u2-l2": {
    lessonTitle: "Yes or No Conditions",
    intro: "A condition is a question with a yes (true) or no (false) answer. Programming decisions are built entirely on these binary checks.",
    concept: "Is x > 10? Is the user logged in? Is the list empty? Every one of these is a yes/no question that drives program flow.",
    questions: [
      {
        id: "q1",
        type: "mcq",
        question: "x = 7. What does the condition 'x > 5' evaluate to?",
        options: ["True", "False", "7", "Error"],
        correct: 0,
        explanation: "7 is greater than 5, so 'x > 5' is True. The program would take the 'yes' branch."
      },
      {
        id: "q2",
        type: "mcq",
        question: "Which of these is a valid yes/no condition?",
        options: [
          "What is the user's name?",
          "Calculate the square root",
          "Is the password equal to 'secret123'?",
          "Print the score"
        ],
        correct: 2,
        explanation: "A condition must evaluate to true or false. 'Is the password equal to...' is a yes/no question. The others are commands or open-ended questions."
      },
      {
        id: "q3",
        type: "truefalse",
        question: "The condition '5 == 5' evaluates to True.",
        correct: true,
        explanation: "5 equals 5, so this is True. The '==' operator checks equality and returns a boolean (true/false) value."
      },
      {
        id: "q4",
        type: "mcq",
        question: "score = 45. The condition is: score >= 50. What does this evaluate to?",
        options: ["True", "False", "45", "50"],
        correct: 1,
        explanation: "45 is NOT greater than or equal to 50. So the condition is False. The program would skip the 'if' block."
      },
      {
        id: "q5",
        type: "mcq",
        question: "What's the result of: 'hello' == 'Hello'?",
        options: ["True", "False", "Error", "It depends"],
        correct: 1,
        explanation: "In most programming languages, string comparison is case-sensitive. 'hello' and 'Hello' are different, so the result is False."
      }
    ]
  },

  "u2-l3": {
    lessonTitle: "True or False",
    intro: "Booleans are the simplest data type: they can only be True or False. All conditions in programming ultimately produce a boolean value.",
    concept: "Named after mathematician George Boole, booleans are the backbone of all decision-making in computing.",
    questions: [
      {
        id: "q1",
        type: "mcq",
        question: "What are the only two values a boolean can hold?",
        options: ["0 and 1", "Yes and No", "True and False", "On and Off"],
        correct: 2,
        explanation: "Booleans are True or False. While 0/1 and on/off are conceptually similar, in programming the formal boolean values are True and False."
      },
      {
        id: "q2",
        type: "mcq",
        question: "What does 'NOT True' evaluate to?",
        options: ["True", "False", "Null", "Error"],
        correct: 1,
        explanation: "The NOT operator flips a boolean. NOT True = False. NOT False = True."
      },
      {
        id: "q3",
        type: "mcq",
        question: "True AND False = ?",
        options: ["True", "False", "True AND False", "Undefined"],
        correct: 1,
        explanation: "AND requires BOTH sides to be True. Since one side is False, the result is False. Think of it as: both conditions must pass."
      },
      {
        id: "q4",
        type: "mcq",
        question: "True OR False = ?",
        options: ["True", "False", "Undefined", "Error"],
        correct: 0,
        explanation: "OR only needs ONE side to be True. Since True is on the left, the result is True. At least one condition must pass."
      },
      {
        id: "q5",
        type: "truefalse",
        question: "False OR False evaluates to True.",
        correct: false,
        explanation: "OR returns True only if at least one side is True. False OR False has no True side, so the result is False."
      }
    ]
  },

  "u2-l4": {
    lessonTitle: "When Condition Fails",
    intro: "The 'else' clause handles what happens when a condition is False. Good programs always consider both outcomes of a decision.",
    concept: "A one-sided decision is incomplete. What if it rains and you don't have an umbrella plan? 'else' is your backup plan.",
    questions: [
      {
        id: "q1",
        type: "mcq",
        question: "What does 'else' do in an if-else statement?",
        options: [
          "Runs if the if-condition is True",
          "Runs if the if-condition is False",
          "Skips the entire block",
          "Repeats the if-condition"
        ],
        correct: 1,
        explanation: "'else' is the fallback — it executes when the 'if' condition is not met (False). Together, if-else covers all possible cases."
      },
      {
        id: "q2",
        type: "mcq",
        question: "age = 15. Code: if age >= 18: print('Adult') else: print('Minor'). What prints?",
        options: ["Adult", "Minor", "Nothing", "Error"],
        correct: 1,
        explanation: "15 is less than 18, so 'age >= 18' is False. The else branch runs, printing 'Minor'."
      },
      {
        id: "q3",
        type: "truefalse",
        question: "An 'if' statement without an 'else' is always a bug.",
        correct: false,
        explanation: "Not every if needs an else. Sometimes you only want to do something when a condition is true, and nothing otherwise — that's perfectly valid."
      },
      {
        id: "q4",
        type: "mcq",
        question: "A login system: if password correct → grant access, else → ?",
        options: [
          "Do nothing",
          "Grant access anyway",
          "Show error and deny access",
          "Delete the account"
        ],
        correct: 2,
        explanation: "The else branch should always deny access and inform the user. Silently doing nothing would be a security and UX failure."
      }
    ]
  },

  "u2-l5": {
    lessonTitle: "Multiple Decisions",
    intro: "Real programs often need to check multiple conditions. 'else if' (or 'elif') lets you chain conditions to handle many cases.",
    concept: "A grade system has many outcomes: A, B, C, D, F. You need multiple conditions to cover every possibility.",
    questions: [
      {
        id: "q1",
        type: "mcq",
        question: "score = 75. Conditions: if score >= 90 → 'A', elif score >= 80 → 'B', elif score >= 70 → 'C', else → 'F'. What grade?",
        options: ["A", "B", "C", "F"],
        correct: 2,
        explanation: "75 fails the first two checks (not ≥90, not ≥80) but passes 'score >= 70', so the output is 'C'."
      },
      {
        id: "q2",
        type: "mcq",
        question: "How does Python's 'elif' differ from a new 'if' statement?",
        options: [
          "They are identical",
          "'elif' only runs if the previous 'if' was False; a new 'if' always checks independently",
          "'elif' is faster",
          "'elif' can only have one condition"
        ],
        correct: 1,
        explanation: "'elif' is part of the same chain — it's skipped if a previous condition was True. A new 'if' always evaluates, regardless of what came before."
      },
      {
        id: "q3",
        type: "truefalse",
        question: "In an if/elif/else chain, multiple branches can execute for the same input.",
        correct: false,
        explanation: "In an if/elif/else chain, exactly one branch executes. Once a true condition is found, the rest are skipped."
      },
      {
        id: "q4",
        type: "mcq",
        question: "You want different messages for temperatures: freezing (<0), cold (0–15), warm (16–25), hot (>25). How many conditions do you need?",
        options: ["1", "2", "3", "4"],
        correct: 2,
        explanation: "You need 3 explicit conditions. The 4th case (hot) can be the final 'else' — it catches everything that didn't match the first 3."
      }
    ]
  },

  "u2-l6": {
    lessonTitle: "Debug the Decision",
    intro: "Bugs in conditional logic are extremely common. Off-by-one errors, wrong operators, and inverted conditions can all cause silent failures.",
    concept: "The condition 'if x > 10' and 'if x >= 10' behave differently when x is exactly 10. One character makes all the difference!",
    questions: [
      {
        id: "q1",
        type: "mcq",
        question: "A discount applies for orders over £50. The condition is: if total > 50. An order of exactly £50 — does it get a discount?",
        options: ["Yes", "No", "Maybe", "Error"],
        correct: 1,
        explanation: "'total > 50' is False when total equals 50. To include £50, the condition should be 'total >= 50' (greater than OR equal to)."
      },
      {
        id: "q2",
        type: "mcq",
        question: "Code: if x = 5: print('yes'). What's wrong?",
        options: [
          "Nothing is wrong",
          "'=' is assignment, not comparison. Should be '=='",
          "The print statement is wrong",
          "x must be defined first"
        ],
        correct: 1,
        explanation: "In most languages, '=' assigns a value and '==' compares values. Using '=' in a condition is a common bug — it tries to assign inside a comparison."
      },
      {
        id: "q3",
        type: "truefalse",
        question: "Inverting a condition (using NOT) can sometimes fix a logic bug.",
        correct: true,
        explanation: "Yes! A common bug is using the wrong condition direction. Adding NOT (or flipping > to <) can correct inverted logic."
      },
      {
        id: "q4",
        type: "mcq",
        question: "Code: if isLoggedIn == False: showDashboard(). What's the bug?",
        options: [
          "No bug — it's correct",
          "showDashboard() should run when isLoggedIn is True, not False",
          "isLoggedIn should be a number",
          "The function name is wrong"
        ],
        correct: 1,
        explanation: "The logic is inverted! The dashboard should show when the user IS logged in (True), not when they're logged out (False)."
      }
    ]
  },

  // ══════════════════════════════════════════════════
  //  UNIT 3 — PATTERNS & REPETITION
  // ══════════════════════════════════════════════════

  "u3-l1": {
    lessonTitle: "What Is a Pattern?",
    intro: "A pattern is a rule that repeats. Computers are excellent at recognizing, generating, and exploiting patterns — it's fundamental to how algorithms work.",
    concept: "Patterns let us predict what comes next, compress information, and write shorter code. Spotting them is a core programming skill.",
    questions: [
      {
        id: "q1",
        type: "mcq",
        question: "Sequence: 2, 4, 6, 8, ?. What comes next?",
        options: ["9", "10", "12", "16"],
        correct: 1,
        explanation: "Each number increases by 2. This is an arithmetic sequence with a common difference of 2. The next term is 8 + 2 = 10."
      },
      {
        id: "q2",
        type: "mcq",
        question: "Sequence: 1, 3, 9, 27, ?. What's the pattern?",
        options: [
          "Add 2 each time",
          "Multiply by 3 each time",
          "Add the previous two numbers",
          "Subtract 1 each time"
        ],
        correct: 1,
        explanation: "1×3=3, 3×3=9, 9×3=27. This is a geometric sequence — each term is multiplied by 3. The next term is 27×3 = 81."
      },
      {
        id: "q3",
        type: "mcq",
        question: "Why are patterns important in programming?",
        options: [
          "They make code look prettier",
          "They let us write code once and reuse it for repeating tasks",
          "They slow down computers",
          "They only matter in math"
        ],
        correct: 1,
        explanation: "Recognizing patterns lets programmers write loops and functions — write the logic once and apply it to many inputs. This is the DRY principle: Don't Repeat Yourself."
      },
      {
        id: "q4",
        type: "truefalse",
        question: "A pattern must always involve numbers.",
        correct: false,
        explanation: "Patterns can be in shapes, colors, text, behavior — anything. In programming, we see patterns in data structures, function calls, error types, and more."
      }
    ]
  },

  "u3-l2": {
    lessonTitle: "Spot the Next Step",
    intro: "Predicting the next element in a sequence trains your mind to think algorithmically — to see the rule behind the data.",
    concept: "Every sequence has a generator: a rule that produces each term from the previous one. Find the rule, and you can predict infinitely.",
    questions: [
      {
        id: "q1",
        type: "mcq",
        question: "1, 1, 2, 3, 5, 8, ?. What comes next?",
        options: ["10", "11", "13", "16"],
        correct: 2,
        explanation: "This is the Fibonacci sequence! Each number is the sum of the two before it: 5+8=13. It appears throughout nature and computer science."
      },
      {
        id: "q2",
        type: "mcq",
        question: "Pattern: 🔴🔵🔴🔵🔴?. What comes next?",
        options: ["🔴", "🔵", "🟡", "🟢"],
        correct: 1,
        explanation: "The pattern alternates: Red, Blue, Red, Blue... After the last Red, the next must be Blue."
      },
      {
        id: "q3",
        type: "mcq",
        question: "Sequence: 100, 50, 25, 12.5, ?",
        options: ["6", "6.25", "10", "0"],
        correct: 1,
        explanation: "Each term is halved: 100÷2=50, 50÷2=25, 25÷2=12.5, 12.5÷2=6.25. This is a geometric sequence dividing by 2."
      },
      {
        id: "q4",
        type: "truefalse",
        question: "The sequence 1, 4, 9, 16, 25 is the sequence of perfect squares.",
        correct: true,
        explanation: "1²=1, 2²=4, 3²=9, 4²=16, 5²=25. Yes — these are perfect squares! The next term would be 6²=36."
      }
    ]
  },

  "u3-l3": {
    lessonTitle: "Repeating Actions",
    intro: "Loops let computers repeat actions without the programmer writing the same code over and over. This is one of the most powerful ideas in computing.",
    concept: "Instead of writing 'print 1, print 2, print 3... print 100,' a loop says 'for each number from 1 to 100, print it.' One line, infinite power.",
    questions: [
      {
        id: "q1",
        type: "mcq",
        question: "What is the main purpose of a loop in programming?",
        options: [
          "To make the code look longer",
          "To execute a block of code multiple times without rewriting it",
          "To store data in memory",
          "To connect to the internet"
        ],
        correct: 1,
        explanation: "Loops are about repetition efficiency. Write the logic once; tell the computer how many times to run it. This is fundamental to nearly every program."
      },
      {
        id: "q2",
        type: "mcq",
        question: "A 'for' loop runs from i=1 to i=5, printing i each time. What does it print?",
        options: ["1 2 3 4 5", "0 1 2 3 4", "1 2 3 4", "5 4 3 2 1"],
        correct: 0,
        explanation: "The loop starts at 1 and goes through 5, printing each value. Output: 1 2 3 4 5."
      },
      {
        id: "q3",
        type: "mcq",
        question: "Which situation is best solved with a loop?",
        options: [
          "Print one greeting message",
          "Calculate the sum of 1000 numbers",
          "Store a single user's name",
          "Open a file once"
        ],
        correct: 1,
        explanation: "Summing 1000 numbers requires doing the same addition step 1000 times — perfect for a loop. Writing 1000 addition lines would be impractical."
      },
      {
        id: "q4",
        type: "truefalse",
        question: "A loop that never stops is called an infinite loop, and it's always a bug.",
        correct: false,
        explanation: "Some programs intentionally use infinite loops — like a web server that keeps listening for requests. The key is having a way to exit or control them properly."
      }
    ]
  },

  "u3-l4": {
    lessonTitle: "Count the Repetition",
    intro: "Controlling exactly how many times a loop runs is critical. Too few iterations misses data; too many wastes resources or causes errors.",
    concept: "Loop counters, indices, and stopping conditions must be carefully chosen. An off-by-one error is the most common loop bug.",
    questions: [
      {
        id: "q1",
        type: "mcq",
        question: "A loop runs while i < 5, starting at i=0. How many times does it run?",
        options: ["4", "5", "6", "3"],
        correct: 1,
        explanation: "i takes values 0, 1, 2, 3, 4 — that's 5 iterations. When i reaches 5, the condition 'i < 5' becomes False and the loop stops."
      },
      {
        id: "q2",
        type: "mcq",
        question: "You want to process a list of 10 items (indices 0-9). Your loop runs from i=1 to i=10. What bug might occur?",
        options: [
          "The loop runs perfectly",
          "It skips the first item (index 0) and may crash trying to access index 10",
          "It runs twice as many times",
          "It processes items in reverse"
        ],
        correct: 1,
        explanation: "Off-by-one error! Starting at 1 misses index 0 (the first item). Ending at 10 tries to access an item that doesn't exist — likely causing a crash."
      },
      {
        id: "q3",
        type: "truefalse",
        question: "A loop that runs 0 times is always a bug.",
        correct: false,
        explanation: "Sometimes a loop correctly runs 0 times — for example, when processing an empty list. The loop body simply never executes, which can be perfectly valid."
      },
      {
        id: "q4",
        type: "mcq",
        question: "You need to print every even number from 2 to 20. How many times should the loop run?",
        options: ["10", "20", "9", "11"],
        correct: 0,
        explanation: "Even numbers from 2 to 20: 2, 4, 6, 8, 10, 12, 14, 16, 18, 20. That's 10 numbers, so the loop runs 10 times."
      }
    ]
  },

  "u3-l5": {
    lessonTitle: "Better Solution",
    intro: "Loops aren't just about repetition — they're about efficiency. A good programmer asks: is there a smarter way to solve this?",
    concept: "Sometimes a loop with 1 million iterations can be replaced by a single formula. Finding that formula is what separates good programmers from great ones.",
    questions: [
      {
        id: "q1",
        type: "mcq",
        question: "To sum numbers 1 to 100, you could use a loop OR the formula n(n+1)/2. What's 100×101/2?",
        options: ["4500", "5000", "5050", "10000"],
        correct: 2,
        explanation: "100×101/2 = 10100/2 = 5050. This formula, discovered by Gauss at age 10, computes the sum instantly — no loop needed!"
      },
      {
        id: "q2",
        type: "mcq",
        question: "Which is more efficient for finding whether a number N is prime?",
        options: [
          "Check all numbers from 2 to N",
          "Check all numbers from 2 to √N",
          "Check all even numbers only",
          "Always say 'not prime'"
        ],
        correct: 1,
        explanation: "You only need to check up to √N. If N has a factor larger than √N, its paired factor would be smaller than √N and already found. This dramatically reduces work."
      },
      {
        id: "q3",
        type: "truefalse",
        question: "A solution that uses fewer lines of code is always better.",
        correct: false,
        explanation: "Fewer lines doesn't mean better. Code should be readable, correct, and efficient. A 'clever' one-liner that's unreadable or slower is worse than clear, longer code."
      },
      {
        id: "q4",
        type: "mcq",
        question: "What does 'time complexity' measure?",
        options: [
          "How long a programmer takes to write code",
          "How the time to run a program grows as input size increases",
          "The time zone the program runs in",
          "How many lines of code are in the program"
        ],
        correct: 1,
        explanation: "Time complexity describes how performance scales. An O(n²) algorithm gets 4× slower when input doubles — an O(n) algorithm only gets 2× slower."
      }
    ]
  },

  "u3-l6": {
    lessonTitle: "Debug the Pattern",
    intro: "Pattern bugs are subtle — a loop runs almost correctly, producing results that look right but are slightly off. Attention to detail is essential.",
    concept: "Off-by-one, wrong step size, incorrect starting value — these small errors compound across thousands of loop iterations.",
    questions: [
      {
        id: "q1",
        type: "mcq",
        question: "Code prints: 1, 3, 5, 7, 9, 11. Goal was 1–10 (odd only). What's the bug?",
        options: [
          "No bug — it printed all odd numbers up to 11",
          "The loop didn't stop at 10 — it printed 11 which is > 10",
          "The step size is wrong",
          "It should start at 0"
        ],
        correct: 1,
        explanation: "The stopping condition allows 11 to be printed. The loop should stop when the value would exceed 10, not at or after 10."
      },
      {
        id: "q2",
        type: "mcq",
        question: "A loop generates: 0, 2, 4, 6... instead of 1, 3, 5, 7.... What's wrong?",
        options: [
          "The step is wrong (should be 3, not 2)",
          "The starting value is 0 instead of 1",
          "The loop runs backwards",
          "Nothing is wrong"
        ],
        correct: 1,
        explanation: "Starting at 0 with a step of 2 gives even numbers. To get odd numbers (1, 3, 5...), start at 1 with the same step of 2."
      },
      {
        id: "q3",
        type: "truefalse",
        question: "If a loop produces 99 items when 100 were expected, this is called an off-by-one error.",
        correct: true,
        explanation: "Classic off-by-one! Using < instead of <=, or starting at 1 instead of 0, often produces one fewer iteration than intended."
      },
      {
        id: "q4",
        type: "mcq",
        question: "Sum loop bug: total starts at 1 (instead of 0), then adds each number. Result for [2,3,4] is 10 instead of 9. Fix?",
        options: [
          "Change the numbers in the list",
          "Initialize total to 0, not 1",
          "Add 1 fewer number",
          "Run the loop one extra time"
        ],
        correct: 1,
        explanation: "Accumulator variables (like sum totals) should always start at 0 (or the identity value for the operation). Starting at 1 adds a phantom 1 to every result."
      }
    ]
  }
};
