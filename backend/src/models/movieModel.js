const connection = require('../db/conn')

const getAll = async () => {
    const sql = 'SELECT * FROM movie'
    const [movies] = await connection.execute(sql)
    return movies
}

const createMovies = async (movie) => {
    const {moviename, nota, img} = movie
    const query = 'INSERT INTO movie (moviename, nota, img) VALUES (?, ?, ?)'
    const [movies] = await connection.execute(query, [moviename, nota, img])
    return {insertId: movies.insertId}
}

const deleteMovie = async (id) => {
    const movies = await connection.execute('DELETE FROM movie WHERE id = ?', [id])
    return movies
}

const editMovie = async (id, movie) => {
    const {moviename, nota, img} = movie
    const query = 'UPDATE movie SET moviename = ?, nota = ?, img = ? WHERE id = ?'
    const movies = await connection.execute(query, [moviename, nota, img, id])
    return movies
}

module.exports = {
    getAll,
    createMovies,
    deleteMovie,
    editMovie
}