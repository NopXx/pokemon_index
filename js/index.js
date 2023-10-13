const pokemon = document.getElementById('pokemon');
const select_type = document.getElementById('select_type');
const elements = document.querySelectorAll('.type');
const type_show = document.getElementById('type-show');
const loading = document.getElementById('loading')




const data = fetch('./pokemon_data.json')
    .then(response => response.json())
    .then(data => {
        // Your JSON data is now available in the 'data' variable.
        return data;
    })
    .catch(error => {
        console.error('Error:', error);
    });


const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function removeClass() {
    for (var i = 0; i < elements.length; i++) {
        elements[i].classList.remove('select');
    }

}

const removeType = () => {
    removeClass()
    all_data()
}

select_type.addEventListener('click', (e) => {
    if (e.target.id !== "select_type") {
        removeClass()
        const types = e.target.innerHTML.toLowerCase()
        e.target.classList.add('select')
        type_show.innerHTML = `Type: <span class="badge ${types} mx-1">${e.target.innerHTML} <i class='icon bx bx-x' onclick=removeType()></i></span>`
        pokemon.innerHTML = ''
        data.then(data => data.forEach((result) => {
            result.types.map((type) => {
                if (type.name === types) {
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
                }
            })
        }))
        // })
    }
})

const formath = (str) => {
    if (str.toString().length === 1) {
        return '000' + str
    } else if (str.toString().length === 2) {
        return '00' + str
    } else {
        return '0' + str
    }
}

const all_data = () => {
    pokemon.innerHTML = ''
    type_show.innerHTML = `Type: <span class="badge all mx-1">All</span>`
    loading.innerHTML = `<p class="placeholder-glow">
    <span class="placeholder col-12"></span>
  </p>`
    setTimeout(() => {
        data.then(data => data.forEach((result) => {
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
        })).then(() => {
            loading.innerHTML = ''
        })
    }, 1000);
    // })
}

all_data()