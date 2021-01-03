const express = require('express')
const User = require('../models/user')
const Order = require('../models/orders')
const auth = require('../middleware/auth')
const router = new express.Router()

router.get('/', (req, res) => {
    res.render('index',{
        empresa: 'Crispys Crocantes',
        logo: "./images/logo.png"
    })
})

router.get('/cardapio', (req, res) => {
    res.render('cardapio',{
        empresa: 'Crispys Crocantes',
        logo: "./images/logo.png"
    })
})

router.get('/coxinhas', (req, res) => {
    res.render('coxinhas',{
        empresa: 'Crispys Crocantes',
        logo: "./images/logo.png"
    })
})

router.get('/enviapedidos', (req, res) => {
    res.render('enviapedidos',{
        empresa: 'Crispys Crocantes',
        logo: "./images/logo.png"
    })
})

router.get('/conftemp', (req, res) => {
    res.render('conftemp',{
        empresa: 'Crispys Crocantes',
        logo: "./images/logo.png"
    })
})

router.get('/crispys', (req, res) => {
    res.render('crispys',{
        empresa: 'Crispys Crocantes',
        logo: "./images/logo.png"
    })
})

router.get('/seafood', (req, res) => {
    res.render('seafood',{
        empresa: 'Crispys Crocantes',
        logo: "./images/logo.png"
    })
})

router.get('/crepes', (req, res) => {
    res.render('crepes',{
        empresa: 'Crispys Crocantes',
        logo: "./images/logo.png"
    })
})

router.get('/acomp', (req, res) => {
    res.render('acomp',{
        empresa: 'Crispys Crocantes',
        logo: "./images/logo.png"
    })
})

router.get('/bebidas', (req, res) => {
    res.render('bebidas',{
        empresa: 'Crispys Crocantes',
        logo: "./images/logo.png"
    })
})

router.get('/promocoes', (req, res) => {
    res.render('promocoes',{
        empresa: 'Crispys Crocantes',
        logo: "./images/logo.png"
    })
})

router.get('/confirma', (req, res) => {
    res.render('confirma',{
        empresa: 'Crispys Crocantes',
        logo: "./images/logo.png"
    })
})

router.get('/txentrega', (req, res) => {
    res.render('txentrega',{
        empresa: 'Crispys Crocantes',
        logo: "./images/logo.png"
    })
})

router.get('/forms', (req, res) => {
    res.render('forms',{
        empresa: 'Crispys Crocantes',
        logo: "./images/logo.png"
    })
})

router.get('/produtosc', async (req, res) => {
    
    res.render('produtosc',{
        empresa: 'Crispys Crocantes',
        logo: "./images/logo.png"
    })
})

router.get('/confcli', async (req, res) => {
    res.render('confcli',{
        empresa: 'Crispys Crocantes',
        logo: "./images/logo.png"
    })
})

router.get('/3as246a8s43a3a2', async (req, res) => {
    res.render('3as246a8s43a3a2',{
        empresa: 'Crispys Crocantes',
        logo: "./images/logo.png"
    })
})

router.get('/registrar', async (req, res) => {
    res.render('registrar',{
        empresa: 'Crispys Crocantes',
        logo: "./images/logo.png"
    })
})

router.get('/login', async (req, res) => {
    res.render('login',{
        empresa: 'Crispys Crocantes',
        logo: "./images/logo.png"
    })
})

router.get('/dashboard', async (req, res) => {
    res.render('dashboard',{
        empresa: 'Crispys Crocantes',
        logo: "./images/logo.png"
    })
})

router.get('/produtos', async (req, res) => {
    res.render('produtos',{
        empresa: 'Crispys Crocantes',
        logo: "./images/logo.png"
    })
})

router.get('/add-ou-edt', async (req, res) => {
    res.render('add-ou-edt',{
        empresa: 'Crispys Crocantes',
        logo: "./images/logo.png"
    })
})

router.get('/pedidos', async (req, res) => {
    res.render('pedidos',{
        empresa: 'Crispys Crocantes',
        logo: "./images/logo.png"
    })
})

router.post('/signup', async (req, res) => {
    const user = new User(req.body)
    console.log(req.body)
    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201)//.send({user, token})
        res.redirect('login')
    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/users/login', async (req, res) => {
    try{
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        //console.log(req.body)
        res.json({user, data: token, status: 'ok'})
        res.redirect('dashboard')
    }catch(e){
        res.status(400).send()
    }
})

router.post('/users/logout', auth, async (req, res) => {
    try{
        req.user.tokens = req.user.tokens.filter((sessao) => {
            return sessao.token !== req.token
        })

        await req.user.save()
        res.redirect('login')
    }catch(e){
        res.status(500).send(e)
    }
})

router.post('/users/logoutAll', auth, async (req, res) => {
    try{
        req.user.tokens = []
        await req.user.save()
        res.redirect('login')
    }catch(e){
        res.status(500).send(e)
    }
})

router.get('/users/me', auth, async (req, res) => {
    res.json({status: 'ok'})
    res.send(req.user)
})

router.get('/orders', auth, async (req, res) => {
    const pedidos = await Order.find({})
    res.send(pedidos)
})

router.patch('/users/me', auth, async (req, res) => {

    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Mudança inválida' })
    }

    try {
        updates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save()
        res.send(req.user)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/users/me', auth, async (req, res) => {
    try{
        await req.user.remove()
        res.send(req.user)
    }catch(e){
        res.status(500).send()
    }
})

module.exports = router