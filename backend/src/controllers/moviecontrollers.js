const movieModel = require('../models/movieModel')

const getAll = async (req,res) => {
    const movies = await movieModel.getAll()
    return res.status(200).json(movies)
}

const createMovie = async (req,res) => {
    
    const movies = await movieModel.createMovies(req.body)

    return res.status(201).json(movies)
}

const deleteMovie = async (req,res) => {
    const { id } = req.params
    await movieModel.deleteMovie(id)
    return res.status(204).json()
}

const editMovie = async (req,res) => {
    const {id} = req.params

    await movieModel.editMovie(id, req.body)

    return res.status(204).json()
}

module.exports = {
    getAll,
    createMovie,
    deleteMovie,
    editMovie
}