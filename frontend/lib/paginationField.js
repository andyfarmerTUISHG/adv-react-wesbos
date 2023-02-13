import { PAGINATION_QUERY } from "../components/Pagination"

export default function paginationField() {
  return {
	keyArgs: false, // Tells Apollo we will take care of everything
	read(existing = [], { args, cache}) {
		// console.log({existing, args, cache})
		const {skip, first} = args

		// REead the number of items on the page from the cahce
		const data = cache.readQuery({
			query: PAGINATION_QUERY
		})
		// console.log(`data from PAGINATION_QUERY`)
		// console.log(data)
		const count = data?._allProductsMeta?.count
		// console.log(count)
		// Get Current Page & Total Number of Pages
		const page = skip / first + 1
		const pages = Math.ceil(count / first)

		// Check if we have existing items
		const items = existing.slice(skip, skip+first).filter( (x) => x)
		if(items.length && items.length !== first && page === pages){
			 // If
				// There are items
				// AND there aren't enough items to satisfy how many were requested
				// AND we are on the last page
			// THEN JUST SEND IT
			return items
		}
		if(items.length !== first){
			// If we don't have any items, we must go to the network to fetch them
			return false;
		}

		// If there are items, just return them from the cache, and we don't need to go to the network
		if (items.length) {
			// console.log(`There are ${items.length} items in the cache! Send them to Apollo `)
			return items
		}

		return false; // Fallback to network if there are any problems in the above scenarios
		// First thing it does is ask the read function for those items
		// We can either do one of two things

		// 1. We can return the items because they are already in the cache

		// 2. The other options is to return false from here, and trigger a network request to get data
	},
	merge(existing, incoming, {args}) {
		const {skip, first} = args
		// This runs when the Apollo clients comes back from the network with our products
		// console.log(`Merging ${incoming.length} items from the network `)
		// console.log(incoming)
		const merged = existing ? existing.slice(0):[];
		for(let i = skip; i < skip + incoming.length; ++i) {
			merged[i] = incoming[i -skip]
		}
		// console.log(merged)
		// Finally we return the merged items to Apollo
		return merged
	}
  }
}
