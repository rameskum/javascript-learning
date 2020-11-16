# CLOSURES

- A closure is the closed-over **variable environment** of the execution context **in which a function was cleated**, even **after** that execution context is gone.

- A closure gives a function access to all the variables **of its parent function**, even **_after_** that parent function has returned. The function keeps a reference to its outer scope, which **_preserves_** the scope chain throughout time.

### EXAMPLES

- Example 1: The carries the parent function variables

  ```javascript
  'use strict';

  let f;

  const a = function () {
  	const a = 23;
  	f = function () {
  		console.log(a * 2);
  	};
  };

  const h = function () {
  	const b = 777;
  	f = function () {
  		console.log(b * 2);
  	};
  };

  g(); // post execution the variable environment of g is no longer there
  f(); // however the function 'f' is able to access variable 'a'
  console.dir(f); // check console for closure of function 'f'

  // reassigned function 'f' by function h
  h();
  f(); // the old closure disappears as the function was reborn
  console.dir(f); // check console for closure of function 'f'
  ```

- Example 2: Closure has a priority over scope chain, even the global variables

  ```javascript
  'use strict';

  const boardingPassengers = function (n, wait) {
  	const perGroup = n / 3;

  	/**
  	 * this callback function used in setTimeout function is
  	 * called completely independent of boardingPassengers function.
  	 * however the function has access to all the variable of boardingPassengers
  	 */
  	setTimeout(function () {
  		console.log(`We are now boarding all ${n} passengers`);
  		console.log(`There are 3 groups, ech with ${perGroup} passengers`);
  	}, wait * 1000);
  	console.log(`Will start boarding in ${wait} seconds.`);
  };

  /**
   * creating a variable which also exists as closure of callback function of setTimeout
   * Ideally if the scope chain wins the 'perGroup' value would be 100 for the callback function
   * however the value is as per the closure values
   */
  let perGroup = 100;
  boardingPassengers(180, 3);
  ```
