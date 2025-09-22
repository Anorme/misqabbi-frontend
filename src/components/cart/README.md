# Cart Components Documentation

This directory contains the modular cart components that provide a complete shopping cart experience. The components are designed to be simple, reusable, and maintainable.

## Architecture Overview

The cart system follows a modular architecture with clear separation of concerns and eliminates prop drilling through custom hooks:

```
CartDrawer (Main Container)
├── useCartDrawer (Drawer-specific logic)
├── CartDrawerHeader (Title & Close)
├── Cart Items Section
│   ├── EmptyCartState (When empty)
│   └── CartItem[] (Individual items)
│       ├── useCartItem (Item-specific logic)
│       ├── CartItemControls (Quantity & Remove)
│       └── SizeSelectorModal (Size editing)
└── CartSummary (Totals & Checkout)
```

### State Management Architecture

The cart uses a **reducer-backed Context pattern** that eliminates prop drilling:

- **`useCartDrawer`** - Manages drawer-level concerns (clear cart, checkout, backdrop)
- **`useCartItem`** - Manages item-level concerns (quantity, removal, size changes)
- **Context + Reducer** - Centralized state management with action-based updates

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

**Features:**

- Product image display with fallback
- Product details (name, size, price)
- **Size editing** - Click on size to change via modal
- Integrated quantity controls via `useCartItem` hook
- Hover effects
- **No prop drilling** - Uses `useCartItem` hook directly

**Dependencies:**

- `useCartItem` hook for item operations
- `SizeSelectorModal` for size editing
- `CartItemControls` for quantity/removal

---

### CartItemControls

**File:** `CartItemControls.jsx`  
**Purpose:** Provides quantity adjustment and item removal controls.

**Props:**

- `item: object` - Cart item data

**Sub-components:**

- `QuantityButton` - Increase/decrease quantity buttons
- `QuantityDisplay` - Current quantity display
- `RemoveButton` - Remove item button

**Features:**

- Quantity increment/decrement
- Item removal
- Consistent button styling
- Hover effects
- **No prop drilling** - Uses `useCartItem` hook directly

**Dependencies:**

- `useCartItem` hook for item operations

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

### SizeSelectorModal

**File:** `SizeSelectorModal.jsx`  
**Purpose:** Modal for changing the size of a cart item.

**Props:**

- `currentSize: string` - Currently selected size
- `onSizeChange: function` - Callback when size is changed
- `onClose: function` - Callback to close modal

**Features:**

- Size selection grid (XS, S, M, L, XL, XXL)
- Current vs new size comparison
- Small, centered modal design
- Transparent backdrop
- Confirm/Cancel actions
- Hover effects on size buttons

**Styling:**

- Uses `msq-purple-rich` for selected state
- Compact design for mobile-friendly UX
- Consistent with app's design system

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

## Custom Hooks

### useCartDrawer

**File:** `../../hooks/useCartDrawer.js`  
**Purpose:** Manages drawer-specific business logic and state.

**Parameters:**

- `isOpen: boolean` - Drawer visibility state
- `onClose: function` - Close callback

**Returns:**

- `isAnimating: boolean` - Animation state
- `cartItems: array` - Cart items
- `itemCount: number` - Total item count
- `subtotal: number` - Total price
- `handleBackdropClick: function` - Backdrop click handler
- `handleClearCart: function` - Clear cart handler
- `handleCheckout: function` - Checkout handler

**Features:**

- **Drawer-level concerns only** - No item-specific operations
- Animation handling
- Body scroll management
- Cart-level operations (clear, checkout)

### useCartItem

**File:** `../../hooks/useCartItem.js`  
**Purpose:** Manages item-specific cart operations and eliminates prop drilling.

**Parameters:**

- `item: object` - Cart item data

**Returns:**

- `handleQuantityChange: function` - Quantity change handler
- `handleRemove: function` - Item removal handler
- `handleSizeChange: function` - Size change handler

**Features:**

- **Item-level concerns only** - Quantity, removal, size changes
- **Eliminates prop drilling** - Components use hook directly
- Centralized item operations
- Clean separation of concerns

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

### Individual Cart Item (No Prop Drilling)

```jsx
import CartItem from '../components/cart/CartItem';

function CartPage() {
  return (
    <div>
      {cartItems.map(item => (
        <CartItem key={`${item.id}-${item.size}`} item={item} />
      ))}
    </div>
  );
}
```

### Size Editing Example

```jsx
import { useState } from 'react';
import CartItem from '../components/cart/CartItem';
import SizeSelectorModal from '../components/cart/SizeSelectorModal';

function CartItemWithSizeEditing({ item }) {
  const [showSizeModal, setShowSizeModal] = useState(false);

  return (
    <>
      <CartItem item={item} />
      {showSizeModal && (
        <SizeSelectorModal
          currentSize={item.size}
          onSizeChange={newSize => {
            // Size change handled by useCartItem hook
            setShowSizeModal(false);
          }}
          onClose={() => setShowSizeModal(false)}
        />
      )}
    </>
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

The cart uses a **reducer-backed Context pattern** that eliminates prop drilling:

### Context + Reducer Architecture

- **Cart State:** Managed by `CartProvider` with reducer pattern
- **Actions:** `addToCart`, `removeFromCart`, `updateCartItem`, `changeItemSize`, `clearCart`
- **Selectors:** `getCartItems`, `getCartItemCount`, `getCartSubtotal`
- **Hooks:** `useCartState`, `useCartDispatch` for context access

### Key Benefits

- **No Prop Drilling:** Components use hooks directly instead of passing handlers down
- **Centralized State:** Single source of truth for cart state
- **Action-Based Updates:** Predictable state changes via actions
- **Separation of Concerns:** Different hooks for different levels of operations
- **Easy Testing:** Mock hooks instead of complex prop chains

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
├── CartItem.jsx             # Individual cart item (with size editing)
├── CartItemControls.jsx     # Quantity and remove controls
├── CartSummary.jsx          # Totals and checkout
├── EmptyCartState.jsx       # Empty cart display
└── SizeSelectorModal.jsx    # Size editing modal

src/hooks/
├── useCartDrawer.js         # Drawer-level business logic
└── useCartItem.js           # Item-level business logic

src/contexts/cart/
├── cartActions.js           # Action creators
├── cartActionTypes.js       # Action type constants
├── cartReducer.js           # State reducer
├── cartSelectors.js         # State selectors
├── CartProvider.jsx         # Context provider
└── useCart.js               # Context hooks
```
