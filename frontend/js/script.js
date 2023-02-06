const main = document.querySelector('.container')


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
    button_actions.appendChild(editButton)
    const deleteButton = document.createElement('button')
    deleteButton.innerHTML = '<i class="bi bi-x-lg"></i>'
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

showContainer()
