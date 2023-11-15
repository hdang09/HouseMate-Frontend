import { get, post } from './apiCaller';

export const createCheckout = (listCartId: { listCartId: number[] }) => {
    return post('/checkout/create', listCartId);
};

export const getCheckout = () => {
    return get('/checkout');
};
