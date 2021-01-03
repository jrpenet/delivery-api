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
    // console.log(result.status)
    
    if(result.status === 'ok'){
        
    }else{
        location.assign('login')
    }
}

keep()

let prods = []

const loadProds = function(){
    const prodsJSON = sessionStorage.getItem('prods')
    
    if(prodsJSON !== null){
        return JSON.parse(prodsJSON)
    } else {
        return []
    }
}

const saveProds = function(){
    sessionStorage.setItem('prods', JSON.stringify(prods))
}

sessionStorage.removeItem('prods')

prods = loadProds()

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

const listaProds = (produtoDB) => {
    const trRow = document.createElement('tr')

    const idEl = document.createElement('td')
    const nomeEl = document.createElement('td')
    const descricaoEl = document.createElement('td')
    const precoEl = document.createElement('td')
    const categoriaEl = document.createElement('td')
    const ativoEl = document.createElement('td')
    const tdBtns = document.createElement('td')
    const btnEdt = document.createElement('a')
    const icone1 = document.createElement('ion-icon')
    const icone2 = document.createElement('ion-icon')
    const form2 = document.createElement('form')
    const btnDel = document.createElement('button')

    idEl.textContent = produtoDB._id
    nomeEl.textContent = produtoDB.product
    descricaoEl.textContent = produtoDB.description
    precoEl.textContent = produtoDB.price
    categoriaEl.textContent = produtoDB.category

    if(produtoDB.active == true){
        ativoEl.textContent = 'Ativado'
    }else{
        ativoEl.textContent = 'Desativado'
    }

    icone1.setAttribute('name', 'create-outline')
    icone1.setAttribute('class', 'icone')
    icone2.setAttribute('name', 'trash-outline')
    icone2.setAttribute('class', 'icone')
    btnEdt.setAttribute('href', 'add-ou-edt')
    btnDel.setAttribute('style', 'background-color: #fff; border:none; cursor: pointer;')
    form2.setAttribute('method', 'DELETE')
    form2.setAttribute('action', `/products/d/${produtoDB._id}`)
    
    trRow.appendChild(nomeEl)
    trRow.appendChild(descricaoEl)
    trRow.appendChild(precoEl)
    trRow.appendChild(categoriaEl)
    trRow.appendChild(ativoEl)
    trRow.appendChild(tdBtns)
    tdBtns.appendChild(btnEdt)
    btnEdt.appendChild(icone1)
    tdBtns.appendChild(form2)
    form2.appendChild(btnDel)
    btnDel.appendChild(icone2)    

    btnEdt.addEventListener('click', (e) => {
        e.preventDefault()
        prods.push(produtoDB._id, produtoDB.product, produtoDB.description, produtoDB.price, produtoDB.category, produtoDB.image)
        saveProds()
        location.assign('add-ou-edt')
    })

    return trRow

}

fetch('http://localhost:3000/products')
.then((r) => r.json())
.then((data) => data.forEach((produto) => {
    document.querySelector('#listaProdsDB').appendChild(listaProds(produto))
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