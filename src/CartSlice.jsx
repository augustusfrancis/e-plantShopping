
import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
    name: 'cart',

    initialState: {
        items: []
    },

    reducers: {
        addItem: (state, action) => {
            const { name, image, cost } = action.payload;

            // Check whether the plant already exists in the cart
            const existingItem = state.items.find(
                item => item.name === name
            );

            if (existingItem) {
                // Increase quantity if the plant already exists
                existingItem.quantity++;
            } else {
                // Add a new plant with quantity 1
                state.items.push({
                    name,
                    image,
                    cost,
                    quantity: 1
                });
            }
        },

        removeItem: (state, action) => {
            // Remove the plant whose name matches the payload
            state.items = state.items.filter(
                item => item.name !== action.payload
            );
        },

        updateQuantity: (state, action) => {
            const { name, quantity } = action.payload;

            // Find the plant in the cart
            const itemToUpdate = state.items.find(
                item => item.name === name
            );

            if (itemToUpdate && quantity > 0) {
                // Update the plant quantity
                itemToUpdate.quantity = quantity;
            }
        }
    }
});

// Export action creators
export const {
    addItem,
    removeItem,
    updateQuantity
} = CartSlice.actions;

// Export reducer for the Redux store
export default CartSlice.reducer;
