let token = sessionStorage.getItem('tkn')

async function keep (){
    const result = await fetch('http://localhost:3000/users/me', {
        method: 'GET',
        headers: {
            'Authorization' : 'Bearer ' + token
        }
    })
    .then((r) => r.json())
    //.then((data) => console.log(data) )
    //console.log(result.status)
    
    if(result.status === 'ok'){
        
    }else{
        location.assign('login')
    }
}

keep()

const showMenu = (toggleId, navbarId, bodyId) => {
    const toggle = document.querySelector(`#${toggleId}`)
    let navbar = document.querySelector(`#${navbarId}`)
    let bodypadding = document.querySelector(`#${bodyId}`)
    if(toggle && navbar){
        toggle.addEventListener('click', () => {
            navbar.classList.toggle('expander')
            bodypadding.classList.toggle('body-pd')
        })
    }
}

showMenu('nav-toggle', 'navbar', 'body-pd')

const linkColor = document.querySelectorAll('.nav__link')
function colorLink(){
    linkColor.forEach((l) => {
        l.classList.remove('active')
    })

    this.classList.add('active')
}

linkColor.forEach(l => l.addEventListener('click', colorLink))

const listaPedidos = (pedidoDB) => {
    const trRow = document.createElement('tr')

    const idEl = document.createElement('td')
    const nomeEl = document.createElement('td')
    const enderecoEl = document.createElement('td')
    const pedidoEl = document.createElement('td')
    const phoneEl = document.createElement('td')
    const ativoEl = document.createElement('td')
    const pedidoEm = document.createElement('td')

    idEl.textContent = pedidoDB._id
    nomeEl.textContent = pedidoDB.costumer
    enderecoEl.textContent = pedidoDB.district
    pedidoEl.textContent = pedidoDB.order
    phoneEl.textContent = pedidoDB.phone
    ativoEl.textContent = pedidoDB.price.toFixed(2)

    let dt = new Date(pedidoDB.createdAt)
    let dataHJ = dt.getUTCDate()
    let mesHJ = dt.getUTCMonth()
    let horaPedido = dt.getUTCHours()
    let minPedido = dt.getUTCMinutes()

    pedidoEm.textContent = `${dataHJ}/${mesHJ+1} às ${horaPedido - 3}:${minPedido}`

    let hj = new Date()
    let dthj = hj.getDate()
    let meshj = hj.getMonth()

    if(dthj == dataHJ && meshj == mesHJ){
        trRow.appendChild(nomeEl)
        trRow.appendChild(enderecoEl)
        trRow.appendChild(pedidoEl)
        trRow.appendChild(phoneEl)
        trRow.appendChild(ativoEl)
        trRow.appendChild(pedidoEm)
    }

    return trRow

}



fetch('http://localhost:3000/orders', {
    method: 'GET',
    headers: {
        'Authorization' : 'Bearer ' + token
    }
})
.then((r) => r.json())

.then((data) => data.forEach((pedido) => {
    document.querySelector('#listaPedidos').appendChild(listaPedidos(pedido))
}))

const logout = document.querySelector('.out')
logout.addEventListener('click', () => {
    const result = fetch('http://localhost:3000/users/logoutAll', {
        method: 'POST',
        headers: {
            'Authorization' : 'Bearer ' + token
        }
    })
    .then((r) => r.json())
    
    location.reload()
})