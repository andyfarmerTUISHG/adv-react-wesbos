/* eslint-disable */
import { KeystoneContext } from "@keystone-next/types";
import { Session } from "../types";

import {CartItemCreateInput} from '.././.keystone/schema-types'

async function addToCart(
	root: any,
	{productId}: {productId: string},
	context: KeystoneContext
	): Promise<CartItemCreateInput> {
		console.log(`➕ Add to Cart `)
		console.log(productId)
		// 1. Query current User see if they are signed in
		const currentSession = context.session as Session
		if ( !currentSession.itemId) {
			throw new Error(` You must be logged in to do this!`);
		}
		// 2. Query the current user cart
		const allCartItems = await context.lists.CartItem.findMany({
			where: {user: {id: currentSession.itemId}, product: { id: productId }},
			resolveFields: false,
		})
		// 3. See if the current item is in their cart
			// 3a. if it is, increment by 1
			const [existingCartItem]  = allCartItems
			console.log(allCartItems)
			if(existingCartItem) {
				console.log(`There are already ${existingCartItem.quantity} in the cart - increment by 1`)
				return await context.lists.CartItem.updateOne({
					id: existingCartItem.id,
					data: { quantity: parseInt(existingCartItem.quantity) + 1}
				})
			}
			// 3b. if it is not create a new cart item
			return await context.lists.CartItem.createOne({
				data: {
					product: {connect: {id: productId}},
					user: {connect: {id: currentSession.itemId}}
				},
				resolveFields: false,
			}
			)
	}

export default addToCart;
