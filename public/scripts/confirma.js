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

/*se der bugs aki, adicionar refresh automatico*/

/*montando a tabela*/
const tabela3 = document.createElement('table')
document.querySelector('#confirmacao').appendChild(tabela3)

//header da tabela

const quantid = document.createElement('th')
quantid.textContent = 'QTD'
document.querySelector('table').appendChild(quantid)

const refere = document.createElement('th')
refere.textContent = 'ITEM'
document.querySelector('table').appendChild(refere)

const unit = document.createElement('th')
unit.textContent = 'PREÇO'
document.querySelector('table').appendChild(unit)

const subt = document.createElement('th')
subt.textContent = 'SUB-T'
document.querySelector('table').appendChild(subt)

const rmv = document.createElement('th')
rmv.textContent = 'REMOVER'
document.querySelector('table').appendChild(rmv)

const incluiNaDom = (item) => {
    const docElement = document.createElement('tr')
    const tdElement6 = document.createElement('td')
    const tdElement7 = document.createElement('td')
    const tdElement8 = document.createElement('td')
    const tdElement9 = document.createElement('td')
    const tdElement10 = document.createElement('td')
    const button = document.createElement('button')    
    const subTotal = item.qtd * item.price
        
    tdElement6.textContent = `${item.qtd}`
    docElement.appendChild(tdElement6)

    tdElement7.setAttribute('class', 'item')
    tdElement7.textContent = `${item.product}`
    docElement.appendChild(tdElement7)

    tdElement8.textContent = `R$${item.price.toFixed(2).replace('.', ',')}`
    docElement.appendChild(tdElement8)

    tdElement9.setAttribute('class', 'subtotal')
    tdElement9.textContent = `${subTotal.toFixed(2)}`
    docElement.appendChild(tdElement9)

    docElement.appendChild(tdElement10)
    button.textContent = 'X'
    tdElement10.appendChild(button)

    button.addEventListener('click', () => {
        const a = pedidos.indexOf(item)
        pedidos.splice(a, 1)
        savePedidos()

        docElement.remove()
        atualizaTotal()
    })
        
    return docElement
}


pedidos.forEach((item) => {
    document.querySelector('table').appendChild(incluiNaDom(item))   
})

/*Rodape*/
const trnew = document.createElement('tr')
document.querySelector('table').appendChild(trnew)


const tdElTotal = document.createElement('td')
tdElTotal.setAttribute('colspan', '4')
tdElTotal.setAttribute('id', 'totalTXT')
tdElTotal.textContent = "TOTAL"
trnew.appendChild(tdElTotal)

const els = document.querySelectorAll('.subtotal')
let somando = 0;
[].forEach.call(els, function(el){
    somando += parseInt(el.textContent);
})

const valorTotal = document.createElement('td')
valorTotal.setAttribute('id', 'total')
trnew.appendChild(valorTotal)

function atualizaTotal () {
    const subtotais = document.querySelectorAll('.subtotal')
    let valoresSub = []
    subtotais.forEach((valor) => {
        const individual = parseFloat(valor.textContent)
        valoresSub.push(individual)
    })

    document.querySelector('#total').textContent = 'R$' + valoresSub.reduce((a, b) => {
        return a + b
    }, 0).toFixed(2).replace('.', ',')
}

atualizaTotal()

const botaoConf = document.querySelector('.btn-comprarMais')
botaoConf.addEventListener('click', () => {
    location.assign('/')
})

const botaoFinaliza = document.querySelector('#finalizarPedido')
botaoFinaliza.addEventListener('click', () => {
    if(pedidos.map((x)=> x.taxa).includes('taxa')){
        location.assign('/forms')
    }else{
        location.assign('/txentrega')
    }
})
