let token = sessionStorage.getItem('tkn')

fetch('http://localhost:3000/users/me', {
    method: 'GET',
    headers: {
        'Authorization' : 'Bearer ' + token
    }
})
.then((r) => r.json())
.then((data) => console.log(data))

location.assign('users/me')