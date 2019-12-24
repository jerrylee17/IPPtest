var ipp = require("ipp");
var fs = require("fs");
var printer = ipp.Printer("http://130.65.177.4:631/ipp/printer");
var filename = "pizza.txt"
var filedata;

fs.readFile(filename, function (err, data) {
    filedata = data;
})

var msg = {
    "operation-attributes-tag": {
        "requesting-user-name": "John Doe",
        "document-format": "application/txt"
    },
    "job-attributes-tag": {
        "media": "na_letter_8.5x11in"
    },
    data: filedata
};

printer.execute("Print-Job", msg, function (err, res) {
    console.log('hi');
    console.log(err);
    console.log(res);
});