const express = require('express')
const multer = require('multer')
const Order = require('../models/orders')
const Product = require('../models/product')
const router = new express.Router()
let storage = multer.memoryStorage()
let upload = multer({ 
    dest: 'public/images/',
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb){
        if(!file.originalname.match(/.(jpg|jpeg|png)$/)){
            return cb(new Error('Favor inserir uma imagem do tipo: JPG, JPEG ou PNG!'))
        }

        cb(undefined, true)
    },
    storage: storage
})



router.post('/newproduct', async (req, res) => {
    const produto = new Product(req.body)

    try{
        await produto.save()
        res.status(201)//.send(produto)
        res.redirect('produtos')
    }catch(e){
        res.status(400).send(e)
    }
    
})

router.post('/newOrder', async (req, res) => {
    const pedido = new Order(req.body)
    let dt = new Date()
    let dia = dt.getDate()
    let mes = dt.getMonth()
    let horas = dt.getHours()
    let minutos = dt.getMinutes()

    try{
        await pedido.save()
        res.status(201)
        res.redirect(`https://wa.me/558186197535?text=%2ACardapio%20Digital%2A%20%0A%0A%0A%2APedido%20realizado%20em%20${dia}%20%2F%20${mes+1}%20as%20${horas}%3A${minutos}%2A%0A%2ANome%2A%3A%20${req.body.costumer.normalize('NFD').replace(/[\u0300-\u036f]/g, '')}%2C%0A%2ACel%2A%3A%20${req.body.phone}%2C%0A%0A%2ACEP%2A%3A%20${req.body.cep}%2C%0A%2AEndereco%2A%3A%20${req.body.address.normalize('NFD').replace(/[\u0300-\u036f]/g, '')}%2C%20${req.body.numberX}%2C%0A%2ABairro%2A%3A%20${req.body.district.normalize('NFD').replace(/[\u0300-\u036f]/g, '')}%2C%0A%2AP.%20de%20Referencia%2A%3A%20${req.body.refPoint.normalize('NFD').replace(/[\u0300-\u036f]/g, '')}%2C%0A%0A%2APedido%2A%0A${req.body.order.replace('+', 'mais').normalize('NFD').replace(/[\u0300-\u036f]/g, '')}%0A%0A%2AObservacao%2A%3A%20${req.body.obs.normalize('NFD').replace(/[\u0300-\u036f]/g, '')}%2C%0A%2AForma%20de%20Pagamento%2A%3A%20${req.body.payment.normalize('NFD').replace(/[\u0300-\u036f]/g, '')}%2C%0A%2ATroco%2A%3A%20${req.body.change.normalize('NFD').replace(/[\u0300-\u036f]/g, '')}%2C%0A%2AValor%20total%2A%3A%20R$${req.body.price}`)    
    }catch(e){
        res.send('Ocorreu um erro ao salvar o pedido ' + e)
    }
})


router.post('/products/images/:id', upload.single('image'), async (req, res) => {
    const produto = await Product.findById(req.params.id)
    produto.image = req.file.buffer
    await produto.save()
    res.redirect('/add-ou-edt')
})

router.get('/products/:id/image', async (req, res) => {
    try{
        const produto = await Product.findById(req.params.id)
        //console.log(produto)

        if(!produto || !produto.image){
            throw new Error()
        }
        

        res.set('Content-Type', 'image/jpg')
        res.send(produto.image)
    }catch(e){
        res.send(e)
    }
})

router.get('/products', async (req, res) => {
    try{
        const produto = await Product.find({})
        res.send(produto)
    }catch(e){
        res.status(500).send(e)
    }
})

router.get('/products/:id', async (req, res) => {
    try{
        const produto = await Product.findById(req.params.id)

        if(!produto){
            res.status(404).send()
        }

        res.send(produto)
    }catch(e){
        res.status(500).send(e)
    }
})

router.get('/products/a/:id', async (req, res) => {
    const _id = req.params.id
    const updates = Object.keys(req.body)
    const allowedUpdates = ['product', 'description', 'price', 'image', 'category', 'active']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    
    if(!isValidOperation){
        return res.status(404).send()
    }

    try{
        const produto = await Product.findByIdAndUpdate(_id, req.query, {new: true, runValidators: true})

        if(!produto){
            res.status(404).send()
        }
        
        res.redirect('/produtos')
    }catch(e){
        res.status(400).send(e)
    }
})

router.get('/products/d/:id', async (req, res) => {
    
    try{
        const produto = await Product.findByIdAndDelete(req.params.id)
        
        if(!produto){
            res.status(404).send()
        }

        res.redirect('/produtos')
        
    }catch(e){
        res.status(500).send(e)
    }
})


module.exports = router