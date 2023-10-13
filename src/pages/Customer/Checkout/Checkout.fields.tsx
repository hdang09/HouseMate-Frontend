import { Input } from 'antd';
import { FieldType } from '@/components/AuthForm/AuthForm.fields';

const CheckoutFields = () => {
    // TODO: Waiting api from be...
    const userInfo = {
        fullName: 'Dương Hoàng Nam',
        email: 'Namdh03@gmail.com',
        address: 'S205 Vinhome Grand Park, Phường Long Thạnh Mỹ, TP Thủ Đức, TP HCM',
        phone: '',
    };

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
                    readOnly={userInfo.fullName.length > 0}
                    style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}
                />
            ),
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
            children: (
                <Input
                    placeholder=" "
                    readOnly={userInfo.email.length > 0}
                    style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}
                />
            ),
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
            children: (
                <Input
                    placeholder=" "
                    readOnly={userInfo.address.length > 0}
                    style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}
                />
            ),
            initialValue: userInfo.address,
        },
        {
            key: 4,
            label: 'Phone',
            name: 'phoneNumber',
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
                    readOnly={userInfo.phone.length > 0}
                    style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}
                />
            ),
            initialValue: userInfo.phone,
        },
    ];

    return checkoutFields;
};

export default CheckoutFields;
