# DATE AND TIME

JavaScript **Date** objects represent a single moment in time in a platform-independent format. **Date** objects contain a **Number** that represents milliseconds since _1 January 1970_ UTC.

## EXAMPLES

### HOW TO CREATE DATE OBJECTS

```javascript
let today = new Date();
let birthday = new Date('December 17, 1995 03:24:00');
let birthday = new Date('1995-12-17T03:24:00');
let birthday = new Date(1995, 11, 17); // the month is 0-indexed
let birthday = new Date(1995, 11, 17, 3, 24, 0);
let birthday = new Date(628021800000);
```

### DAY MONTH YEAR... EXTRACTION

```javascript
const future = new Date(2037, 0, 19, 15, 23);
console.log(future); // complete date object

console.log(future.getFullYear()); // 2037
console.log(future.getMonth()); // 0 = January as date in javascript is 0 indexed
console.log(future.getDay()); // 1
console.log(future.getHours()); // 15
console.log(future.getMinutes()); // 23
console.log(future.getSeconds()); // 0
console.log(future.toISOString()); // 2037-01-19T09:53:00.000Z
console.log(future.getTime()); // 2115971580000
```

### INTERNALIZATION

```javascript
new Intl.DateTimeFormat('en-US').format(future); // "1/19/2037"
new Intl.DateTimeFormat('en-GB').format(future); // "19/01/2037"
new Intl.DateTimeFormat('de-DE').format(future); // "19.1.2037"

const options = {
	hour: 'numeric',
	minute: 'numeric',
	day: 'numeric',
	month: 'numeric',
	year: 'numeric',
}; // required if want to print other details
new Intl.DateTimeFormat('en-US', options).format(future); // "1/19/2037, 3:23 PM"
new Intl.DateTimeFormat('en-GB', options).format(future); // "19/01/2037, 15:23"
```
