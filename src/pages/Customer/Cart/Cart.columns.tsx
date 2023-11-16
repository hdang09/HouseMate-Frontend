import { Image, Popconfirm, Tooltip, Typography } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { NotificationInstance } from 'antd/es/notification/interface';

import fallbackImage from '@/assets/images/fallback-img.png';
import config from '@/config';
import { useAppDispatch } from '@/hooks';
import { cartSlice } from '@/layouts/MainLayout/slice';
import { removeAllCartItem, removeCartItem, updateCartItem } from '@/utils/cartAPI';
import { ServiceType } from '@/components/ServiceList/ServiceItem';

import { CartType } from './Cart.type';
import * as St from './Cart.styled';

const { Text } = Typography;

const DELETE_TITLE = 'Xóa dich vụ?';
const DELETE_ALL_TITLE = 'Xóa tất cả dich vụ?';
const DELETE_DESC = 'Bạn có chắc chắn muốn xóa dich vụ này?';
const DELETE_ALL_DESC = 'Bạn có chắc chắn muốn xóa tất cả dich vụ này?';

const CartColumn = (
    api: NotificationInstance,
    checkboxList: React.MutableRefObject<React.Key[]>,
    setReload: React.Dispatch<React.SetStateAction<number>>,
) => {
    const dispatch = useAppDispatch();

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
                message: 'Lỗi',
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
                message: 'Lỗi',
                description: error.response ? error.response.data : error.message,
            });
        }
    };

    const handleDelAllCartItem = async () => {
        try {
            await removeAllCartItem();
            checkboxList.current = [];
            dispatch(cartSlice.actions.setLength(0));
            setReload((prevReload) => ++prevReload);
        } catch (error: any) {
            api.error({
                message: 'Lỗi',
                description: error.response ? error.response.data : error.message,
            });
        }
    };

    const handleDelCartItem = async (cartId: number) => {
        try {
            await removeCartItem(cartId);
            checkboxList.current = checkboxList.current.filter((id) => id !== cartId);
            dispatch(cartSlice.actions.decreaseCartLength());
            setReload((prevReload) => ++prevReload);
        } catch (error: any) {
            api.error({
                message: 'Lỗi',
                description: error.response ? error.response.data : error.message,
            });
        }
    };

    const columns: ColumnsType<CartType> = [
        {
            title: 'Dịch Vụ',
            dataIndex: 'service',
            render: (service: ServiceType) => (
                <St.CartServiceInfo to={`${config.routes.public.shop}/${service.serviceId}`}>
                    <Image
                        src={
                            service.images && service.images.length > 0
                                ? service.images[0].imageUrl
                                : ''
                        }
                        alt={service.titleName}
                        preview={false}
                        fallback={fallbackImage}
                    />
                    <Text>{service.titleName}</Text>
                </St.CartServiceInfo>
            ),
        },
        {
            title: 'Chu Kỳ',
            render: (record: CartType) => (
                <St.CartServiceVariant
                    defaultValue={record.periodId}
                    onChange={(value: number) =>
                        handleChangeVariant(record.service, record.quantity, value)
                    }
                    options={record.listPeriod
                        .sort((a, b) => a.periodValue - b.periodValue)
                        .map((item) => ({
                            value: item.periodId,
                            label: item.periodValue + ' tháng',
                        }))}
                    style={{ minWidth: 130 }}
                />
            ),
        },
        {
            title: 'Đơn Giá',
            render: (record: CartType) => {
                const item = record.listPeriod.find((item) => item.periodId === record.periodId);

                return (
                    <St.CartServicePrice>
                        {item?.originalPrice !== item?.finalPrice && (
                            <Text style={{ textDecoration: 'line-through' }}>
                                {item?.originalPrice.toLocaleString()}đ
                            </Text>
                        )}
                        <Text>{item?.finalPrice.toLocaleString()}đ</Text>
                    </St.CartServicePrice>
                );
            },
        },
        {
            title: 'Số Lượng',
            render: (record: CartType) => (
                <Tooltip title={`Đặt tối đa 9999 ${record.service.unitOfMeasure || ''}`}>
                    <St.CartServiceQuantity
                        min={1}
                        max={9999}
                        precision={0}
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
            title: (
                <Popconfirm
                    placement="bottomLeft"
                    title={DELETE_ALL_TITLE}
                    description={DELETE_ALL_DESC}
                    onCancel={handleDelAllCartItem}
                    okText="Hủy"
                    cancelText="Xác nhận"
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
                    onCancel={() => handleDelCartItem(cartId)}
                    okText="Hủy"
                    cancelText="Xác nhận"
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
