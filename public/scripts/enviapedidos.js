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

const pedidosJSON = sessionStorage.getItem('pedidos')
const clienteJSON = localStorage.getItem('clientes')

const novarr = JSON.parse(pedidosJSON)
const arrCli = JSON.parse(clienteJSON)

if(pedidos.map((x)=> x.taxa).includes('taxa')){
   
}else{
   location.assign('./txentrega.html')
}

const usuarioNome = document.querySelector('#usuario')
usuarioNome.textContent = arrCli[0].toUpperCase()

const valor = pedidos.map((e) => e.subt).reduce((a, b) => {
    return a + b
}, 0)

/*Dados do preenchimento formulario para o BD e zap*/
const clienteX = document.querySelector('input[name=costumer]')
clienteX.setAttribute('value', arrCli[0])
const oPedido = document.querySelector('input[name=order]')
oPedido.setAttribute('value', pedidos.map((x) => ' '+ x.qtd + 'x ' + x.product))
const preco = document.querySelector('input[name=price]')
preco.setAttribute('value', valor.toFixed(2))
const tele = document.querySelector('input[name=phone]')
tele.setAttribute('value', arrCli[4])
const oBairro = document.querySelector('input[name=district]')
oBairro.setAttribute('value', `End: ${arrCli[1]}, ${arrCli[2]} - ${pedidos.map((x) => x.nomeDoBairro).join('')}`)
const oEnd = document.querySelector('input[name=address]')
oEnd.setAttribute('value', arrCli[1])
const numberDaCasa = document.querySelector('input[name=numberX]')
numberDaCasa.setAttribute('value', arrCli[2])
const obsv = document.querySelector('input[name=obs]')
obsv.setAttribute('value', arrCli[8])
const trocoZ = document.querySelector('input[name=change]')
trocoZ.setAttribute('value', arrCli[7])
const pgtForma = document.querySelector('input[name=payment]')
pgtForma.setAttribute('value', arrCli[6])
const localizacaoRef = document.querySelector('input[name=refPoint]')
localizacaoRef.setAttribute('value', arrCli[5])
const clienteCEP = document.querySelector('input[name=cep]')
clienteCEP.setAttribute('value', arrCli[3])
