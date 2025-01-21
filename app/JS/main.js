import '../style.css'

document.addEventListener('DOMContentLoaded', () => {
  const DOMSelectors = {
      html: document.querySelector("html"),
      body: document.querySelector("body"),
      header: document.querySelector(".header"),
      box: document.querySelector(".box"),
  }
  
  const name_Input = document.getElementById("nameI")
  const id_Input = document.getElementById("numberI")
  const api_Select = document.getElementById("apiS")
  
  async function FFXIV(endpoint) {
      try {
          const promise = await fetch(`https://ffxivcollect.com/api/${endpoint}`)
          if (promise.status != 200) {
              throw new Error(promise)
          } else {
              const info = await promise.json();
              allInfo(
                  info.results
                  .filter(item => id_Input.value == "0" || item.id >= id_Input.value)
                  .filter(spell => name_Input.value == '' || spell.name.toLowerCase().includes(name_Input.value.toLowerCase()))
              , info.results)
          }
      } catch (error) {
          alert("No Page Found")
      }
  }
  
  function allInfo(array, info) {
      DOMSelectors.box.innerHTML = " "
      for(let i = 1; i <= info.length; i++) {
          for(let j = 0; j < array.length; j++) {
              if(array[j]["id"] == i) {
                  addInfo(array[j]);
                  break
              }
          }
      }
  }
  
  function addInfo(item) {
      DOMSelectors.box.insertAdjacentHTML(
          "beforeend",
          `<div class="card">
            <h2 class="card-title">${item.name}</h2>

            <div class="card-image-container">
              <img src="${item.icon}" alt="Card Image ${item.id}" class="card-image">
            </div>
            
            <h2 class="card-id">ID #${item.id}</h2>

            <button class="learn-more-btn" onclick="my_modal_${item.id}.showModal()">Learn More</button>

            <dialog id="my_modal_${item.id}" class="modal">
              <div class="modal-box">
                <h2>Description</h2>
                <p class="modal-content">${item.description}</p>

                <h2>Tooltip</h2>
                <p class="modal-content">${item.tooltip}</p>

                <div class="modal-action">
                  <form method="dialog">
                    <button class="btn close-btn">Close</button>
                  </form>
                </div>
              </div>
            </dialog>
          </div>`
      )
  };
  
  
  api_Select.addEventListener("change", function(event) {
      FFXIV(api_Select.value) //Changed endpoints, Other API calls.
  })

  id_Input.addEventListener("input", function(event) {
      FFXIV(api_Select.value)
  })
  
  name_Input.addEventListener("input", function(event) {
      FFXIV(api_Select.value)
  })
  
  FFXIV(api_Select.value) //First API Call of "spells"
  
  });