import { DatePicker, Input, Select } from 'antd';
import { Gender } from '@/utils/enums';

import { Rule } from 'antd/es/form';
import locale from 'antd/es/date-picker/locale/vi_VN';
import TextArea from 'antd/es/input/TextArea';

type FieldType = {
    key: number;
    label: string;
    name: string;
    initialValue?: string;
    rules?: Rule[];
    component: JSX.Element;
    halfWidth?: boolean;
};

const validateWhitespace = (_: unknown, value: string) => {
    if (value && value.trim() === '') {
        return Promise.reject('Vui lòng không để trống');
    }
    return Promise.resolve();
};

const validateBirthDate = (_: unknown, value: string) => {
    if (!value) {
        return Promise.resolve();
    }

    const birthDate = new Date(value);
    const today = new Date();

    const age = today.getFullYear() - birthDate.getFullYear();

    if (age < 18) {
        return Promise.reject('Nhân viên phải đủ 18 tuổi trở lên');
    }

    return Promise.resolve();
};

export const fields: FieldType[] = [
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
        component: <Input size="large" placeholder="Nhập họ và tên" />,
        halfWidth: false,
    },
    {
        key: 2,
        label: 'Ngày sinh',
        name: 'dateOfBirth',
        rules: [
            {
                required: true,
                message: 'Vui lòng cho biết ngày sinh',
            },
            {
                validator: validateBirthDate,
            },
        ],
        component: (
            <DatePicker
                size="large"
                placeholder="Chọn ngày sinh"
                locale={locale}
                format="DD/MM/YYYY"
                style={{ width: '100%' }}
            />
        ),
        halfWidth: true,
    },
    {
        key: 3,
        label: 'Giới tính',
        name: 'gender',
        initialValue: Gender.MALE,
        rules: [
            {
                required: true,
                message: 'Vui lòng cho biết giới tính',
            },
        ],
        component: (
            <Select size="large" placeholder="Chọn giới tính" style={{ width: '100%' }}>
                <Select.Option value={Gender.MALE}>Nam</Select.Option>
                <Select.Option value={Gender.FEMALE}>Nữ</Select.Option>
                <Select.Option value={Gender.OTHER}>Khác</Select.Option>
            </Select>
        ),
        halfWidth: true,
    },
    {
        key: 4,
        label: 'Số điện thoại',
        name: 'phoneNumber',
        rules: [
            {
                required: true,
                pattern: /^(0|\+?84)(3|5|7|8|9)[0-9]{8}$/,
                message: 'Vui lòng nhập đúng định dạng số điện thoại.',
            },
        ],
        component: (
            <Input size="large" placeholder="Nhập số điện thoại" style={{ width: '100%' }} />
        ),
        halfWidth: true,
    },
    {
        key: 5,
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
        component: <Input size="large" placeholder="Chưa có địa chỉ email" disabled />,
        halfWidth: false,
    },
    {
        key: 6,
        label: 'Địa chỉ',
        name: 'address',
        rules: [
            {
                required: true,
                message: 'Vui lòng nhập địa chỉ thường trú',
            },
            {
                validator: validateWhitespace,
            },
        ],
        component: <TextArea size="large" placeholder="Nhập địa chỉ thường trú" />,
        halfWidth: false,
    },
];
