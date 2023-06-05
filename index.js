import { log } from "console";
import { createReadStream, createWriteStream } from "fs"
import { argv } from 'node:process';


let inputFilePath = process.argv[2]
let outputFilePath = process.argv[3]
let operation = process.argv[4]

console.log(inputFilePath);
console.log(outputFilePath);
console.log(operation);

function streamFunc(input, output, operation) {

    const readableStream = createReadStream(input)
    const writableStream = createWriteStream(output)

    if (input && output && operation) {
        switch (operation) {
            case "upperCase":
                readableStream.on("data", (chunk) => {
                    writableStream.write(chunk.toString().toLowerCase())
                    writableStream.on("error", (err) => {
                        console.log(err);
                    })
                    readableStream.on("end", () => {
                        console.log("Data transformed successfully");
                    })
                })
                break;
            case "lowerCase":
                readableStream.on("data", (chunk) => {
                    writableStream.write(chunk.toString().toUpperCase())
                    writableStream.on("error", (err) => {
                        console.log(err);
                    })
                    readableStream.on("end", () => {
                        console.log("Data transformed successfully");
                    })
                })
                break;
            case "reverse":
                readableStream.on("data", (chunk) => {
                    writableStream.write(chunk.toString().split("").reverse().join(""))
                    writableStream.on("error", (err) => {
                        console.log(err);
                    })
                    readableStream.on("end", () => {
                        console.log("Data transformed successfully");
                    })
                })
                break;
            default:
                break;
        }
    } else {
        console.log("One of the arguments missing");
    }
}

streamFunc(inputFilePath, outputFilePath, operation)

