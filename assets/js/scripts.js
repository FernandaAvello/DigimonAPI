// Consumir la ApiRest
function getAllDigimon(paramName = '', paramLevel = '') {
  deleteAllDigimon()
  let url = 'https://digimon-api.vercel.app/api/digimon'
  // Si ingreso un parámetro de búsqueda en el buscador
  if (paramName !== '') {
    url = `https://digimon-api.vercel.app/api/digimon/name/${paramName}`
    // Elimino la lista de todos los digimon, y crea sólo el que busqué
  }
  if (paramLevel !== '') {
    url = `https://digimon-api.vercel.app/api/digimon/level/${paramLevel}`
  }
  fetch(url).then(
    response => response.json()
    ).then(
      data => {
        // Si no encuentra el nombre del Digimon que se ingreso en el buscador, muestra un mensaje de error
        if ('ErrorMsg' in data) {
          let errorMessage = document.getElementById('error-msg')
          errorMessage.innerHTML = `No existe el digimon "${paramName}"`
        } else {
          const digimons = data
          // guardar los datos que llegan en una variable
          createDigimonCard(digimons)
        }
      })
    }

    // Crear la función que crea una card con todos los datos
function createDigimonCard (digimons) {
  let row = document.getElementById('digimon-layout')
  // Para cada digimon (209), vamos a crear todos los elementos de una card
  for (let i=0; i< digimons.length; i++) {
    let section = document.createElement('div')
    let card = document.createElement('div')
    let img = document.createElement('img')
    let cardBody = document.createElement('div')
    let h5 = document.createElement('h5')
    let p = document.createElement('p')

// Añadir las clases de Bootstrap por cada etiqueta de la card
    section.classList.add('col-lg-4')
    section.classList.add('col-md-6')
    section.classList.add('col-sm-12')

    card.classList.add('card')
    card.classList.add('text-center')
    card.classList.add('align-items-center')
    card.style.marginTop = '20px'
    card.style.marginLeft = '5px'
    card.style.border = coloredBorder(digimons[i].level)

    img.src = digimons[i].img
    img.classList.add('card-img-top')
    img.style.height = '200px'
    img.style.width = '200px'

    cardBody.classList.add('card-body')

    h5.classList.add('card-title')
    h5.innerHTML = digimons[i].name

    p.classList.add('card-text')
    p.classList.add('level')
    p.innerHTML = digimons[i].level

    // Insertar cada elemento dentro de otro (de la card)
    cardBody.appendChild(h5)
    cardBody.appendChild(p)
    card.appendChild(img)
    card.appendChild(cardBody)
    section.appendChild(card)
    row.appendChild(section)
  }
}
window.onload = getAllDigimon()

// Definir colores para los bordes de las cards según su level
function coloredBorder(level) {
  switch (level) {
    case 'Fresh':
      return '2px solid #d4edf5'
      break;
    case 'In Training':
      return '2px solid #eddd9b'
      break;
    case 'Training':
      return '2px solid #eddd9b'
      break;
    case 'Rookie':
      return '2px solid #66c4ea'
      break;
    case 'Champion':
      return '2px solid #1570e5'
      break;
    case 'Ultimate':
      return '2px solid #963110'
      break;
    case 'Mega':
      return '2px solid #e0a730'
      break;
    case 'Armor':
      return '2px solid #122522'
      break;
  }
}

function searchDigimon() {
  let searchResult = document.getElementById('search-result').value
  getAllDigimon(searchResult)
}

function resetList() {
  document.getElementById('search-result').value = ''
  document.getElementById('error-msg').innerHTML = ''
  deleteAllDigimon()
  getAllDigimon('', '')
}
function deleteAllDigimon() {
  let row = document.getElementById('digimon-layout')
  while (row.firstChild) {
    row.removeChild(row.firstChild);
  }
}

function levelSelection (select) {
  let levelSelected = document.getElementById('level-selector').value;
  getAllDigimon('', levelSelected)
}
