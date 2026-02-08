// // // --------------------------HTTPS SERVER-----------------------------------------
// // const http = require("http");

// // const server = http.createServer((req, res) => {
// //     res.send("Hello from server")
// // });

// // server.listen(3400, () => {
// //     console.log("Listening on port 3400!!!");

// // })

// // // ----------------------Express Server with Url data fetching---------------------------------------------------
const express = require("express");
const axios = require("axios");

const app = express();

app.get("/fetchdata", async (req, res, next) => {
    const url = req.query.url;
    if(!req.query.url) {
        return res.status(400).json({error:"Url is required"});
    }
    try {
        const response = await axios.get(url)
        res.json(response.data)
    } catch(err) {
        res.status(500).json({err:"unable to fetch url data"})
    }
})

app.use("/", (req, res) => {
    res.send("Hello from server")
})

app.listen(3444, (req, res) => {
    console.log("Listening........!!!");
})

// // ------------------------Event loop example--------------------------
// // const fs = require("fs");

// // // code 1
// // setImmediate(() => {
// //   console.log;
// //   ("setImmediate");
// // });
// // setTimeout(() => {
// //   console.log("settimeout");
// // }, 0);
// // fs.readFile("./file.txt", "utf8", () => {
// //   console.log("file read cb");
// // });
// // Promise.resolve("promise").then(console.log);
// // process.nextTick(() => {
// //   console.log("process.nextTick");
// // });
// // console.log("End of code");

// // code 2
// // setImmediate(() => {
// // console.log("setImmediate");
// // });
// // setTimeout(() => {
// //   console.log("settimeout");
// // }, 0);
// // fs.readFile("./file.txt", "utf8", () => {
// //   setImmediate(() => {
// //     console.log("2nd setImmediate");
// //   });
// //   setTimeout(() => {
// //     console.log("2nd settimeout");
// //   }, 0);
// //   process.nextTick(() => {
// //     console.log(" 2nd process.nextTick");
// //   });
// //   console.log("file read cb");
// // });
// // Promise.resolve("promise").then(console.log);
// // process.nextTick(() => {
// //   console.log("process.nextTick");
// // });
// // console.log("End of code");



// function a() {
//   let x =10;
//   function b(){
//     console.log(x);
//   }
//   b()
// }
// a()

// function a() {
//     let b =10;
//     return function c(){
//         console.log(b)
//     }
// }
// var z = a();
// console.log(z)
// z()


// function a() {
//     var b =10;
//     c()
//     function c(){
//         console.log(b)
//     }
// }
// a();
// console.log(b);


// function x(){
//     var a = 10
//     function y() {
//         var b = 20;
//         function z(){
//             console.log(a,b);
//         }
//         z()
//     }
//     y()
// }
// x()


// function a() {
//     for(let i = 1; i<=5; i++){
//         setTimeout( ()=> {
//         console.log(i)
//     }, i*1000);
//     }
//     console.log("Timer started")
// }
// a()

// function x(y){
//     console.log("x")
//     y()
// }
// x(function y(){
//     console.log("y")
// });

// const arr = [5, 10]

// const output = arr.map((x) => {
//     return x*2
// })
// console.log(output)

// const arr = [1,2,5,8,10]

// const output = arr.filter((x) => {
//     return x%2
// })
// console.log(output)

// const arr = [5, 1, 4, 3]

// const output = arr.reduce((acc, curr) => {
//     acc = acc+curr
//     return acc;
// }, 0)
// console.log(output)


// for(let i=1;i<=5;i++){
//     setTimeout(()=>{
//       console.log(i)  
//     },1000)
// }

// for(var i=1;i<=5;i++){
//      setTimeout(()=>{
//       console.log(i)  
//     },1000)
// }

const a = {
  [1]:"c",
  1:"a",
 "1":"b",
}
console.log(a[1])



// ===================================================================================

// const http = require("http");

// const server = http.createServer((req, res) => {
//     // res.end("Hello World")
//     console.log("Hello World");
// });

// server.listen(3000)


const express = require("express");
const axios = require("axios");

const app = express();

app.use("/fetch", async (req, res) => {
    try{
        const url = req.query.url;
        if(!req.query.url) {
            return res.status(400).json({error:"url is required"})
        }
        try {
            const response = await axios.get(url);
            res.json(response.data);
        } catch(err) {
            res.status(200).json({error:"Unable to fetch url data"})
        }
    } catch (err) {
        res.status(500).json({error: "Internal Server Error"})
    }
} )



app.use("/", (req, res) => {
    res.send("Hello")
})

app.listen(3000, () => {
    console.log("hi");
})