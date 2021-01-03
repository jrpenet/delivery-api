let token = sessionStorage.getItem('tkn')

async function keep (){
    const result = await fetch('http://localhost:3000/users/me', {
        method: 'GET',
        headers: {
            'Authorization' : 'Bearer ' + token
        }
    })
    .then((r) => r.json())
    
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


prods = loadProds()

//sessionStorage.removeItem('prods')


// fetch('http://localhost:3000/products')
// .then((r) => r.json())
// .then((data) => data.forEach((produto) => {
//     document.querySelector('#listaProdsDB').appendChild(listaProds(produto))
// }))

const prodsJSON = sessionStorage.getItem('prods')

const novarr = JSON.parse(prodsJSON)


if(novarr !== null){
    if(novarr.length > 0){
        let form = document.querySelector('#prodFormPadrao')
        form.setAttribute('action', `/products/a/${novarr[0]}`)
        form.setAttribute('method', 'patch')
        let id = document.querySelector('#prodId')
        id.setAttribute('value', novarr[0])
        let nome = document.querySelector('#prodName')
        nome.setAttribute('value', novarr[1])
        let descricao = document.querySelector('#prodDescription')
        descricao.innerHTML = novarr[2]
        let valor = document.querySelector('#prodPrice')
        valor.setAttribute('value', novarr[3])
        let categoria = document.querySelector('#prodCateg')
        categoria.setAttribute('value', novarr[4])
        categoria.textContent = novarr[4]
        let imgForm = document.querySelector('#prodImg')
        imgForm.removeAttribute('style')
        imgForm.setAttribute('action', `/products/images/${novarr[0]}`)
        let botao = document.querySelector('#botaoCriar')
        const titulo = document.querySelector('#ttl')
        botao.textContent = 'Alterar Produto'
        titulo.textContent = 'Alterar Produto'
    }
}else{
    let id = document.querySelector('#prodId')
    id.removeAttribute('name')
}

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

    // const navegacao = document.querySelectorAll('.dash')
    // const sessoes = document.querySelectorAll('section')

    // for(let i = 0; i < navegacao.length; i++){

    //     sessoes[i].setAttribute('style','display: none;')

    //     if(navegacao[i].className.includes('active')){
    //         sessoes[i].removeAttribute('style')
    //     }
        
    // }
}

linkColor.forEach(l => l.addEventListener('click', colorLink))



let botao = document.querySelector('#botaoCriar')
let valor = document.querySelector('#prodPrice')
let categoria = document.querySelector('select[name=category]')
botao.addEventListener('click', (e) => {
    
    if(valor.value.includes(',')){
        e.preventDefault()
        alert('Substitua a vírgula por ponto')
    }

    if(categoria.value == ""){
        e.preventDefault()
        alert('Favor escolher uma categoria de produto')
    }
})

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