const color = document.getElementById('color');
const type = document.getElementById('type');
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
import {data} from './pokemon_data.js'
const type_name = urlParams.get('type-name')
const pokemon = document.getElementById('pokemon');
const save = document.getElementById('save-image')
const style_image = localStorage.getItem('style-image');

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

// update title
document.title = `Pokémon | ${capitalizeFirstLetter(type_name)}`

color.classList.add(type_name)
type.innerText = capitalizeFirstLetter(type_name)

const show_data = () => {
    pokemon.innerHTML = ''
    data.forEach(result => {
        result.types.map((type) => {
            if (type.name === type_name) {
                pokemon.innerHTML += `
                        <a href="detail.html?id=${result.id}"
                        <div class="col-md-4">
                        <div class="card p-3 mb-2 shadow-sm">
                        <div class="d-flex justify-content-between">
                            <div class="d-flex flex-row align-items-center">
                                <div class="ms-2 c-details">
                                    <h4 class="mb-0" id="name">${capitalizeFirstLetter(result.name)}</h4> <span>${formath(result.id)}</span>
                                </div>
                            </div>
                            <div class="badge" id="types"> 
                            ${result.types.map(type => (
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
            } else {
                // pokemon.innerHTML = `<p>ไม่พบข้อมูล</p>`
            }
        })
    });
}

show_data()


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