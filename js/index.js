const pokemon = document.getElementById('pokemon');
const select_type = document.getElementById('select_type');
const elements = document.querySelectorAll('.type');
const type_show = document.getElementById('type-show');
const loading = document.getElementById('loading')
const input = document.getElementById('input');
const enter = document.getElementById('enter');

var selected_type = ''
var value_input = ''

const data = fetch('./pokemon_data.json')
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

const removeClass = () => {
    for (var i = 0; i < elements.length; i++) {
        elements[i].classList.remove('select');
    }
}

const removeType = () => {
    removeClass()
    all_data()
    input.value = ''
}

const formath = (str) => {
    if (str.toString().length === 1) {
        return '000' + str
    } else if (str.toString().length === 2) {
        return '00' + str
    } else {
        return '0' + str
    }
}

// filter pokemon type
select_type.addEventListener('click', (e) => {

    if (e.target.id !== "select_type") {
        removeClass()
        const types = e.target.innerHTML.toLowerCase()
        selected_type = types
        e.target.classList.add('select')
        type_show.innerHTML = `Type: <span class="badge ${types} mx-1">${e.target.innerHTML} <i class='icon bx bx-x' onclick=removeType()></i></span>`
        pokemon.innerHTML = ''
        input.value = ''
        loading.innerHTML = `<p class="placeholder-glow">
    <span class="placeholder col-12"></span>
  </p>`
        setTimeout(() => {
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
            })).then(() => {
                loading.innerHTML = ''
            })
        }, pokemon);
    }
    console.log(selected_type)
})

enter.addEventListener('click', () => {
    if (value_input !== '') search(value_input)
    else all_data()
})

const search = (value) => {
    pokemon.innerHTML = ''
    loading.innerHTML = `<p class="placeholder-glow">
    <span class="placeholder col-12"></span>
  </p>`
    setTimeout(() => {
        data.then(data => {
            if (selected_type !== '') {
                var list = data.filter(function (pokemon) {
                    return pokemon.name.includes(value) || pokemon.id.includes(Number(value));
                });
                if (list.length > 0) {
                    list.forEach((result) => {
                        result.types.map((type) => {
                            if (type.name === selected_type) {
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
                            } else {
                                pokemon.innerHTML = `<p>ไม่พบข้อมูล</p>`
                            }
                        })
                    })
                } else {
                    pokemon.innerHTML = `<p>ไม่พบข้อมูล</p>`
                }
            } else {
                var list = data.filter(function (pokemon) {
                    return pokemon.name.includes(value) || pokemon.id.toString().includes(value);
                });
                if (list.length > 0) {
                    // pokemon.innerHTML = ''
                    list.forEach((result) => {
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
                } else {
                    pokemon.innerHTML = `<p>ไม่พบข้อมูล</p>`
                }
            }
        }).then(() => {
            loading.innerHTML = ''
        })
    }, pokemon);
}

input.addEventListener('input', (e) => {
    value_input = e.target.value.toLowerCase();
})

input.addEventListener('keypress' , (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        if (value_input !== '') search(value_input)
        else all_data()
      }
})


// set pokemon data
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
    }, pokemon);
}
// get function
all_data()