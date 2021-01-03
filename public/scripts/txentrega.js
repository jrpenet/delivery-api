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

if(pedidos.map((x) => x.taxa).includes('taxa')){
    location.assign('./confirma.html')
}



const tblEl = document.createElement('table')
document.querySelector('#txBairro').appendChild(tblEl)

//header da tabela

const district = document.createElement('th')
district.textContent = 'BAIRRO'
document.querySelector('table').appendChild(district)

const priceEl = document.createElement('th')
priceEl.textContent = 'TAXA DE ENTREGA'
document.querySelector('table').appendChild(priceEl)

const solicitaTx = document.createElement('th')
solicitaTx.textContent = 'PEDIR'
document.querySelector('table').appendChild(solicitaTx)


//gera o menu na tabela

const bairrosLista = [{
    nomeBairro: 'Retirar na Loja',
    valor: 0,
    taxa: 'taxa',
    formBairro: 'Retirar na Loja'
}, {
    nomeBairro: 'Curado 2',
    valor: 4,
    taxa: 'taxa',
    formBairro: 'Curado 2'
}, {
    nomeBairro: 'Curado 3',
    valor: 4,
    taxa: 'taxa',
    formBairro: 'Curado 3'
},{
    nomeBairro: 'Curado 4',
    valor: 4,
    taxa: 'taxa',
    formBairro: 'Curado 4'
},{
    nomeBairro: 'Curado 5',
    valor: 4,
    taxa: 'taxa',
    formBairro: 'Curado 5'
},{
    nomeBairro: 'Curado 1',
    valor: 5,
    taxa: 'taxa',
    formBairro: 'Curado 1'
},{
    nomeBairro: 'San Martins',
    valor: 8,
    taxa: 'taxa',
    formBairro: 'San Martins'
},{
    nomeBairro: 'Cavaleiro',
    valor: 8,
    taxa: 'taxa',
    formBairro: 'Cavaleiro'
},{
    nomeBairro: 'Jaboatão Velho',
    valor: 9,
    taxa: 'taxa',
    formBairro: 'Jaboatão Velho'
},{
    nomeBairro: 'Santo Aleixo',
    valor: 8,
    taxa: 'taxa',
    formBairro: 'Santo Aleixo'
},{
    nomeBairro: 'Totó',
    valor: 8,
    taxa: 'taxa',
    formBairro: 'Totó'
},,{
    nomeBairro: 'Jardim São Paulo',
    valor: 8,
    taxa: 'taxa',
    formBairro: 'Jardim São Paulo'
},{
    nomeBairro: 'Mangueira',
    valor: 8,
    taxa: 'taxa',
    formBairro: 'Mangueira'
},{
    nomeBairro: 'Mustardinha',
    valor: 8,
    taxa: 'taxa',
    formBairro: 'Mustardinha'
},{
    nomeBairro: 'Abdias',
    valor: 8,
    taxa: 'taxa',
    formBairro: 'Abdias'
},{
    nomeBairro: 'Caxangá',
    valor: 8,
    taxa: 'taxa',
    formBairro: 'Caxangá'
},{
    nomeBairro: 'Outros bairros (a taxa será informada no final)',
    valor: 0,
    taxa: 'taxa',
    formBairro: 'Outros bairros'
}]

const generateDomDistrict = (bairro) => {
    const bairroEl = document.createElement('tr')
    const inputH = document.createElement('input')
    const tdGeral = document.createElement('td')
    const tdBairro = document.createElement('td')
    const tdValor = document.createElement('td')
    const tdBtn = document.createElement('td')
    const btn = document.createElement('button')

    bairroEl.appendChild(tdGeral)
    tdGeral.appendChild(inputH)
    tdGeral.setAttribute('style', 'display:none;')
    inputH.setAttribute('type', 'hidden')
    inputH.setAttribute('value', '1')

    bairroEl.appendChild(tdBairro)
    tdBairro.textContent = bairro.nomeBairro

    bairroEl.appendChild(tdValor)
    tdValor.textContent = 'R$ ' + bairro.valor.toFixed(2).replace('.', ',')

    bairroEl.appendChild(tdBtn)
    btn.textContent = 'ESCOLHER'
    tdBtn.appendChild(btn)

    btn.addEventListener('click', (e) => {
        e.preventDefault()
        if(bairro.nomeBairro === 'Retirar na Loja' || bairro.nomeBairro === 'Outros bairros (a taxa será informada no final)') {
            pedidos.push({
                qtd: parseFloat(inputH.value),
                price: bairro.valor,
                taxa: bairro.taxa,
                product: bairro.formBairro,
                nomeDoBairro: bairro.formBairro,
                subt: bairro.valor
            })
            savePedidos()
        } else{
            pedidos.push({
                qtd: parseFloat(inputH.value),
                price: bairro.valor,
                taxa: bairro.taxa,
                product: `TAXA DE ENTREGA ${bairro.formBairro}`,
                nomeDoBairro: bairro.formBairro,
                subt: bairro.valor
            })
            savePedidos()
        }

        location.assign('confirma')
    })

    return bairroEl

}


bairrosLista.forEach((bairro) => {
    document.querySelector('table').appendChild(generateDomDistrict(bairro))
})
