import { Input } from 'antd';
import { EyeOutlinedIcon, EyeInvisibleOutlinedIcon } from './AuthForm.styled';

export type FieldType = {
    key: number;
    label: string;
    name: string;
    rules: any[];
    children: JSX.Element;
};

export const loginFields: FieldType[] = [
    {
        key: 1,
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
                message: 'Please enter at most 50 characters',
            },
        ],
        children: <Input />,
    },
    {
        key: 2,
        label: 'Password',
        name: 'password',
        rules: [
            {
                required: true,
                max: 16,
                pattern: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,16}$/,
                message:
                    'Must be 8 to 16 characters, include a number, an uppercase letter, and a lowercase letter',
            },
        ],
        children: (
            <Input.Password
                iconRender={(visible) =>
                    visible ? <EyeOutlinedIcon /> : <EyeInvisibleOutlinedIcon />
                }
            />
        ),
    },
];

export const registerFields: FieldType[] = [
    {
        key: 1,
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
                message: 'Please enter at most 50 characters',
            },
        ],
        children: <Input />,
    },
    {
        key: 2,
        label: 'Full Name',
        name: 'fullName',
        rules: [
            {
                required: true,
                min: 2,
                max: 50,
                message: 'Must be 2 to 50 characters.',
            },
        ],
        children: <Input />,
    },
    {
        key: 3,
        label: 'Phone Number',
        name: 'phone',
        rules: [
            {
                required: true,
                pattern: /^(0|\+?84)(3|5|7|8|9)[0-9]{8}$/,
                message: 'Please enter a valid phone number.',
            },
        ],
        children: <Input />,
    },
    {
        key: 4,
        label: 'Password',
        name: 'password',
        rules: [
            {
                required: true,
                max: 16,
                pattern: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,16}$/,
                message:
                    'Must be 8 to 16 characters, include a number, an uppercase letter, and a lowercase letter',
            },
        ],
        children: (
            <Input.Password
                iconRender={(visible) =>
                    visible ? <EyeOutlinedIcon /> : <EyeInvisibleOutlinedIcon />
                }
            />
        ),
    },
];
