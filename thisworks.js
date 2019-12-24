
var ipp = require('ipp');
var PDFDocument = require('pdfkit');
var concat = require("concat-stream");
const fetch = require("node-fetch")
var fs = require("fs")

var doc = new PDFDocument({ margin: 0 });
doc.text("WHEEEEEEEEEEEEEEEEEEEE", 100, 100);

doc.pipe(concat(async function (data) {
    const url = 'http://www.africau.edu/images/default/sample.pdf'
    const existingPdfBytes = await fetch(url).then(res => res.buffer())


    console.log(data);

    console.log(existingPdfBytes);
    var printer = ipp.Printer("http://130.65.177.4:631/ipp/print");
    var msg = {
        "operation-attributes-tag": {
            "requesting-user-name": "Bumblebee",
            "job-name": "whatever.pdf",
            "document-format": "application/pdf"
        },
        "job-attributes-tag": {
            "media-col": {
                "media-source": "tray-2"
            }
        }
        , data: existingPdfBytes
    };

    printer.execute("Print-Job", msg, function (err, res) {
        console.log('hi')
        console.log(err);
        console.log(res);
    });
}));
doc.end();