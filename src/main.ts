import { fromEvent, Observable } from "rxjs";
import { throttleTime, map, scan, subscribeOn } from "rxjs/operators";

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

// fromEvent(document, "click")
//   .pipe(
//     throttleTime(1000),
//     map((event) => event.clientX),
//     scan((count, clientX) => count + clientX, 0)
//   )
//   .subscribe((count) => console.log(count));

/**
 *
 * Observable https://rxjs.dev/guide/observable
 * https://www.youtube.com/watch?v=Tux1nhBPl_w&list=PL55RiY5tL51pHpagYcrN9ubNLVXF8rGVi&index=2
 *
 */

const observer = {
  next: (value: any) => {
    console.log(value);
  },
};

fromEvent(button, "click").subscribe(observer);
// const observable = new Observable((subscriber) => {
//   subscriber.next(1);
//   subscriber.next(2);
//   subscriber.next(3);
//   setTimeout(() => {
//     subscriber.next(4);
//     subscriber.complete();
//   }, 1000);
// });

// console.log("just before subscribe");
// observable.subscribe({
//   next(x) {
//     console.log("got value " + x);
//   },
//   error(err) {
//     console.error("something wrong occurred: " + err);
//   },
//   complete() {
//     console.log("done");
//   },
// });
// console.log("just after subscribe");
