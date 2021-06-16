const pdf = require('html-pdf');


const pdfCreateToStream = (html,options) => new Promise((resolve,reject) => {
    pdf.create(html,options).toStream((err, stream) => {
        if(err) return reject(err);
        resolve(stream)
    });
})


module.exports = {
    pdfCreateToStream
}