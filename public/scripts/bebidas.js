let temp = []

sessionStorage.removeItem('temp')

const loadTemp = function(){
    const tempJSON = sessionStorage.getItem('temp')
    
    if(tempJSON !== null){
        return JSON.parse(tempJSON)
    } else {
        return []
    }
}

const saveTemp = function(){
    sessionStorage.setItem('temp', JSON.stringify(temp))
}

temp = loadTemp()

let pedidos = []

const loadPedidos = function(){
    const pedidosJSON = sessionStorage.getItem('pedidos')
    
    if(pedidosJSON !== null){
        return JSON.parse(pedidosJSON)
    } else {
        return []
    }
}

const savePedidos = function(){
    sessionStorage.setItem('pedidos', JSON.stringify(pedidos))
}

pedidos = loadPedidos()

//tabela do menu

const addItemTbl = function (){
    const tabela = document.createElement('table')
    document.querySelector('#docBebidas').appendChild(tabela)
    
    //header da tabela
    
    const tdQT = document.createElement('th')
    tdQT.textContent = 'QTD'
    document.querySelector('table').appendChild(tdQT)
    
    const tdItem2 = document.createElement('th')
    tdItem2.textContent = 'ITEM'
    document.querySelector('table').appendChild(tdItem2)
    
    const tdPRC = document.createElement('th')
    tdPRC.textContent = 'PREÇO'
    document.querySelector('table').appendChild(tdPRC)
    
    const tdpede = document.createElement('th')
    tdpede.textContent = 'PEDIR'
    document.querySelector('table').appendChild(tdpede)
}

const addElementsBebidas = (lanche) => {
    const divMain = document.createElement('div')
    const titulo = document.createElement('p')
    const descrito = document.createElement('p')
    const imagem = document.createElement('img')
    const select = document.createElement('select')
    const opt = document.createElement('option')
    const opt2 = document.createElement('option')
    const opt3 = document.createElement('option')
    const subValor = document.createElement('div')
    const btn = document.createElement('button')

    divMain.setAttribute('class', 'container')
    
    titulo.textContent = lanche.product
    titulo.setAttribute('class', 'tituloHamburguer')
    descrito.textContent = lanche.description
    descrito.setAttribute('class', 'descricaoHamburguer descricaoBebida')
    imagem.setAttribute('src', `/products/${lanche._id}/image`)
    imagem.setAttribute('class', 'hamburguerFoto')
    opt.textContent = 1
    opt.setAttribute('value', '1')
    opt2.textContent = 2
    opt2.setAttribute('value', '2')
    opt3.textContent = 3
    opt3.setAttribute('value', '3')
    subValor.setAttribute('class', 'subtotalValor')
    subValor.textContent = 'R$ ' + lanche.price.toFixed(2).replace('.', ',')
    btn.textContent = 'PEDIR'
    btn.setAttribute('class', 'btnPedir')
    
    
    divMain.appendChild(titulo)
    divMain.appendChild(descrito)
    divMain.appendChild(imagem)
    divMain.appendChild(select)
    select.appendChild(opt)
    select.appendChild(opt2)
    select.appendChild(opt3)
    divMain.appendChild(subValor)
    divMain.appendChild(btn)

    select.addEventListener('change', (e) => {
        const abc = e.target.value * lanche.price
        subValor.textContent = 'R$ ' + abc.toFixed(2).replace('.', ',')
        subValor.setAttribute('style', 'color: yellow;')        
    })
    
    
    btn.addEventListener('click', () => {
        const qt = parseFloat(select.value)
        const prodt = lanche.product
        const price = lanche.price
        const tp = lanche.category

        if(lanche.category === 'milkshake' || lanche.category === 'suco'){
            temp.push({qt, prodt, price, tp, img})
            saveTemp()
            location.assign('conftemp')
        }else{
            pedidos.push({
                qtd: qt, 
                product: prodt,
                price: price, 
                categoria: tp,
                subt: qt * price
            })
            savePedidos()
            location.assign('confirma')
        }

        // if(lanche.tipo === 'milkshake' || lanche.tipo === 'suco'){
        //     location.assign('./conftemp.html')
        // }else{
        //     location.assign('./txentrega.html')
        // }

    })

    return divMain
}

fetch('http://localhost:3000/products')
.then((r) => r.json())
.then((data) => data.filter((x) => x.active == true).filter((x) => x.category == 'bebidas').forEach((bebida) => {
    document.querySelector('#docBebidas').appendChild(addElementsBebidas(bebida))
}))

