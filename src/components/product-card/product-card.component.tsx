import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectCartItems} from '../../store/cart/cart.selector';
import { addItemToCart } from '../../store/cart/cart.action';

import Button, {BUTTON_TYPES_CLASSES} from '../button/button.component';
import { Footer, Name, Price, ProductCartContainer } from './product-card.styles';
import { CategoryItem } from "../../store/categories/category.types";

type ProductCardProps = {
  product: CategoryItem
}

const ProductCard: FC<ProductCardProps> = ( { product }) => {
  const { name, price, imageUrl } = product
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();

  const addProductToCart = () => dispatch(addItemToCart(cartItems, product))

  return (
  <ProductCartContainer>
    <img src={imageUrl} alt={`${name}`}/>
    <Footer>
      <Name>{name}</Name>
      <Price>${price}</Price>
    </Footer>
    <Button buttonType={BUTTON_TYPES_CLASSES.inverted} onClick={addProductToCart}>Add to card</Button>
  </ProductCartContainer>
  );
};

export default ProductCard;