let clientes = []
let pedidos = []

const loadClientes = function(){
    const clientesJSON = localStorage.getItem('clientes')

    if(clientesJSON !== null){
        return JSON.parse(clientesJSON)
    } else {
        return []
    }
}

const loadPedidos = function(){
    const pedidosJSON = sessionStorage.getItem('pedidos')

    if(pedidosJSON !== null){
        return JSON.parse(pedidosJSON)
    } else {
        return []
    }
}

const saveClientes = function(){
    localStorage.setItem('clientes', JSON.stringify(clientes))
}

const savePedidos = function(){
    sessionStorage.setItem('pedidos', JSON.stringify(pedidos))
}

clientes = loadClientes()
pedidos = loadPedidos()

console.log(clientes)
console.log(pedidos)

const nome = document.querySelector('#nomeNoPreenchimento')
const endereco = document.querySelector('#endNoPreenchimento')
const bairro = document.querySelector('#bairroNoPreenchimento')
const distrito = pedidos.map((x) => x.nomeDoBairro)
console.log(distrito)



const ref = document.querySelector('#referenciaNoPreenchimento')
const cel = document.querySelector('#foneNoPreenchimento')
const nome2 = document.querySelector('#nomeNoPreenchimento2')

nome.textContent = clientes[0].toUpperCase()
endereco.textContent = clientes[1]
bairro.textContent = distrito.join('')
cel.textContent = clientes[4]
ref.textContent = clientes[5]
nome2.textContent = clientes[0].toUpperCase()

const rmvcli = document.querySelector('#mudacli')
rmvcli.addEventListener('click', (e) => {
    localStorage.clear()
})

document.querySelector('.btn-comprarMais').addEventListener('click', (e) => {
    e.preventDefault()
    location.assign('./confirma')
})

document.querySelector('#confirmarPedido').addEventListener('click', (e) => {
    e.preventDefault()
    
    const pgt = document.querySelector('#pagaEM').value
    const troco = document.querySelector('#troco').value
    const obs = document.querySelector('#observacao').value

    clientes.splice(5,3)
    clientes.push(pgt, troco, obs)
    saveClientes()
    location.assign('./enviapedidos')

})