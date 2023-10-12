const pokemon = document.getElementById('pokemon');

const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

const formath = (str) => {
    console.log(str);
    if (str.toString().length === 1) {
        return '000' + str
    } else if (str.toString().length === 2) {
        return '00' + str
    } else {
        return '0' + str
    }
}

fetch("../pokemon_data.json")
    .then(response => {
        return response.json();
    }).then((response) => {
        const data = response
        data.forEach((result) => {
            pokemon.innerHTML += `
        <a href="detail/${result.id}"
        <div class="col-md-4">
        <div class="card p-3 mb-2 shadow-sm">
          <div class="d-flex justify-content-between">
              <div class="d-flex flex-row align-items-center">
                  <div class="ms-2 c-details">
                      <h4 class="mb-0" id="name">${capitalizeFirstLetter(result.name)}</h4> <span>${formath(result.id)}</span>
                  </div>
              </div>
              <div class="badge" id="types"> 
              ${result.types.map((type) => (
                `<span class="${type.name}">${capitalizeFirstLetter(type.name)}</span>`
                ))}
                
              </div>
          </div>
          <div class="mt-5">
            <div class="d-flex justify-content-center">
              <img src="${result.image}" alt="" id="image">
            </div>
          </div>
      </div>
      </div>
      </a>
      `
        })
    })