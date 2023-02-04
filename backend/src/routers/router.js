const express = require('express')
const movieControllers = require('../controllers/moviecontrollers')
const moviesMidleware = require('../middlewares/moviesMidleware')

const router = express.Router()

router.get('/movies', movieControllers.getAll)
router.post('/movies', moviesMidleware.verifyField, movieControllers.createMovie)
router.delete('/movies/:id', movieControllers.deleteMovie)
router.put('/movies/:id', moviesMidleware.verifyField, movieControllers.editMovie)


module.exports = router