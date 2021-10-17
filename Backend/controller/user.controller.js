const Book = require("../model/item")
const Cart = require("../model/cart")

module.exports = {
	AddToCart: async (req, res, next) => {
		try {
            Book_id = req.body.Book_id;
		    Customer_id = req.body.Customer_id;
		    NewQuantity = req.body.quantity;
            let total = 0;
            let cart = await Cart.findOne({ Customer_id })
			let book = await Book.findById(Book_id)
			let _id = book._id
			let name = book.name
			let price = book.price
			let quantity = req.body.quantity;
			let imageUrl = book.imageUrl
			let subtotal = quantity * price

			if(cart){
				let itemIndex = cart.products.findIndex(p => p._id == _id);
				if (itemIndex > -1) {
					//product exists in the cart, update the quantity
					let productItem = cart.products[itemIndex];
                    productItem.quantity = productItem.quantity + NewQuantity;
					productItem.subtotal = productItem.quantity * price
					cart.products[itemIndex] = productItem;
				  } else {
					//product does not exists in cart, add new item
					cart.products.push({_id,name,price,quantity,imageUrl,subtotal});
				  }
					for (let i = 0; i < cart.products.length; i++) { 
						total = total + cart.products[i].subtotal
					  }
					  cart.total = total
					  cart = await cart.save()


				res.status(200).json('have')
			}else{

				const newCart = await Cart.create({
					Customer_id:Customer_id,
					products: [{_id,name,price,quantity,imageUrl,subtotal}],
					total:total + subtotal
				  });
				  
				  res.status(200).json('success')
				
			}
			
			
		} catch (error) {
	
		}
	},

	GetCart: async (req, res, next) => {
		try {
			console.log('hello')
            res.status(200).json(await Cart.find());
		} catch (error) {
	
		}
	},

	DeleteProduct: async (req, res, next) => {
		try {
			
		} catch (error) {
	
		}
	},

};
