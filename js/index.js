const pokemon = document.getElementById('pokemon');


fetch("../pokemon_data.json")
.then(response => {
   return response.json();
}).then((response) => {
    const data = response
    data.forEach((result) => {
        pokemon.innerHTML += `<div class="col-md-4">
        <div class="card p-3 mb-2 shadow-sm">
          <div class="d-flex justify-content-between">
              <div class="d-flex flex-row align-items-center">
                  <div class="ms-2 c-details">
                      <h4 class="mb-0" id="name">${result.name}</h4> <span id="id"><h6>${result.id}</h6></span>
                  </div>
              </div>
              <div class="badge" id="types"> 
              ${result.types.map((type) => (
                `<span class="${type.name}">${type.name}</span>`
    ))}
                
              </div>
          </div>
          <div class="mt-5">
            <div class="d-flex justify-content-center">
              <img src="${result.image}" alt="" id="image">
            </div>
          </div>
      </div>
      </div>`
    })
})


