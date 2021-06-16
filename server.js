const path = require('path')
const fastifyStatic = require('fastify-static')
const { pdfCreateToStream } = require('./lib/pdf')


const pdfOptions = {
    format: 'A4',
    //base: "http://localhost:3000",
    orientation: "portrait",
    zoomFactor: "1"
};


const fastify = require('fastify')({ logger: true })

fastify.register(require('fastify-cors'), { origin: '*', credentials: true })
fastify.register(require('fastify-formbody'))

fastify.register(fastifyStatic, {
    root: path.join(__dirname, 'public'),
})


fastify.post('/api/htmlToPdf', async (req, res) => {
    const name = req.body.name || 'generated'
    const html = req.body.html
    const stream = await pdfCreateToStream(html,pdfOptions)

    res.header('Content-Type', 'application/pdf');
    res.header('Content-Disposition', `attachment; filename=${name}.pdf`);

    
    return stream
})


fastify.listen(3000, (err) => {
    if (err) throw err

})