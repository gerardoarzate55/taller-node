window.onload = init;

function init() {
    if (localStorage.getItem('token')) {
        window.location.href = 'pokedex.html';
        return;
    }

    document.querySelector('.btn-secondary').addEventListener('click', () => {
        window.location.href = 'signin.html';
    });

    document.querySelector('.btn-primary').addEventListener('click', login);
}

function login() {
    const mail = document.getElementById('input-mail').value;
    const pass = document.getElementById('input-password').value;

    axios({
        method: 'POST',
        url: 'http://localhost:12345/user/login',
        data: {
            userMail : mail,
            userPassword: pass
        },
        validateStatus: () => true
    })
    . then(res => {
        console.log(res.data);
        if (res.data.code === 200) {
            alert(`Inicio exitoso`);
            localStorage.setItem('token', res.data.message);
            window.location.href = 'pokedex.html';
        } else {
            alert('Usuario y/o contraseña incorrectos');
        }
    })
    .catch(e => {
        console.log(e.response.data);
    });
}