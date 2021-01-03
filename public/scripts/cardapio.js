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

const addElements = (lanche) => {
    const dt = new Date()
    const dia = dt.getDay()

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
    descrito.setAttribute('class', 'descricaoHamburguer')
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
    })

    imagem.addEventListener('click', () => {
        const qt = parseFloat(select.value)
        const prodt = lanche.product
        const price = lanche.price
        const tp = lanche.category
        const img = lanche._id

        if(dia != 4 && lanche.product == 'Dose Dupla - Coxinhas' || dia != 4 && lanche.product == 'Dose Dupla - Asinhas' || dia != 4 && lanche.product == 'Duelo Crispys'){
            alert('Válido apenas nas Quintas')
        }else if(dia != 5 && lanche.product == 'Promoção Dupla Fritas'){
            alert('Válido apenas nas Sextas')
        }else{
            temp.push({qt, prodt, price, tp, img})
            saveTemp()
            location.assign('conftemp')
        }
        
    })
    
     
    btn.addEventListener('click', () => {
        const qt = parseFloat(select.value)
        const prodt = lanche.product
        const price = lanche.price
        const tp = lanche.category
        const img = lanche._id
        if(dia != 4 && lanche.product == 'Dose Dupla - Coxinhas' || dia != 4 && lanche.product == 'Dose Dupla - Asinhas' || dia != 4 && lanche.product == 'Duelo Crispys'){
            alert('Válido apenas nas Quintas')
        }else if(dia != 5 && lanche.product == 'Promoção Dupla Fritas'){
            alert('Válido apenas nas Sextas')
        }else{
            temp.push({qt, prodt, price, tp, img})
            saveTemp()
            location.assign('conftemp')
        }
    })

    return divMain
}


fetch('http://localhost:3000/products')
.then((r) => r.json())
.then((data) => data.filter((x) => x.active == true).filter((x) => x.category == 'asinhas').forEach((lanche) => {
    document.querySelector('#docTable').appendChild(addElements(lanche))
}))
    


document.querySelector('.btn-goBack').addEventListener('click', (e) => {
    e.preventDefault()
    window.history.back()
})