import { get, post, remove } from './apiCaller';

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
