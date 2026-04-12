// Calculator Operations for Browser Console

// Addition
function add(a, b) {
    if (typeof a !== 'number' || typeof b !== 'number') return "Please provide valid numbers";
    return a + b;
}

// Subtraction
function subtract(a, b) {
    if (typeof a !== 'number' || typeof b !== 'number') return "Please provide valid numbers";
    return a - b;
}

// Multiplication
function multiply(a, b) {
    if (typeof a !== 'number' || typeof b !== 'number') return "Please provide valid numbers";
    return a * b;
}

// Division
function divide(a, b) {
    if (typeof a !== 'number' || typeof b !== 'number') return "Please provide valid numbers";
    if (b === 0) return "Error: Cannot divide by zero";
    return a / b;
}

// Modulus (Remainder)
function modulus(a, b) {
    if (typeof a !== 'number' || typeof b !== 'number') return "Please provide valid numbers";
    if (b === 0) return "Error: Cannot divide by zero";
    return a % b;
}

// Exponentiation (Power)
function power(base, exponent) {
    if (typeof base !== 'number' || typeof exponent !== 'number') return "Please provide valid numbers";
    return Math.pow(base, exponent);
}

// Instructions for the user printed directly to the console
console.log("%c🖩 Calculator Loaded Successfully!", "color: #3498db; font-size: 20px; font-weight: bold;");
console.log("%cHere are the available functions you can use:", "font-size: 14px; font-weight: bold;");
console.log("➕ add(a, b)        : Add two numbers");
console.log("➖ subtract(a, b)   : Subtract b from a");
console.log("✖️ multiply(a, b)   : Multiply a and b");
console.log("➗ divide(a, b)     : Divide a by b");
console.log("🔢 modulus(a, b)    : Remainder of a divided by b");
console.log(" power(base, exp) : Raise base to the power of exp");
console.log("");
console.log("%cTry it out! Type something like: %cadd(15, 27)", "font-size: 14px", "font-family: monospace; font-size: 14px; font-weight: bold; color: #e74c3c;");
