const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const modal_pokemon = document.getElementById('modal-pokemon');
const modal_input = document.getElementById('modal-input');

const id = urlParams.get('id')
console.log(id);

const data = fetch('./pokemon_data_v2.json')
    .then(response => response.json())
    .then(data => {
        return data;
    })
    .catch(error => {
        console.error('Error:', error);
    });

const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

modal_input.addEventListener('input', (e) => {
    const value = e.target.value.toLowerCase()
    modal_pokemon.innerHTML = ''
    console.log(value)
    if (value.length > 0) {
        setTimeout(() => {
            data.then(data => {
                var list = data.filter(function (pokemon) {
                    return pokemon.name.includes(value) || pokemon.id.toString().includes(value);
                });
                // console.log(list);
                list.forEach((result) => {
                    modal_pokemon.innerHTML += `
                        <a href="detail.html?id=${result.id}">
                        <div
                    class="d-flex justify-content-between align-items-center modal-card" style="cursor: pointer;">
                    <div class="d-flex flex-row align-items-center">
                      <img src="${result.image}" class="modal-image" alt="">
                      <div class="d-flex flex-column">
                        <span>${result.name}</span>
                        <div
                          class="d-flex flex-row align-items-center modal-time-text">
                          <small>${result.id}</small>
                        </div>
                      </div>
                    </div>
                    <div class="d-flex flex-row">
                    ${result.types.map((type) => {
                        return `<span class="badge ${type.name} m-1">${capitalizeFirstLetter(type.name)}</span>`
                    }
                    )}
                    </div>
                  </div>
                  </a>
                  `
                })
            })
        }, modal_pokemon);
    }
})