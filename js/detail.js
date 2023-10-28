const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const modal_pokemon = document.getElementById('modal-pokemon');
const modal_input = document.getElementById('modal-input');
const style_image = localStorage.getItem('style-image');
const save = document.getElementById('save-image')
const stats = document.getElementById('stats')
const character = document.getElementById('character');
import {
    data
} from './pokemon_data.js'

if (style_image != null) {
    if (style_image === '1') {
        document.getElementById('image-default').checked = true;
    } else {
        document.getElementById('image-pix').checked = true;
    }
} else {
    localStorage.setItem('style-image', 1)
    document.getElementById('image-default').checked = true;
}

var image_show = style_image == '1' ? 'image' : 'image_pix'

const setWidthBar = (str, stat) => {
    if (str === 'hp') {
        return (stat / 255) * 100
    } else if (str === "attack") {
        return (stat / 190) * 100
    } else if (str === "defense") {
        return (stat / 250) * 100
    } else if (str === "special-attack") {
        return (stat / 150) * 100
    } else if (str === "special-defense") {
        return (stat / 250) * 100
    } else {
        return (stat / 200) * 100
    }
}

const id = urlParams.get('id')
if (id === null) {
    location.href = 'index.html'
}

const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
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

const showDetail = () => {
    const list = data.filter(function (pokemon) {
        return pokemon.id.toString() == id;
    });
    // console.log(list);
    const color = list[0].types[0].name
    document.title = capitalizeFirstLetter(list[0].name)
    document.getElementById("back-color").classList.add(color)
    list[0].stats.forEach((item) => {
        stats.innerHTML += `
            <div class="row">
                <div class="col-3 text-end">
                    <p>${capitalizeFirstLetter(item.name)}</p>
                </div>
                <div class="col-8 ">
                    <div class="progress mt-1" style="height: 20px;">
                        <div class="progress-bar ${color}" role="progressbar" style="width: ${setWidthBar(item.name,item.base_stat)}%;">${item.base_stat}</div>
                    </div>
                </div>
            </div>`
    })
    list.forEach((item) => {
        character.innerHTML = `
            <h1>${capitalizeFirstLetter(item.name)}</h2>
            <p>#${item.id}</p>
            <div class="text-center my-3">
                <img src="${item[image_show]}" class="rounded-circle p-4 evolution" alt="${item.name}" style="background-color: whitesmoke; width: 70%;">
            </div>
            `
        document.getElementById('detail').innerHTML = `
            <div class="row">
                <div class="col-4 text-end">
                <p class="fs-5">Height : </p>
                </div>
                <div class="col-auto text-start">
                <p class="fs-5">${item.height / 10}</p>
                </div>
                <div class="col-auto text-start">
                <p class="fs-5">m </p>
                </div>
            </div>
            <div class="row">
                <div class="col-4 text-end">
                <p class="fs-5">Weight : </p>
                </div>
                <div class="col-auto text-start">
                <p class="fs-5">${item.weight / 10}</p>
                </div>
                <div class="col-auto text-start">
                <p class="fs-5">kg</p>
                </div>
            </div>
            `
    })
    const type = document.getElementById('types')
    list[0].types.forEach((item) => {
        type.innerHTML += `<span class="type ${item.name} mx-1 px-3 py-1 Typedropdown">${capitalizeFirstLetter(item.name)}</span>`
    })
    list[0].evolutions.forEach((result) => {
        const evolution = document.getElementById('evolution')
        const evolutions = document.getElementById('evolutions')
        if (result.length > 1) {
            evolutions.classList.add('col-8')
            evolutions.classList.add('row')
            result.forEach((item) => {
                evolutions.innerHTML += `<div class="col-4">
                    <div class="card p-3 mb-2 shadow">
                        <div class="d-flex justify-content-between">
                            <div class="d-flex flex-row align-items-center">
                                <div class="ms-2 c-details">
                                    <h4 class="mb-0" id="name">${capitalizeFirstLetter(item.name)}</h4><span>${formath(item.id)}</span>
                                </div>
                            </div>
                        </div>
                        <div class="mt-5">
                        <div class="d-flex justify-content-center">
                            <img src="${item[image_show]}" class="evolution"  alt="" id="image">
                        </div>
                        </div>
                    </div>
                </div>`
            })

        } else {
            evolution.classList.add('col-auto')
            evolution.classList.add('row')
            evolution.innerHTML += `
                <div class="col-auto">
                    <div class="card p-3 mb-2 shadow">
                        <div class="d-flex justify-content-between">
                            <div class="d-flex flex-row align-items-center">
                                <div class="ms-2 c-details">
                                    <h4 class="mb-0" id="name">${capitalizeFirstLetter(result.name)}</h4>
                                    <span>${formath(result.id)}</span>
                                </div>
                            </div>
                        </div>
                        <div class="mt-5">
                        <div class="d-flex justify-content-center">
                            <img src="${result[image_show]}" class="default" alt="" id="image">
                        </div>
                        </div>
                    </div>
                </div>
                `
            // console.log(result)
        }
    })

}

showDetail()


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
                      <img src="${result[image_show]}" class="modal-image" alt="">
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

save.addEventListener('click', () => {
    const radio = document.querySelectorAll('input[name="toggle')
    let selectedSize;
    for (const radioButton of radio) {
        if (radioButton.checked) {
            selectedSize = radioButton.value;
            break;
        }
    }
    localStorage.setItem('style-image', selectedSize)
    location.reload();
})