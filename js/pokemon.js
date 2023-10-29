const pokemon = document.getElementById('pokemon');
const select_type = document.getElementById('select_type');
const elements = document.querySelectorAll('.type');
const loading = document.getElementById('loading')
const style_image = localStorage.getItem('style-image');
const save = document.getElementById('save-image')
import {
    data
} from './pokemon_data.js'

var selected_type = ''
var value_input = ''
if (style_image != null) {
    console.log(style_image)
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

const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

const removeClass = () => {
    for (var i = 0; i < elements.length; i++) {
        elements[i].classList.remove('select');
    }
}

function removeType() {
    removeClass()
    all_data()
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
        location.href = 'type.html?type-name=' + selected_type
    }
    console.log(selected_type)
})

// set pokemon data


const all_data = () => {

    pokemon.innerHTML = ''
    data.forEach((result) => {
        pokemon.innerHTML += `
          <a href="detail.html?id=${result.id}" id="pokemon-card"
          <div class="col-md-3">
          <div class="card p-3 mb-2 shadow-sm">
            <div class="d-flex justify-content-between">
                <div class="d-flex flex-row align-items-center">
                    <div class="ms-2 c-details">
                        <h4 class="mb-0" id="name">${capitalizeFirstLetter(result.name)}</h4> <span>#${formath(result.id)}</span>
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
                <img src="${result[image_show]}" class="default" alt="" id="image">
              </div>
            </div>
        </div>
        </div>
        </a>
        `
    })
}

all_data()
// get function




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