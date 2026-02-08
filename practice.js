// var n = 2
// const square = () => {
//     var sum = n * n
//     console.log(sum)
// }
// square();


// getName();
// console.log(getName)
// // console.log(x);
// var getName = () => {
//     console.log("hello")
// }


// var x = 1
// a()
// function a() {
//     var y = 100;
// }
// console.log(x)
// console.log(y)


// var x = 1
// a()
// function a() {
//     console.log(x)
//     var y = 100
//     function c() {
//         console.log(y)
//         var z = 1000
//         console.log(z)
//     }
//     c()
// } 


// console.log(a)
// var a = 10
// console.log(a)
// var a = 100
// console.log(a)

// {
//     let a = 10
//     var b = 100
//     const c = 30
// }
// console.log(b)


// function x() {
//     var i = 10;
//     setTimeout(function () {
//         console.log(i)
//     }, 3000)
//     console.log('hello')
// }
// x();

// function x() {
//      for(let i = 1; i<=5; i++)
//     setTimeout(function () {
//         console.log(i)
//     }, i*1000)
// }
// x()


// function x(str) {
//     let a = 10
//     function y() {
//         let b = 20
//         console.log(a)
//         function z() {
//           console.log(b, str)
//         }
//         z()
//     }
//     y()
// }
// x("hello")

// function x() {
//     console.log("x")
//     y()
// }
// function y() {
//     console.log("y")
// }
// x(y)


// setTimeout(() => {
//     console.log("step1")
//     setTimeout(() => {
//     console.log("step2")
//     setTimeout(() => {
//     console.log("step3")
//     setTimeout(() => {
//     console.log("step4")
// }, 1000)  
// }, 1000)  
// }, 1000)  
// }, 1000) 

// let promise = new Promise((resolve, reject) => {
//     let success = false
//     setTimeout( ()=> {
//           if(success === true) {
//         resolve("Data fetched")
//     } else {
//         reject("error")
//     }
//     },30000)
// })
// promise
//   .then(console.log)
//   .catch(console.log);




// async function fetchData() {
//     try {
//         const result = await getData();
//         console.log(result);
//     } catch (err) {
//         console.log(err);
//     }
// }

// const getData = () => {
//     return "hi"
// }

// fetchData();
