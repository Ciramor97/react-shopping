import { Offcanvas, Stack } from 'react-bootstrap';
import { useShoppingCart } from '../context/ShoppingCarContext';
import { CartItem } from './CartItem';
import { formatCurrency } from '../utilities/formatCurrency';
import storeItems from '../data/items.json';

export default function ShoppinCart({ isOpen }: { isOpen: boolean }) {
  const { closeCart, cartItems } = useShoppingCart();
  const totalCart = cartItems.reduce((total, cartItem) => {
    const item = storeItems.find((item) => item.id == cartItem.id);
    return total + item?.price * cartItem.quantity;
  }, 0);
  return (
    <Offcanvas show={isOpen} onHide={closeCart} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack gap={3}>
          {cartItems.map((item) => (
            <CartItem key={item.id} {...item} />
          ))}
          <div className="ms-auto fw-bold fs-5">
            Total {formatCurrency(totalCart)}
          </div>
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  );
}
