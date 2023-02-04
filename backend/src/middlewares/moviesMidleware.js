const verifyField = (req,res,next) => {
    const { body } = req

    if (body.moviename == undefined || body.nota == undefined || body.img == undefined) {
        return res.status(400).json('The field not`s empty')
    }

    if (body.moviename == '' || body.nota == '' || body.img == '') {
        return res.status(400).json('The field need the to fill in')
    }

    next()
}

module.exports = {
    verifyField
}