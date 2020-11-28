# NUMBERS

**Number** is a **primitive wrapper object** [ref](https://developer.mozilla.org/en-US/docs/Glossary/Primitive#Primitive_wrapper_objects_in_JavaScript) used to represent and manipulate numbers like 37 or -9.25.

The **Number** constructor contains constants and methods for working with numbers. Values of other types can be converted to numbers using the **Number()** function.

The JavaScript Number type is a double-precision **64-bit binary format IEEE 754** [ref](https://en.wikipedia.org/wiki/Floating-point_arithmetic) value, like double in Java.

A number literal like _37_ in JavaScript code is a floating-point value, not an integer. There is no separate integer type in common everyday use.

## LITERAL SYNTAX

```javascript
123; // one-hundred twenty-three
123.0; // same
123 === 123.0; // true
```

## FUNCTION SYNTAX

```javascript
Number('123'); // returns the number 123
Number('123') === 123; // true

Number('unicorn'); // NaN
Number(undefined); // NaN
```

## EXAMPLES

### EQUALITY

```javascript
23 === 23.0; // true
0.1 + 0.2 === 0.3; // false
0.1 + 0.2; // 0.30000000000000004
```

### STRINGS TO INTEGER AND PARSING

The **Number.parseInt()** method parses a string argument and returns an integer of the specified radix or base.

```JAVASCRIPT
Number('23')
+'23' // will be numeric 23
+'-23' // will be numeric -23
Number.parseInt(' 0xF', 16) // 15
Number.parseInt(' 011', 2) // 3
Number.parseInt(' 011someRandomString', 2) // 3
```

### CHECK IF VALID NUMBER

The **Number.isNaN()** method determines whether the passed value is _NaN_ and its type is _Number_. It is a more robust version of the original, global _isNaN()_

```javascript
Number.isNaN(NaN); // true
Number.isNaN(Number.NaN); // true
Number.isNaN(0 / 0); // true

// e.g. these would have been true with global isNaN()
Number.isNaN('NaN'); // false
Number.isNaN(undefined); // false
Number.isNaN({}); // false
Number.isNaN('blabla'); // false

// These all return false
Number.isNaN(true);
Number.isNaN(null);
Number.isNaN(37);
Number.isNaN('37');
Number.isNaN('37.37');
Number.isNaN('');
Number.isNaN(' ');
```

### CHECK IF VALID FINITE NUMBER

The Number.isFinite() method determines whether the passed value is a finite number — that is, it checks that a number is neither positive nor negative Infinity, since JavaScript has both.

```javascript
Number.isFinite(Infinity); // false
Number.isFinite(NaN); // false
Number.isFinite(-Infinity); // false

Number.isFinite(0); // true
Number.isFinite(2e64); // true

Number.isFinite('0'); // false, would've been true with
// global isFinite('0')
Number.isFinite(null); // false, would've been true with
// global isFinite(null)
Number.isFinite('some random text'); //false
```
