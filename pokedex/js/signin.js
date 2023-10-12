window.onload = init;

function init() {
    document.querySelector('.btn-secondary').addEventListener('click', () => {
        window.location.href = 'login.html';
    });

    document.querySelector('.btn-primary').addEventListener('click', signin);
}

function signin() {
    const name = document.getElementById('input-name').value;
    const mail = document.getElementById('input-mail').value;
    const pass = document.getElementById('input-password').value;

    axios({
        method: 'POST',
        url: 'http://localhost:12345/user/signin',
        data: {
            userName: name,
            userMail: mail,
            userPassword: pass
        }
    })
    . then(res => {
        console.log(res);
        alert('Registro exitoso');
        window.location.href = 'login.html'
    })
    .catch(e => {
        console.log(e.response.data);
    });
}