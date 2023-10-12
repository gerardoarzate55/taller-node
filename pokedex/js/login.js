window.onload = init;

function init() {
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
        }
    })
    . then(res => {
        console.log(res)
    })
    .catch(e => {
        console.log(e.response.data);
    });
}