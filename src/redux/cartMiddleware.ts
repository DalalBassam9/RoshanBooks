import { Store } from 'redux';
// Remove the import statement for 'localStorage'

const cartMiddleware = (storeAPI: Store) => (next: any) => (action: any) => {
    let result = next(action);

    // If the action can change cartItemsCount, update localStorage
    if (
        action.type === 'cart/updateQuantity/fulfilled' ||
        action.type === 'cart/removeFromCart.fulfilled'||
        action.type === 'cart/addToCart.fulfilled'
    ) {
        const cartItemsCount = storeAPI.getState().cart.cartItemsCount;
        localStorage.setItem('cartItemsCount', JSON.stringify(cartItemsCount));
    
    }

    return result;
};

export default cartMiddleware;
