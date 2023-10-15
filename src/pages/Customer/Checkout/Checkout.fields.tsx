import { Input } from 'antd';
import { FieldType } from '@/components/AuthForm/AuthForm.fields';
import { UserInfoType } from './Checkout.type';

const CheckoutFields = (userInfo: UserInfoType) => {
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
            children: <Input placeholder=" " readOnly={userInfo.fullName.length > 0} />,
            initialValue: userInfo.fullName,
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
            children: <Input placeholder=" " readOnly={userInfo.email.length > 0} />,
            initialValue: userInfo.email,
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
            children: <Input placeholder=" " readOnly={userInfo.address.length > 0} />,
            initialValue: userInfo.address,
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
            children: <Input placeholder=" " readOnly={userInfo.phone.length > 0} />,
            initialValue: userInfo.phone,
        },
    ];

    return checkoutFields;
};

export default CheckoutFields;
