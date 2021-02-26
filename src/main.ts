import { fromEvent, Observable } from "rxjs";
import { throttleTime, map, scan } from "rxjs/operators";

const button = document.querySelector("button");

// fromEvent(button, "click").subscribe((event) => console.log(event));

// Purity
// fromEvent(button, "click")
//   .pipe(scan((count) => count + 1, 0))
//   .subscribe((count) => console.log(`Clicked ${count} times`));

/* 
Flow
 Plain JavaScript
*/

// let count = 0;
// let rate = 1000;
// let lastClick = Date.now() - rate;
// document.addEventListener("click", () => {
//   if (Date.now() - lastClick >= rate) {
//     console.log(`Clicked ${++count} times`);
//     lastClick = Date.now();
//   }
// });
/* 

Flow
 with RxJS
*/
fromEvent(button, "click")
  .pipe(
    throttleTime(1000),
    scan((count) => count + 1, 0)
  )
  .subscribe((count) => console.log(`Clicked ${count} times`));

/*
Values
*/
// let count = 0;
// const rate = 1000;
// let lastClick = Date.now() - rate;
// document.addEventListener("click", (event) => {
//   if (Date.now() - lastClick >= rate) {
//     count += event.clientX;
//     console.log(count);
//     lastClick = Date.now();
//   }
// });

fromEvent(document, "click")
  .pipe(
    throttleTime(1000),
    map((event) => event.clientX),
    scan((count, clientX) => count + clientX, 0)
  )
  .subscribe((count) => console.log(count));
