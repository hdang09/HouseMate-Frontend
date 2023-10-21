import { useAppDispatch } from '@/hooks';
import * as Styled from '@/pages/Admin/CreateSingleService/CreateSingleService.styled';
import { InputNumber } from 'antd';
import { singleServiceSlice } from '../slice';

type InputPriceProps = {
    label: string;
    name: string;
    disable?: boolean;
    dependencies?: string;
};

//TODO: WAITING FOR API
const priceConfig = {
    '3_MONTH_MIN': 1.4,
    '3_MONTH_MAX': 1.8,
    '6_MONTH_MIN': 1.68,
    '6_MONTH_MAX': 2,
    '9_MONTH_MIN': 1.848,
    '9_MONTH_MAX': 2.2,
    '12_MONTH_MIN': 1.9404,
    '12_MONTH_MAX': 2.5,
};

const InputPrice = ({ label, name, disable, dependencies }: InputPriceProps) => {
    const dispatch = useAppDispatch();
    const onChange = (value: number | null) => {
        dispatch((singleServiceSlice.actions as Record<string, any>)[name](value));
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
                                    (getFieldValue(dependencies) * priceConfig['3_MONTH_MIN'] <=
                                        value &&
                                        getFieldValue(dependencies) * priceConfig['3_MONTH_MAX'] >=
                                            value)
                                ) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(
                                    new Error(
                                        `Giá của gói 3 tháng nên nằm trong khoảng ${(
                                            getFieldValue(dependencies) * priceConfig['3_MONTH_MIN']
                                        ).toLocaleString()} đ đến ${(
                                            getFieldValue(dependencies) * priceConfig['3_MONTH_MAX']
                                        ).toLocaleString()} đ`,
                                    ),
                                );
                            }
                            case '6_MONTH': {
                                if (
                                    !value ||
                                    (getFieldValue(dependencies) * priceConfig['6_MONTH_MIN'] <=
                                        value &&
                                        getFieldValue(dependencies) * priceConfig['6_MONTH_MAX'] >=
                                            value)
                                ) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(
                                    new Error(
                                        `Giá của gói 3 tháng nên nằm trong khoảng ${(
                                            getFieldValue(dependencies) * priceConfig['6_MONTH_MIN']
                                        ).toLocaleString()} đ đến ${(
                                            getFieldValue(dependencies) * priceConfig['6_MONTH_MAX']
                                        ).toLocaleString()} đ`,
                                    ),
                                );
                            }
                            case '9_MONTH': {
                                if (
                                    !value ||
                                    (getFieldValue(dependencies) * priceConfig['9_MONTH_MIN'] <=
                                        value &&
                                        getFieldValue(dependencies) * priceConfig['9_MONTH_MAX'] >=
                                            value)
                                ) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(
                                    new Error(
                                        `Giá của gói 3 tháng nên nằm trong khoảng ${(
                                            getFieldValue(dependencies) * priceConfig['9_MONTH_MIN']
                                        ).toLocaleString()} đ đến ${(
                                            getFieldValue(dependencies) * priceConfig['9_MONTH_MAX']
                                        ).toLocaleString()} đ`,
                                    ),
                                );
                            }
                            case '12_MONTH': {
                                if (
                                    !value ||
                                    (getFieldValue(dependencies) * priceConfig['12_MONTH_MIN'] <=
                                        value &&
                                        getFieldValue(dependencies) * priceConfig['12_MONTH_MAX'] >=
                                            value)
                                ) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(
                                    new Error(
                                        `Giá của gói 3 tháng nên nằm trong khoảng ${(
                                            getFieldValue(dependencies) *
                                            priceConfig['12_MONTH_MIN']
                                        ).toLocaleString()} đ đến ${(
                                            getFieldValue(dependencies) *
                                            priceConfig['12_MONTH_MAX']
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
                // defaultValue={1000}
                style={{ width: 150 }}
                formatter={(value) => ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                onChange={onChange}
                disabled={disable}
                min={1000}
            />
        </Styled.ServiceDetailForm.Item>
    );
};

export default InputPrice;
