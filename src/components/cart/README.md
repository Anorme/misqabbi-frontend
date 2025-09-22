# Cart Components Documentation

This directory contains the modular cart components that provide a complete shopping cart experience. The components are designed to be simple, reusable, and maintainable.

## Architecture Overview

The cart system follows a modular architecture with clear separation of concerns:

```
CartDrawer (Main Container)
├── CartDrawerHeader (Title & Close)
├── Cart Items Section
│   ├── EmptyCartState (When empty)
│   └── CartItem[] (Individual items)
│       └── CartItemControls (Quantity & Remove)
└── CartSummary (Totals & Checkout)
```

## Components

### CartDrawer

**File:** `../CartDrawer.jsx`  
**Purpose:** Main cart drawer container that orchestrates all cart functionality.

**Props:**

- `isOpen: boolean` - Controls drawer visibility
- `onClose: function` - Callback when drawer should close

**Features:**

- Slide-in animation from right
- Backdrop click to close
- Body scroll prevention when open
- Responsive design

**Dependencies:**

- `useCartDrawer` hook for business logic
- All cart sub-components

---

### CartDrawerHeader

**File:** `CartDrawerHeader.jsx`  
**Purpose:** Displays cart title, icon, item count badge, and close button.

**Props:**

- `itemCount: number` - Number of items in cart
- `onClose: function` - Callback when close button is clicked

**Sub-components:**

- `CartTitle` - Title with icon and item count badge
- `CloseButton` - Close button with hover effects

**Styling:**

- Uses `msq-purple-rich` for title and icon
- Uses `msq-gold` for item count badge
- Hover effects on close button

---

### CartItem

**File:** `CartItem.jsx`  
**Purpose:** Displays individual cart item with image, details, and controls.

**Props:**

- `item: object` - Cart item data
  - `id: string` - Product ID
  - `name: string` - Product name
  - `price: number` - Product price
  - `images: array` - Product images
  - `size: string` - Selected size
  - `quantity: number` - Item quantity
- `onQuantityChange: function` - Callback for quantity changes
- `onRemove: function` - Callback for item removal

**Features:**

- Product image display with fallback
- Product details (name, size, price)
- Integrated quantity controls
- Hover effects

---

### CartItemControls

**File:** `CartItemControls.jsx`  
**Purpose:** Provides quantity adjustment and item removal controls.

**Props:**

- `item: object` - Cart item data
- `onQuantityChange: function` - Callback for quantity changes
- `onRemove: function` - Callback for item removal

**Sub-components:**

- `QuantityButton` - Increase/decrease quantity buttons
- `QuantityDisplay` - Current quantity display
- `RemoveButton` - Remove item button

**Features:**

- Quantity increment/decrement
- Item removal
- Consistent button styling
- Hover effects

---

### CartSummary

**File:** `CartSummary.jsx`  
**Purpose:** Displays cart totals, clear cart option, and checkout button.

**Props:**

- `itemCount: number` - Total number of items
- `subtotal: number` - Total price
- `onClearCart: function` - Callback to clear all items
- `onCheckout: function` - Callback for checkout action

**Sub-components:**

- `ClearCartButton` - Clear all items button
- `CartTotals` - Item count and subtotal display
- `CheckoutButton` - Proceed to checkout button

**Features:**

- Item count and subtotal display
- Clear cart functionality
- Checkout action
- Conditional rendering (only shows when cart has items)

---

### EmptyCartState

**File:** `EmptyCartState.jsx`  
**Purpose:** Displays when cart is empty.

**Props:** None

**Features:**

- Empty cart icon
- Helpful messaging
- Centered layout
- Consistent styling

---

## Custom Hook

### useCartDrawer

**File:** `../../hooks/useCartDrawer.js`  
**Purpose:** Manages all cart business logic and state.

**Parameters:**

- `isOpen: boolean` - Drawer visibility state
- `onClose: function` - Close callback

**Returns:**

- `isAnimating: boolean` - Animation state
- `cartItems: array` - Cart items
- `itemCount: number` - Total item count
- `subtotal: number` - Total price
- `handleBackdropClick: function` - Backdrop click handler
- `handleQuantityChange: function` - Quantity change handler
- `handleRemoveItem: function` - Item removal handler
- `handleClearCart: function` - Clear cart handler
- `handleCheckout: function` - Checkout handler

**Features:**

- Cart state management
- Animation handling
- Body scroll management
- Event handlers for all cart operations

---

## Usage Examples

### Basic Cart Drawer

```jsx
import CartDrawer from '../components/CartDrawer';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsCartOpen(true)}>Open Cart</button>
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
}
```

### Individual Cart Item

```jsx
import CartItem from '../components/cart/CartItem';

function CartPage() {
  const handleQuantityChange = (item, newQuantity) => {
    // Update quantity logic
  };

  const handleRemove = item => {
    // Remove item logic
  };

  return (
    <div>
      {cartItems.map(item => (
        <CartItem
          key={`${item.id}-${item.size}`}
          item={item}
          onQuantityChange={handleQuantityChange}
          onRemove={handleRemove}
        />
      ))}
    </div>
  );
}
```

---

## Styling

All components use Tailwind CSS with the app's design system:

- **Primary Color:** `msq-purple-rich` (#81298c)
- **Accent Color:** `msq-gold` (#b49c6d)
- **Text Colors:** `text-gray-900`, `text-gray-600`, `text-gray-500`
- **Background:** `bg-white`, `bg-gray-50`, `bg-gray-100`

## State Management

The cart uses React Context for state management:

- **Cart State:** Managed by `CartProvider`
- **Actions:** `addToCart`, `removeFromCart`, `updateCartItem`, `clearCart`
- **Selectors:** `getCartItems`, `getCartItemCount`, `getCartSubtotal`

## Contributing

When contributing to cart components:

1. **Keep components focused** - Each component should have a single responsibility
2. **Maintain consistency** - Use the established patterns and styling
3. **Test thoroughly** - Ensure all functionality works as expected
4. **Document changes** - Update this README when adding new features
5. **Follow naming conventions** - Use descriptive, consistent naming

## File Structure

```
src/components/cart/
├── README.md                 # This documentation
├── CartDrawerHeader.jsx      # Header component
├── CartItem.jsx             # Individual cart item
├── CartItemControls.jsx     # Quantity and remove controls
├── CartSummary.jsx          # Totals and checkout
└── EmptyCartState.jsx       # Empty cart display

src/hooks/
└── useCartDrawer.js         # Cart business logic hook
```
