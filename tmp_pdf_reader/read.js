const fs = require('fs');
const pdf = require('pdf-parse');
let dataBuffer = fs.readFileSync('C:/Users/admin/Downloads/Krishnadeepsinh_Resume_V4 (1).pdf');
pdf(dataBuffer).then(function(data) {
    console.log(data.text);
}).catch(console.error);
