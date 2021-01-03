const form = document.querySelector('#loginForm')
form.addEventListener('submit', login)

async function login(event){
    event.preventDefault()
    const email = document.querySelector('input[name=email]').value
    const password = document.querySelector('input[name=password]').value

    const result = await fetch('/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            password
        })
    }).then((r) => r.json())

    
    if(result.status === 'ok'){
        sessionStorage.setItem('tkn', result.data)
        // console.log('Got the token :' + result.data)
        location.assign('dashboard')
    }else{
        alert(result.status)
    }


    //aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa


    // let token = sessionStorage.getItem('tkn')

    // fetch('http://localhost:3000/users/me', {
    //     method: 'GET',
    //     headers: {
    //         'Authorization' : 'Bearer ' + token
    //     }
    // })
    // .then((r) => r.json())
    // .then((data) => console.log(data))

    // location.assign('users/me')
}