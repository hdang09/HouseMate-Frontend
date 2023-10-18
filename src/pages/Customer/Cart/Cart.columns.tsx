import { Image, Popconfirm, Tooltip, Typography } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { NotificationInstance } from 'antd/es/notification/interface';
import { useEffect, useState } from 'react';

import serviceImage from '@/assets/images/service-img.webp';
import config from '@/config';
import { removeAllCartItem, removeCartItem, updateCartItem } from '@/utils/cartAPI';
import { getAllPeriod } from '@/utils/periodAPI';

import { CartType, PeriodType, ServiceType } from './Cart.type';
import * as St from './Cart.styled';

const { Text } = Typography;

const DELETE_TITLE = 'Delete Item?';
const DELETE_ALL_TITLE = 'Delete All Items?';
const DELETE_DESC = 'Are you sure you want to delete this item from your cart?';
const DELETE_ALL_DESC = 'Are you sure you want to delete all items from your cart?';

const CartColumn = (
    api: NotificationInstance,
    checkboxList: React.MutableRefObject<React.Key[]>,
    setReload: React.Dispatch<React.SetStateAction<number>>,
) => {
    const [periodOptions, setPeriodOptions] = useState<PeriodType[]>([]);

    // Call api period/variant service
    useEffect(() => {
        (async () => {
            try {
                const { data } = await getAllPeriod();

                const periods = data.map((period: PeriodType) => ({
                    ...periodOptions,
                    value: period.periodId,
                    label: period.periodName,
                }));

                setPeriodOptions(periods);
            } catch (error: any) {
                api.error({
                    message: 'Error',
                    description: error.response ? error.response.data : error.message,
                });
            }
        })();
    }, []);

    const handleChangeVariant = async (service: ServiceType, quantity: number, value: number) => {
        try {
            const cartItem = {
                serviceId: service.serviceId,
                quantity,
                periodId: value,
            };
            await updateCartItem(cartItem);
            setReload((prevReload) => ++prevReload);
        } catch (error: any) {
            api.error({
                message: 'Error',
                description: error.response ? error.response.data : error.message,
            });
        }
    };

    const handleChangeQuantity = async (
        service: ServiceType,
        periodId: number,
        value: number | null,
    ) => {
        try {
            // TODO: Handle value to debounce value
            const cartItem = {
                serviceId: service.serviceId,
                quantity: value,
                periodId,
            };
            await updateCartItem(cartItem);
            setReload((prevReload) => ++prevReload);
        } catch (error: any) {
            api.error({
                message: 'Error',
                description: error.response ? error.response.data : error.message,
            });
        }
    };

    const handleDelAllCartItem = async () => {
        try {
            await removeAllCartItem();
            checkboxList.current = [];
            setReload((prevReload) => ++prevReload);
        } catch (error: any) {
            api.error({
                message: 'Error',
                description: error.response ? error.response.data : error.message,
            });
        }
    };

    const handleDelCartItem = async (cartId: number) => {
        try {
            await removeCartItem(cartId);
            checkboxList.current = checkboxList.current.filter((id) => id !== cartId);
            setReload((prevReload) => ++prevReload);
        } catch (error: any) {
            api.error({
                message: 'Error',
                description: error.response ? error.response.data : error.message,
            });
        }
    };

    const columns: ColumnsType<CartType> = [
        {
            title: 'Service',
            dataIndex: 'service',
            render: (service) => (
                <St.CartServiceInfo to={`${config.routes.public.shop}/${service.serviceId}`}>
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
            render: (record: CartType) => (
                <St.CartServiceVariant
                    defaultValue={record.periodId}
                    onChange={(value: number) =>
                        handleChangeVariant(record.service, record.quantity, value)
                    }
                    options={periodOptions}
                    style={{ width: 120 }}
                />
            ),
        },
        {
            title: 'Quantity',
            render: (record: CartType) => (
                <Tooltip title="Max 9999 items">
                    <St.CartServiceQuantity
                        min={1}
                        max={9999}
                        defaultValue={record.quantity}
                        onChange={(value: number | null) =>
                            // TODO: Handle use debounce for value
                            handleChangeQuantity(record.service, record.periodId, value)
                        }
                    />
                </Tooltip>
            ),
        },
        {
            title: 'Price',
            render: (record: CartType) => (
                <St.CartServicePrice>
                    {record.originPrice !== record.finalPrice && (
                        <Text style={{ textDecoration: 'line-through' }}>
                            {record.originPrice.toLocaleString()}đ
                        </Text>
                    )}
                    <Text>{record.finalPrice.toLocaleString()}đ</Text>
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
