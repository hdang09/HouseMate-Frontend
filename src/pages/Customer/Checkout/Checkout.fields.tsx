import { Input } from 'antd';
import { theme } from '@/themes';
import { FieldType } from '@/components/AuthForm/AuthForm.fields';
import { UserInfoType } from './Checkout.type';

const CheckoutFields = (userInfo: UserInfoType) => {
    const { fullName, emailAddress, address, phoneNumber } = userInfo;
    const disabledPlaceholderColor = theme.colors.disabledPlaceholder;

    const checkoutFields: FieldType[] = [
        {
            key: 1,
            label: 'Name',
            name: 'fullName',
            rules: [
                {
                    required: true,
                    min: 2,
                    max: 50,
                    message: 'Must be 2 to 50 characters.',
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
                    message: 'Please enter a valid email address.',
                },
                {
                    max: 50,
                    message: 'Please enter at most 50 characters.',
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
            label: 'Address',
            name: 'address',
            rules: [
                {
                    required: true,
                    message: 'Please enter your address.',
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
        {
            key: 4,
            label: 'Phone',
            name: 'phone',
            rules: [
                {
                    required: true,
                    pattern: /^(0|\+?84)(3|5|7|8|9)[0-9]{8}$/,
                    message: 'Please enter a valid phone number.',
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
    ];

    return checkoutFields;
};

export default CheckoutFields;
