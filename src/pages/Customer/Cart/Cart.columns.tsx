import { Image, Popconfirm, Tooltip, Typography } from 'antd';
import { ColumnsType } from 'antd/es/table';

import { CartType } from './Cart.type';
import * as St from './Cart.styled';

const { Text } = Typography;

const deleteTitle = 'Delete Item?';
const deleteAllTitle = 'Delete All Items?';
const deleteDesc = 'Are you sure you want to delete this item from your cart?';
const deleteAllDesc = 'Are you sure you want to delete all items from your cart?';

const CartColumn = () => {
    // Call api period/variant service
    const variantOptions = [
        { value: 1, label: '3 months' },
        { value: 2, label: '6 months' },
        { value: 3, label: '12 months' },
    ];

    const handleChangeVariant = (value: number) => {
        console.log(`selected ${value}`);
    };

    const handleChangeQuantity = (value: number | null) => {
        console.log('changed', value);
    };

    const handleDelAllCartItem = () => {
        console.log('Deleted!');
    };

    const handleDelCartItem = (cartId: number) => {
        console.log(cartId);
    };

    const columns: ColumnsType<CartType> = [
        {
            title: 'Service',
            dataIndex: 'service',
            render: (service) => (
                <St.CartServiceInfo>
                    <Image src={service.serviceImage} alt={service.serviceName} preview={false} />
                    <Text>{service.serviceName}</Text>
                </St.CartServiceInfo>
            ),
        },
        {
            title: 'Variant',
            dataIndex: 'variant',
            render: (variant) => (
                <St.CartServiceVariant
                    defaultValue={variant.variantId}
                    onChange={handleChangeVariant}
                    options={variantOptions}
                    style={{ width: 120 }}
                />
            ),
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            render: (quantity: number) => (
                <Tooltip placement="top" title="Max 3 items">
                    <St.CartServiceQuantity
                        min={1}
                        max={3}
                        defaultValue={quantity}
                        onChange={handleChangeQuantity}
                    />
                </Tooltip>
            ),
        },
        {
            title: 'Price',
            dataIndex: 'price',
            render: (price: number) => (
                <St.CartServicePrice>{price.toLocaleString()}$</St.CartServicePrice>
            ),
        },
        {
            title: (
                <Popconfirm
                    placement="bottomLeft"
                    title={deleteAllTitle}
                    description={deleteAllDesc}
                    onConfirm={handleDelAllCartItem}
                    okText="Yes"
                    cancelText="No"
                >
                    <>
                        <St.CartServiceDelIcon size={20} cursor="pointer" />
                    </>
                </Popconfirm>
            ),
            dataIndex: 'id',
            render: (id: number) => (
                <Popconfirm
                    placement="bottomLeft"
                    title={deleteTitle}
                    description={deleteDesc}
                    onConfirm={() => handleDelCartItem(id)}
                    okText="Yes"
                    cancelText="No"
                >
                    <>
                        <St.CartServiceDelIcon size={20} cursor="pointer" />
                    </>
                </Popconfirm>
            ),
        },
    ];

    return columns;
};

export default CartColumn;
