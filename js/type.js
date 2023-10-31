const color = document.getElementById('color');
const color_footer = document.getElementById('color-footer');
const type = document.getElementById('type');
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
import { data } from './pokemon_data.js'
import { type_chart } from './type_chart.js'
const type_name = urlParams.get('type-name')
const pokemon = document.getElementById('pokemon');
const save = document.getElementById('save-image')
const style_image = localStorage.getItem('style-image');
const detail = document.getElementById('detail');
const attack = document.getElementById('attack');
const defense = document.getElementById('defense');
const effect_title = document.getElementById('effect-title');
const effect_text = document.getElementById('effect-text');

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

function onlyUnique(value, index, array) {
    return array.indexOf(value) === index;
  }

  const cat = []
  data.forEach(result => {
    result.types.map(type => (
        cat.push(type.name)
        ))
  })
  let url = false
  const a = cat.filter(onlyUnique)
  a.forEach((result) => {
    if (result === type_name) {
        url = true
    }
  })
url ? '' : location.href = 'index.html'

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
color_footer.classList.add(type_name)
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


const type_data = type_chart.filter((res) => {
    return res.name === type_name
})

type_data.forEach((type) => {
    detail.innerText = type.detail
    effect_title.innerText = `Effects of the ${capitalizeFirstLetter(type_name)} type`
    // attack
    if (type.attack.super['title'] != null) {
        attack.innerHTML += `
        <div class="my-2">
            <p>${type.attack.super['title']}</p>
            <div class="row">
                <div class="col"> `
        type.attack.super['value'].map((value) => {
            attack.innerHTML += `<span class="badge ${value.name} mx-1 my-1 px-4 py-2">${capitalizeFirstLetter(value.name)}</span>`
        })
        attack.innerHTML += `
                </div>
            </div>
        </div>`
    }
    if (type.attack.very['title'] != null) {
        attack.innerHTML += `
        <div class="my-2">
            <p>${type.attack.very['title']}</p>
            <div class="row">
                <div class="col"> `
        type.attack.very['value'].map((value) => {
            attack.innerHTML += `<span class="badge ${value.name} mx-1 my-1 px-5 py-2">${capitalizeFirstLetter(value.name)}</span>`
        })
        attack.innerHTML += `
                </div>
            </div>
        </div>`
    }
    if (type.attack.not['title'] != null) {
        attack.innerHTML += `
        <div class="my-2">
            <p>${type.attack.not['title']}</p>
            <div class="row">
                <div class="col"> `
        type.attack.not['value'].map((value) => {
            attack.innerHTML += `<span class="badge ${value.name} mx-1 my-1 px-4 py-2">${capitalizeFirstLetter(value.name)}</span>`
        })
        attack.innerHTML += `
                </div>
            </div>
        </div>`
    }
    // defense
    if (type.defense.super['title'] != null) {
        defense.innerHTML += `
        <div class="my-2">
            <p>${type.defense.super['title']}</p>
            <div class="row">
                <div class="col"> `
        type.defense.super['value'].map((value) => {
            defense.innerHTML += `<span class="badge ${value.name} mx-1 my-1 px-4 py-2">${capitalizeFirstLetter(value.name)}</span>`
        })
        defense.innerHTML += `
                </div>
            </div>
        </div>`
    }
    if (type.defense.very['title'] != null) {
        defense.innerHTML += `
        <div class="my-2">
            <p>${type.defense.very['title']}</p>
            <div class="row">
                <div class="col"> `
        type.defense.very['value'].map((value) => {
            defense.innerHTML += `<span class="badge ${value.name} mx-1 my-1 px-5 py-2">${capitalizeFirstLetter(value.name)}</span>`
        })
        defense.innerHTML += `
                </div>
            </div>
        </div>`
    }
    if (type.defense.not['title'] != null) {
        defense.innerHTML += `
        <div class="my-2">
            <p>${type.defense.not['title']}</p>
            <div class="row">
                <div class="col"> `
        type.defense.not['value'].map((value) => {
            defense.innerHTML += `<span class="badge ${value.name} mx-1 my-1 px-4 py-2">${capitalizeFirstLetter(value.name)}</span>`
        })
        defense.innerHTML += `
                </div>
            </div>
        </div>`
    }
    type.effects.map((effects) => {
        effect_text.innerHTML += `<li>${effects.text}</li>`
    })

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