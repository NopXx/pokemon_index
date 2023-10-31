import { npc } from './npc_data.js'

const style_image = localStorage.getItem('style-image');
const save = document.getElementById('save-image')
const npc_html = document.getElementById("npc")

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

npc_html.innerHTML = ''
npc.forEach((data) => {
  npc_html.innerHTML += `
  <a href="npc_detail.html?id=${data.id}" class="col-md-3">
  <div class="card p-3 mb-2 shadow-sm" style="height: 400px;">
      <div class="d-flex justify-content-between">
          <div
              class="d-flex flex-row align-items-center">
              <div class="ms-2 c-details">
                  <h4 class="mb-0" id="name">${data.name}</h4>
              </div>
          </div>
          <div class="badge" id="types">
              <span class="${data.gender === 'Male' ? 'dragon' : 'fairy'}">${data.gender}</span>
          </div>
      </div>
      <div class="mt-5">
          <div
              class="d-flex justify-content-center">
              <img
                  src="${data[image_show]}"
                  class="default" alt id="image" style="height: 250px;">
          </div>
      </div>
  </div>
</a>
  `

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