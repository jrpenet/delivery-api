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
    console.log(result.status)
    
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

