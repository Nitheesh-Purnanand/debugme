import dotenv from "dotenv";
import {connectdb} from "./src/lib/db.js"
import Problem from "./src/models/problem.model.js";

dotenv.config();
console.log("MONGODB_URI =", process.env.MONGODB_URI); // Debug

const seedProblems = [
  {
    title: "Palindrome Check",
    description: "The function should check if a string is a palindrome, ignoring case. But it's returning false for some valid inputs.",
    difficulty: "Easy",
    language: "javascript",
    starterCode: `function isPalindrome(str) {
  return str === str.reverse();
}`,
    testCases: [
      { input: `isPalindrome("madam")`, expectedOutput: "true" },
      { input: `isPalindrome("RaceCar")`, expectedOutput: "true" },
      { input: `isPalindrome("debug")`, expectedOutput: "false" }
    ]
  },
  {
    title: "Find Missing Number",
    description: "An array contains numbers from 1 to n with one number missing. Fix the function to return the missing number.",
    difficulty: "Medium",
    language: "javascript",
    starterCode: `function findMissing(arr) {
  return arr.length;
}`,
    testCases: [
      { input: `findMissing([1, 2, 4, 5])`, expectedOutput: "3" },
      { input: `findMissing([2, 3, 1, 5])`, expectedOutput: "4" }
    ]
  },
  {
    title: "Get Max in Array",
    description: "The function should return the maximum number in an array, but it's returning the smallest.",
    difficulty: "Easy",
    language: "javascript",
    starterCode: `function getMax(arr) {
  return Math.min(...arr);
}`,
    testCases: [
      { input: `getMax([10, 5, 30])`, expectedOutput: "30" },
      { input: `getMax([-5, -1, -10])`, expectedOutput: "-1" }
    ]
  },
  {
    title: "Fibonacci Number",
    description: "The recursive Fibonacci function is incorrect for n = 0. Fix it to return the correct Fibonacci value.",
    difficulty: "Medium",
    language: "javascript",
    starterCode: `function fibonacci(n) {
  if (n <= 1) return 1;
  return fibonacci(n - 1) + fibonacci(n - 2);
}`,
    testCases: [
      { input: `fibonacci(0)`, expectedOutput: "0" },
      { input: `fibonacci(5)`, expectedOutput: "5" }
    ]
  },
  {
    title: "Count Vowels",
    description: "The function should count vowels in a string, but it's returning the string length instead.",
    difficulty: "Easy",
    language: "javascript",
    starterCode: `function countVowels(str) {
  return str.length;
}`,
    testCases: [
      { input: `countVowels("hello")`, expectedOutput: "2" },
      { input: `countVowels("why")`, expectedOutput: "0" }
    ]
  },
  {
    title: "Check Anagram",
    description: "Fix the function to check whether two strings are anagrams. It's currently only checking equality.",
    difficulty: "Medium",
    language: "javascript",
    starterCode: `function isAnagram(a, b) {
  return a === b;
}`,
    testCases: [
      { input: `isAnagram("listen", "silent")`, expectedOutput: "true" },
      { input: `isAnagram("hello", "world")`, expectedOutput: "false" }
    ]
  },
  {
    title: "Sum of Digits",
    description: "The function should return the sum of all digits in a number, but it's returning the number itself.",
    difficulty: "Easy",
    language: "javascript",
    starterCode: `function sumDigits(n) {
  return n;
}`,
    testCases: [
      { input: `sumDigits(123)`, expectedOutput: "6" },
      { input: `sumDigits(908)`, expectedOutput: "17" }
    ]
  },
  {
    title: "Remove Duplicates",
    description: "The function is supposed to return a new array with duplicates removed, but it's returning the original.",
    difficulty: "Medium",
    language: "javascript",
    starterCode: `function removeDuplicates(arr) {
  return arr;
}`,
    testCases: [
      { input: `removeDuplicates([1, 2, 2, 3])`, expectedOutput: "[1,2,3]" },
      { input: `removeDuplicates([4, 4, 4])`, expectedOutput: "[4]" }
    ]
  },
  {
    title: "Balanced Brackets",
    description: "The function should check if brackets in the string are balanced. Currently it always returns true.",
    difficulty: "Hard",
    language: "javascript",
    starterCode: `function isBalanced(s) {
  return true;
}`,
    testCases: [
      { input: `isBalanced("({[]})")`, expectedOutput: "true" },
      { input: `isBalanced("([)]")`, expectedOutput: "false" }
    ]
  },
  {
    title: "Longest Word in Sentence",
    description: "Fix the function to find and return the longest word from a given sentence. Currently it returns an empty string.",
    difficulty: "Easy",
    language: "javascript",
    starterCode: `function longestWord(sentence) {
  return "";
}`,
    testCases: [
      { input: `longestWord("The quick brown fox")`, expectedOutput: "quick" },
      { input: `longestWord("Jumped over the lazy dog")`, expectedOutput: "Jumped" }
    ]
  }
];




async function insertProblems() {
  try {
    await connectdb();
    await Problem.deleteMany(); // Optional: Clear previous
    await Problem.insertMany(seedProblems);
    console.log("✅ Demo problems inserted successfully");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error inserting problems:", err);
    process.exit(1);
  }
}

insertProblems();
