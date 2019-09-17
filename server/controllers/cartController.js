const swag = require('../models/swag')

module.exports = {
    add: (req, res) => {
        const { id } = req.params;
        let { user } = req.session;

        // Check the user's cart for the ID
        const index = user.cart.findIndex(swag => swag.id == id);

        if (index === -1) {
            const product = swag.find(swag => swag.id === id)
            user.cart.push(product);
            user.total += selectedSwag.price; 
        }

        res.status(200).send(session.user)
    },
    delete: (req, res) => {
        const { id } = req.params;
        const { user } = req.session;

        // Check the user's cart for the item to delete
        const index = user.cart.findIndex(swag => swag.id == id);
        const productDelete = swag.find(swag => swag.id == id)

        if (index !== -1) {
            //Remove the product from the cart
            user.cart.splice(index, 1);
            //Deduct the price from the total
            user.total -= selectedSwag.price;
        }

        // Return the session user with the updated cart.
        res.status(200).send(user);

    },
    checkout: (req, res) => {
        const { user } = req.session;

        // user.cart = []
        user.cart.splice(0, user.cart.length);
        user.total = 0;

        res.status(200).send(user);

    }
}