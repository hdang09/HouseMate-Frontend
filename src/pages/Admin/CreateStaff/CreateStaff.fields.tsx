import { DatePicker, Input, Select } from 'antd';
import { Rule } from 'antd/es/form';
import locale from 'antd/es/date-picker/locale/vi_VN';

type FieldType = {
    key: number;
    label: string;
    name: string;
    initialValue?: string;
    rules: Rule[];
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
                message: 'Vui lòng nhập họ và tên',
            },
            {
                min: 2,
                message: 'Họ và tên phải có ít nhất 2 ký tự',
            },
            {
                max: 50,
                message: 'Họ và tên không được dài quá 50 ký tự',
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
                style={{ width: '100%' }}
            />
        ),
        halfWidth: true,
    },
    {
        key: 3,
        label: 'Giới tính',
        name: 'sex',
        initialValue: 'male',
        rules: [
            {
                required: true,
                message: 'Vui lòng cho biết giới tính',
            },
            {
                validator: validateWhitespace,
            },
        ],
        component: (
            <Select size="large" placeholder="Chọn giới tính" style={{ width: '100%' }}>
                <Select.Option value="male">Nam</Select.Option>
                <Select.Option value="female">Nữ</Select.Option>
                <Select.Option value="other">Khác</Select.Option>
            </Select>
        ),
        halfWidth: true,
    },
    {
        key: 4,
        label: 'Số điện thoại',
        name: 'phone',
        rules: [
            {
                required: true,
                message: 'Vui lòng nhập số điện thoại',
            },
            {
                pattern: /^(0|\+?84)(3|5|7|8|9)[0-9]{8}$/,
                message: 'Vui lòng nhập số điện thoại hợp lệ',
            },
        ],
        component: (
            <Input size="large" placeholder="Nhập số điện thoại" style={{ width: '100%' }} />
        ),
        halfWidth: true,
    },
    {
        key: 5,
        label: 'Chức vụ',
        name: 'position',
        initialValue: 'staff',
        rules: [
            {
                required: true,
                message: 'Vui lòng cho biết chức vụ',
            },
            {
                validator: validateWhitespace,
            },
        ],
        component: (
            <Select size="large" placeholder="Chọn chức vụ" style={{ width: '100%' }}>
                <Select.Option value="admin">Quản trị viên</Select.Option>
                <Select.Option value="staff">Nhân viên</Select.Option>
                <Select.Option value="customer">Khách hàng</Select.Option>
            </Select>
        ),
        halfWidth: true,
    },
    {
        key: 6,
        label: 'Email',
        name: 'email',
        rules: [
            {
                required: true,
                message: 'Vui lòng nhập địa chỉ email',
            },
            {
                type: 'email',
                message: 'Vui lòng nhập địa chỉ email hợp lệ',
            },
            {
                max: 50,
                message: 'Email không được dài quá 50 ký tự',
            },
        ],
        component: <Input size="large" placeholder="Nhập địa chỉ email" />,
        halfWidth: false,
    },
    {
        key: 7,
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
        component: <Input size="large" placeholder="Nhập địa chỉ thường trú" />,
        halfWidth: false,
    },
];
