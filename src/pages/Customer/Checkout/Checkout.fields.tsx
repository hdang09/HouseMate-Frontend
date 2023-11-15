import { Input } from 'antd';
import { theme } from '@/themes';
import { FieldType } from '@/components/AuthForm/AuthForm.fields';
import { UserInfoType } from './Checkout.type';

const validateWhitespace = (_: unknown, value: string) => {
    if (value && value.trim() === '') {
        return Promise.reject('Please enter a valid value');
    }
    return Promise.resolve();
};

const CheckoutFields = (userInfo: UserInfoType) => {
    const { fullName, emailAddress, address, phoneNumber } = userInfo;
    const disabledPlaceholderColor = theme.colors.disabledPlaceholder;

    const checkoutFields: FieldType[] = [
        {
            key: 1,
            label: 'Họ và tên',
            name: 'fullName',
            rules: [
                {
                    required: true,
                    min: 2,
                    max: 50,
                    message: 'Vui lòng nhập họ và tên từ 2 đến 50 ký tự.',
                },
                {
                    validator: validateWhitespace,
                },
            ],
            children: (
                <Input
                    placeholder=" "
                    readOnly={fullName.length > 0}
                    style={{ color: fullName.length > 0 ? disabledPlaceholderColor : 'unset' }}
                />
            ),
            initialValue: fullName,
        },
        {
            key: 2,
            label: 'Email',
            name: 'email',
            rules: [
                {
                    required: true,
                    type: 'email',
                    message: 'Vui lòng nhập đúng định dạng email.',
                },
                {
                    max: 50,
                    message: 'Email không được vượt quá 50 ký tự.',
                },
            ],
            children: (
                <Input
                    placeholder=" "
                    readOnly={emailAddress.length > 0}
                    style={{ color: emailAddress.length > 0 ? disabledPlaceholderColor : 'unset' }}
                />
            ),
            initialValue: emailAddress,
        },
        {
            key: 3,
            label: 'Số điện thoại',
            name: 'phone',
            rules: [
                {
                    required: true,
                    pattern: /^(0|\+?84)(3|5|7|8|9)[0-9]{8}$/,
                    message: 'Vui lòng nhập đúng định dạng số điện thoại.',
                },
            ],
            children: (
                <Input
                    placeholder=" "
                    readOnly={phoneNumber.length >= 10}
                    style={{ color: phoneNumber.length >= 10 ? disabledPlaceholderColor : 'unset' }}
                />
            ),
            initialValue: phoneNumber.length >= 10 ? phoneNumber : '',
        },
        {
            key: 4,
            label: 'Địa chỉ',
            name: 'address',
            rules: [
                {
                    required: true,
                    message: 'Vui lòng nhập địa chỉ của bạn.',
                },
                {
                    validator: validateWhitespace,
                },
            ],
            children: (
                <Input
                    placeholder=" "
                    readOnly={address.length > 0}
                    style={{ color: address.length > 0 ? disabledPlaceholderColor : 'unset' }}
                />
            ),
            initialValue: address,
        },
    ];

    return checkoutFields;
};

export default CheckoutFields;
