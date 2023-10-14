import { Image, Popconfirm, Typography } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { NotificationInstance } from 'antd/es/notification/interface';

import serviceImage from '@/assets/images/service-img.webp';
import { removeAllCartItem, removeCartItem } from '@/utils/cartAPI';

import { CartType } from './Cart.type';
import * as St from './Cart.styled';

const { Text } = Typography;

const DELETE_TITLE = 'Delete Item?';
const DELETE_ALL_TITLE = 'Delete All Items?';
const DELETE_DESC = 'Are you sure you want to delete this item from your cart?';
const DELETE_ALL_DESC = 'Are you sure you want to delete all items from your cart?';

const CartColumn = (
    api: NotificationInstance,
    setReload: React.Dispatch<React.SetStateAction<number>>,
) => {
    // Call api period/variant service (Dummy)
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

    const handleDelAllCartItem = async () => {
        try {
            await removeAllCartItem();
            setReload((prevReload) => ++prevReload);
        } catch (error: any) {
            if (error.response) api.error(error.response.data);
            else api.error(error.message);
        }
    };

    const handleDelCartItem = async (cartId: number) => {
        try {
            await removeCartItem(cartId);
            setReload((prevReload) => ++prevReload);
        } catch (error: any) {
            if (error.response) api.error(error.response.data);
            else api.error(error.message);
        }
    };

    const columns: ColumnsType<CartType> = [
        {
            title: 'Service',
            dataIndex: 'service',
            render: (service) => (
                <St.CartServiceInfo>
                    <Image
                        src={service.image || serviceImage}
                        alt={service.titleName}
                        preview={false}
                    />
                    <Text>{service.titleName}</Text>
                </St.CartServiceInfo>
            ),
        },
        {
            title: 'Variant',
            dataIndex: 'periodId',
            render: (periodId: number) => (
                <St.CartServiceVariant
                    defaultValue={periodId}
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
                <St.CartServiceQuantity
                    min={1}
                    defaultValue={quantity}
                    onChange={handleChangeQuantity}
                />
            ),
        },
        {
            title: 'Price',
            dataIndex: 'service',
            render: (service) => (
                <St.CartServicePrice>
                    {service.originalPrice !== service.salePrice && (
                        <Text style={{ textDecoration: 'line-through' }}>
                            {service.originalPrice.toLocaleString()}$
                        </Text>
                    )}
                    <Text>{service.salePrice.toLocaleString()}$</Text>
                </St.CartServicePrice>
            ),
        },
        {
            title: (
                <Popconfirm
                    placement="bottomLeft"
                    title={DELETE_ALL_TITLE}
                    description={DELETE_ALL_DESC}
                    onConfirm={handleDelAllCartItem}
                    okText="Yes"
                    cancelText="No"
                >
                    <>
                        <St.CartServiceDelIcon size={20} cursor="pointer" />
                    </>
                </Popconfirm>
            ),
            dataIndex: 'cartId',
            render: (cartId: number) => (
                <Popconfirm
                    placement="bottomLeft"
                    title={DELETE_TITLE}
                    description={DELETE_DESC}
                    onConfirm={() => handleDelCartItem(cartId)}
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
