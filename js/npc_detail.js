import {
    npc
} from './npc_data.js'

const class_ = document.getElementById('class')
const age = document.getElementById('age')
const gender = document.getElementById('gender')
const image = document.getElementById('image')
const name = document.getElementById('name')
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const style_image = localStorage.getItem('style-image');
const save = document.getElementById('save-image')
const nextnpc = document.getElementById('nextnpc');

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

const id = urlParams.get('id')
if (id === null || parseInt(id) > 19 || parseInt(id) < 1) {
    location.href = 'index.html'
}

const npc_id = npc.filter((data) => {
    return parseInt(data.id) === parseInt(id)
})

const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

if (id === '1') {
    nextnpc.innerHTML = `
    <div class="d-flex ml-4">
        <a href="npc_detail.html?id=${parseInt(id) + 1}" title="Forward NPC"><i class='bx bx-right-arrow-alt' style="font-size: 40px;"></i></a>
    </div>
    <div class="d-flex mx-4">
        
    </div>
    `
} else if (id === '151') {
    nextnpc.innerHTML = `
    <div class="d-flex">
        <a href="npc_detail.html?id=${parseInt(id) - 1}" title="Backward NPC"><i class='bx bx-left-arrow-alt' style="font-size: 40px;"></i></a>
    </div>
    <div class="d-flex mx-4">
        
    </div>
    `
} else {
    nextnpc.innerHTML = `
    <div class="d-flex">
        <a href="npc_detail.html?id=${parseInt(id) - 1}" title="Backward NPC"><i class='bx bx-left-arrow-alt' style="font-size: 40px;"></i></a>
    </div>
    <div class="d-flex ml-4">
        <a href="npc_detail.html?id=${parseInt(id) + 1}" title="Forward NPC"><i class='bx bx-right-arrow-alt' style="font-size: 40px;"></i></a>
    </div>
    <div class="d-flex mx-4">
        
    </div>
    `
}

npc_id.forEach((res) => {
    document.title = `Pokémon | ${capitalizeFirstLetter(res.name)}`
    name.innerText = res.name
    age.innerText = res.age
    gender.innerText = res.gender
    gender.classList.add(res.gender === 'Male' ? 'dragon' : 'fairy')
    image.innerHTML = `<img src="${res[image_show]}" class="default" alt="" id="image" style="height: 250px;">`
    res.trainer.map((data) => {
        class_.innerHTML += `<li class="list-group-item">${data.class}</li>`
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