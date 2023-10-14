import { get, post, put, remove } from './apiCaller';

export const addToCart = (service: object) => {
    return post('/cart/add', service);
};

export const getCart = () => {
    return get('/cart/');
};

export const removeCartItem = (cartId: number) => {
    return remove(`/cart/remove/${cartId}`);
};

export const removeAllCartItem = () => {
    return remove(`/cart/remove/all`);
};

export const updateCartItem = (service: object) => {
    return put('/cart/update', service);
};
