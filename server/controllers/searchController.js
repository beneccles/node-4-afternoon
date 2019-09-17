const swag = require('../models/swag')

module.exports = {
    search: (req, res) => {
        const { category } = req.query

        if (!category) {
            res.status(200).send(swag)
        } else {
            // Create a new array with only the products that have a matching
            // category.
            let filteredArr = swag.filter(product => product.category === category)
            res.status(200).send(filteredArr)
        }
    }
}