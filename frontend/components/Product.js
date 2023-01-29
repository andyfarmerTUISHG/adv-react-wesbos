import ItemStyles from './styles/ItemStyles'
import Title from './styles/Title'
import PriceTag from './styles/PriceTag'
import Link from 'next/link'
import formatMoney from '../lib/formatMoney'
import DeleteProduct from './DeleteProduct'

export default function Product({ product }) {
  return (
	<ItemStyles>
		<img
			src={product?.photo?.image?.publicUrlTransformed}
			alt={product.name}
		/>
		<Title>
			<Link href={`/product/${product.id}`}>
				{product.name}
			</Link>
		</Title>
		<PriceTag>{formatMoney(product.price)}</PriceTag>
		<p>{product.description}</p>
		{/* TODO: Add buttons to edit and delete item */}
		<div className="buttonList">
			<Link href={{
				pathname: 'update',
				query: {
					id: product.id
				}
			}}
			>Edit ✏️</Link>
			<DeleteProduct id={product.id}>
				🗑️ Delete
			</DeleteProduct>
		</div>
	</ItemStyles>
  )
}
