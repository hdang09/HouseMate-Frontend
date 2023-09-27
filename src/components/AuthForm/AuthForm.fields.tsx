import { Input } from 'antd';
import { Rule } from 'antd/es/form';
import { EyeOutlinedIcon, EyeInvisibleOutlinedIcon } from './AuthForm.styled';

export type FieldType = {
    key: number;
    label: string;
    name: string;
    rules: Rule[];
    children: JSX.Element;
};

export const loginFields: FieldType[] = [
    {
        key: 1,
        label: 'Email address',
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
        children: <Input placeholder=" " />,
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
                placeholder=" "
            />
        ),
    },
];

export const registerFields: FieldType[] = [
    {
        key: 1,
        label: 'Email address',
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
        children: <Input placeholder=" " />,
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
        children: <Input placeholder=" " />,
    },
    {
        key: 3,
        label: 'Phone Number',
        name: 'phoneNumber',
        rules: [
            {
                required: true,
                pattern: /^(0|\+?84)(3|5|7|8|9)[0-9]{8}$/,
                message: 'Please enter a valid phone number.',
            },
        ],
        children: <Input placeholder=" " />,
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
                placeholder=" "
            />
        ),
    },
];

export const forgotFields: FieldType[] = [
    {
        key: 1,
        label: 'Email address',
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
        children: <Input placeholder=" " />,
    },
];
