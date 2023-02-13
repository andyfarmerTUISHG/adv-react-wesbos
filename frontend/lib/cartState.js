import { createContext, useContext, useState } from "react"

const LocalStateContext = createContext()
const LocalStateProvider = LocalStateContext.Provider

function CartStateProvider({children}) {
	// This is our own custom provider
	// we will store data (state) and functionality (updaters) in here
	// anyone can access it via the consumer

	const [cartOpen, setCartOpen] = useState(false)

	function toggleCart(){
		setCartOpen(!cartOpen);
	}

	function closeCart() {
		setCartOpen(false)
	}

	function openCart() {
		setCartOpen(true)
	}
	return <LocalStateProvider value={{cartOpen, setCartOpen, toggleCart, closeCart, openCart}}>{children}</LocalStateProvider>
}
// MAKE A custom hook for accessing the cart local stte

function useCart() {
	// We use a consumer here to access the local state
	const all = useContext(LocalStateContext)
	return all

}
export { CartStateProvider, useCart}
