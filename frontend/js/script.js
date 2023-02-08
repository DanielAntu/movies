// seleção de elemento
const main = document.querySelector('.container')
const open_modal = document.querySelector('.open-modal')
const modal_create = document.querySelector('.modal-create-input')
const create_input = document.querySelector('.create-input')
const moviename = document.querySelector('#moviename')
const nota = document.querySelector('#nota')
const img = document.querySelector('#img')
const out = document.querySelector('.out')
const modal_edit = document.querySelector('.modal-edit-input')
const edit_input = document.querySelector('.edit-input')
const moviename_edit = document.querySelector('#moviename-edit')
const nota_edit = document.querySelector('#nota-edit')
const img_edit = document.querySelector('#img-edit')

// funções

const fetchApi = async () => {
    const res = await fetch('http://localhost:3333/movies')
    const data = await res.json()
    return data
}

const createCard = (movies) => {
    const {id, moviename, nota, img} = movies

    const card = document.createElement('div')
    card.classList.add('card')
    const imag = document.createElement('img')
    imag.src = img
    card.appendChild(imag)
    const title = document.createElement('h2')
    title.innerText = moviename
    card.appendChild(title)
    const paragrafo = document.createElement('p')
    paragrafo.innerHTML = `<i class="bi bi-star"></i> ${nota}`
    card.appendChild(paragrafo)
    const button_actions = document.createElement('div')
    button_actions.classList.add('button-actions')
    const editButton = document.createElement('button')
    editButton.innerHTML = '<i class="bi bi-pencil"></i>'
    // evento editar
    editButton.addEventListener('click', () => {
        moviename_edit.value = moviename
        nota_edit.value = nota
        img_edit.value = img

        // evento do formulario de editar
        edit_input.addEventListener('submit', (e) => {
            e.preventDefault()

            editMovie({id, moviename: moviename_edit.value, nota: nota_edit.value, img: img_edit.value})
        })

        modal_edit.classList.remove('hide')
        modal_create.classList.add('hide')

    })

    button_actions.appendChild(editButton)
    const deleteButton = document.createElement('button')
    deleteButton.innerHTML = '<i class="bi bi-x-lg"></i>'
    // evento deletar
    deleteButton.addEventListener('click', () => deleteMovie(id))
    button_actions.appendChild(deleteButton)
    card.appendChild(button_actions)

    return card
}

const showContainer = async () => {
    const movies = await fetchApi()

    main.innerHTML = ''
    
    movies.forEach((movie) => {
        const cards = createCard(movie)
        main.appendChild(cards)
    });
}

const addMovie = async (e) => {
    e.preventDefault()
    const movie = {
        moviename: moviename.value,
        nota: nota.value,
        img: img.value
    }

    await fetch('http://localhost:3333/movies', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(movie)
    })

    modal_create.classList.add('hide')
    modal_edit.classList.add('hide')

    showContainer()

    moviename.value = ""
    nota.value = ""
    img.value = ""
}

const deleteMovie = async (id) => {
    await fetch(`http://localhost:3333/movies/${id}`, {
        method: 'DELETE'
    })

    showContainer()
}

const editMovie = async ({id, moviename, nota, img}) => {
    await fetch(`http://localhost:3333/movies/${id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({moviename, nota, img})
    })

    modal_edit.classList.add('hide')
    modal_create.classList.add('hide')
    showContainer()
    moviename_edit.value = ''
    nota_edit.value = ''
    img_edit.value = ''
}

// eventos
open_modal.addEventListener('click', () => {
    modal_create.classList.remove('hide')
    modal_edit.classList.add('hide')
})

create_input.addEventListener('submit', addMovie)

out.addEventListener('click', () => {
    modal_create.classList.add('hide')
})

// exibição do filme
showContainer()
