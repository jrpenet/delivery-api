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

if(clientes.length > 0) {
   location.assign('./confcli')
}

if(pedidos.map((x)=> x.taxa).includes('taxa')){
   
}else{
   location.assign('./txentrega')
}

document.querySelector('#confirmarPedido').addEventListener('click', (e) => {
   e.preventDefault()
   const nome = document.querySelector('#nome').value
   const endereco = document.querySelector('#endereco').value
   const num = document.querySelector('#numero').value
   const cep = document.querySelector('#cep').value
   const cel = document.querySelector('#celular').value
   const ref = document.querySelector('#pto_referencia').value
   const pgt = document.querySelector('#pagaEM').value
   const troco = document.querySelector('#troco').value
   const obs = document.querySelector('#observacao').value

   if(nome === '' || endereco === '' || cel === '' || cep === '' || num === ''){ //bairro === '' || 
      alert('Os campos nome, cep, endereço/nr e celular são obrigatórios')
   } else {
      clientes.push(nome, endereco, num, cep, cel, ref, pgt, troco, obs)
      saveClientes()
      location.assign('./enviapedidos')
   }

})

const insereBairro = () => {
   const bairroNoForm = pedidos.map((z) => z.nomeDoBairro).join('')
   document.querySelector('#bairro').textContent = bairroNoForm
}

insereBairro()

const pegaoCep = document.querySelector('#cep')
pegaoCep.addEventListener('input', () => {
   if(pegaoCep.value.length > 7) {
      const url = 'https://viacep.com.br/ws/' + pegaoCep.value.replace('-', '') +  '/json/'
      fetch(url)
         .then((r) => r.json())
         .then(data => {
            if(data.logradouro == undefined || data.bairro == undefined || data.localidade  == undefined || data.uf  == undefined){
               alert('Endereço inválido')
               const rua = document.querySelector('#endereco')
               rua.value = ''
            }else{
               const rua = document.querySelector('#endereco')
               rua.value = data.logradouro
            }
      })
   }
   
       
})
