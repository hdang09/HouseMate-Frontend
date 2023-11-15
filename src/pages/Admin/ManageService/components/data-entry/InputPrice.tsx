import { useAppDispatch, useAppSelector } from '@/hooks';
import * as Styled from '@/pages/Admin/ManageService/CreateService.styled';
import { InputNumber } from 'antd';
import { createServiceSlice } from '../slice';

type InputPriceProps = {
    label: string;
    name: string;
    disable?: boolean;
    dependencies?: string;
    width: number;
};

const InputPrice = ({ label, name, disable, dependencies, width }: InputPriceProps) => {
    const priceConfig = useAppSelector((state) => state.createService.configPrice);
    const dispatch = useAppDispatch();
    const onChange = (value: number | null) => {
        dispatch((createServiceSlice.actions as Record<string, any>)[name](value));
    };

    return (
        <Styled.ServiceDetailForm.Item
            label={label}
            name={name}
            wrapperCol={{ offset: 0, span: 24 }}
            dependencies={dependencies ? [dependencies] : undefined}
            rules={[
                { required: true, message: 'Vui lòng điền giá tiền!!' },
                ({ getFieldValue }) => ({
                    validator(_, value) {
                        if (!dependencies) {
                            return Promise.resolve();
                        }
                        switch (name) {
                            case 'finalPrice': {
                                if (!value || getFieldValue(dependencies) >= value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(
                                    new Error('Giá ưu đãi phải thấp hơn hoặc bằng giá gốc'),
                                );
                            }
                            case '3_MONTH': {
                                if (
                                    !value ||
                                    (getFieldValue(dependencies) * priceConfig[3].min <= value &&
                                        getFieldValue(dependencies) * priceConfig[3].max >= value)
                                ) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(
                                    new Error(
                                        `Giá của gói 3 tháng nên nằm trong khoảng ${(
                                            getFieldValue(dependencies) * priceConfig[3].min
                                        ).toLocaleString()} đ đến ${(
                                            getFieldValue(dependencies) * priceConfig[3].max
                                        ).toLocaleString()} đ`,
                                    ),
                                );
                            }
                            case '6_MONTH': {
                                if (
                                    !value ||
                                    (getFieldValue(dependencies) * priceConfig[6].min <= value &&
                                        getFieldValue(dependencies) * priceConfig[6].max >= value)
                                ) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(
                                    new Error(
                                        `Giá của gói 6 tháng nên nằm trong khoảng ${(
                                            getFieldValue(dependencies) * priceConfig[6].min
                                        ).toLocaleString()} đ đến ${(
                                            getFieldValue(dependencies) * priceConfig[6].max
                                        ).toLocaleString()} đ`,
                                    ),
                                );
                            }
                            case '9_MONTH': {
                                if (
                                    !value ||
                                    (getFieldValue(dependencies) * priceConfig[9].min <= value &&
                                        getFieldValue(dependencies) * priceConfig[9].max >= value)
                                ) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(
                                    new Error(
                                        `Giá của gói 9 tháng nên nằm trong khoảng ${(
                                            getFieldValue(dependencies) * priceConfig[9].min
                                        ).toLocaleString()} đ đến ${(
                                            getFieldValue(dependencies) * priceConfig[9].max
                                        ).toLocaleString()} đ`,
                                    ),
                                );
                            }
                            case '12_MONTH': {
                                if (
                                    !value ||
                                    (getFieldValue(dependencies) * priceConfig[12].min <= value &&
                                        getFieldValue(dependencies) * priceConfig[12].max >= value)
                                ) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(
                                    new Error(
                                        `Giá của gói 12 tháng nên nằm trong khoảng ${(
                                            getFieldValue(dependencies) * priceConfig[12].min
                                        ).toLocaleString()} đ đến ${(
                                            getFieldValue(dependencies) * priceConfig[12].max
                                        ).toLocaleString()} đ`,
                                    ),
                                );
                            }
                            default:
                                return Promise.resolve();
                        }
                    },
                }),
            ]}
        >
            <InputNumber
                style={{ width: width }}
                formatter={(value) => ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                onChange={onChange}
                disabled={disable}
                min={1000}
            />
        </Styled.ServiceDetailForm.Item>
    );
};

export default InputPrice;
