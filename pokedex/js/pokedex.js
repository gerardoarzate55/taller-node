window.onload = init;

const url = 'http://localhost:12345';
let header = {};

function init() {
    if (localStorage.getItem('token')) {
        header = {
            headers: {
                'Authorization': `bearer ${localStorage.getItem('token')}`
            }
        }
        loadPokemon();
    } else {
        window.location.href = 'index.html';
    }

}

function loadPokemon() {
    axios.get('http://localhost:12345/pokemon', header)
    .then(res => {
        console.log(res.data);
        displayPokemon(res.data.message);
    })
    .catch(err => {
        console.log(err);
    });
}

function displayPokemon(pokemon) {
    let body = document.body;
    let content = body.innerHTML;
    
    for (const pk of pokemon) {
        content += `<h3>${pk.pok_name}</h3>`;
    }

    body.innerHTML = content;
}