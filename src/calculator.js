#!/usr/bin/env node

/**
 * CLI Calculator
 * Supported operations:
 * - add: addition (e.g., node calculator.js add 2 3 => 5)
 * - sub: subtraction (e.g., node calculator.js sub 5 2 => 3)
 * - mul: multiplication (e.g., node calculator.js mul 4 3 => 12)
 * - div: division (e.g., node calculator.js div 6 2 => 3)
 *
 * This script accepts a command followed by one or more numeric operands.
 * It validates input and handles division-by-zero gracefully.
 */

const [,, cmd, ...args] = process.argv;

function printUsage() {
  console.log('Usage: node calculator.js <operation> <num1> <num2> [<num3> ...]');
  console.log('Operations: add, sub, mul, div');
}

function parseNumbers(list) {
  const nums = list.map(s => {
    const n = Number(s);
    return Number.isFinite(n) ? n : NaN;
  });
  return nums;
}

if (!cmd) {
  console.error('Error: missing operation');
  printUsage();
  process.exit(1);
}

if (args.length < 2) {
  console.error('Error: at least two numeric operands are required');
  printUsage();
  process.exit(1);
}

const nums = parseNumbers(args);
if (nums.some(Number.isNaN)) {
  console.error('Error: all operands must be valid numbers');
  process.exit(1);
}

let result;

switch (cmd.toLowerCase()) {
  case 'add':
    // addition
    result = nums.reduce((a,b) => a + b, 0);
    break;
  case 'sub':
    // subtraction
    result = nums.slice(1).reduce((a,b) => a - b, nums[0]);
    break;
  case 'mul':
    // multiplication
    result = nums.reduce((a,b) => a * b, 1);
    break;
  case 'div':
    // division
    if (nums.slice(1).some(n => n === 0)) {
      console.error('Error: division by zero');
      process.exit(1);
    }
    result = nums.slice(1).reduce((a,b) => a / b, nums[0]);
    break;
  case 'help':
  case '--help':
  case '-h':
    printUsage();
    process.exit(0);
  default:
    console.error(`Error: unknown operation '${cmd}'`);
    printUsage();
    process.exit(1);
}

// Print the computed result
if (typeof result === 'number') {
  // Normalize -0 to 0
  if (Object.is(result, -0)) result = 0;
  console.log(result);
} else {
  console.error('Error: computation failed');
  process.exit(1);
}
