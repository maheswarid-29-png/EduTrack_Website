const http = require("http");

const data = JSON.stringify({
    email: "maheswari@test.com",
    password: "12345"
});

const options = {
    hostname: "localhost",
    port: 5001,
    path: "/api/students/login",
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(data)
    }
};

const request = http.request(options, (response) => {
    let result = "";

    response.on("data", (chunk) => {
        result += chunk;
    });

    response.on("end", () => {
        console.log("Status:", response.statusCode);
        console.log("Response:", result);
    });
});

request.on("error", (error) => {
    console.log("ERROR:", error.message);
});

request.write(data);
request.end();