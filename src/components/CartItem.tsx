import { Button, Stack } from 'react-bootstrap';
import { useShoppingCart } from '../context/ShoppingCarContext';
import storeItems from '../data/items.json';
import { formatCurrency } from '../utilities/formatCurrency';

type cartItemProps = {
  id: number;
  quantity: number;
};
export function CartItem({ id, quantity }: cartItemProps) {
  const { removeFromCart } = useShoppingCart();

  const item = storeItems.find((item) => item.id == id);
  return (
    item && (
      <Stack
        direction="horizontal"
        gap={2}
        className="d-flex align-items-center"
      >
        <img
          src={item.imgUrl}
          alt="Cart img"
          style={{ width: '125px', height: '75px', objectFit: 'cover' }}
        />
        <div className="me-auto">
          <div>
            {item.name}{' '}
            {quantity > 1 && (
              <span className="text-muted" style={{ fontSize: '.65rem' }}>
                x{quantity}
              </span>
            )}
          </div>
          <div className="text-muted" style={{ fontSize: '.75rem' }}>
            {formatCurrency(item.price)}
          </div>
        </div>
        <div>{formatCurrency(item.price * quantity)}</div>
        <Button
          variant="outline-danger"
          size="sm"
          onClick={() => removeFromCart(id)}
        >
          &times;
        </Button>
      </Stack>
    )
  );
}
