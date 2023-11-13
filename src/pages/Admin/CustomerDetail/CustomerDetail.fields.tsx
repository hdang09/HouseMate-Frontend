import { DatePicker, Input, Select } from 'antd';
import { Rule } from 'antd/es/form';
import locale from 'antd/es/date-picker/locale/vi_VN';
import { Gender, Role } from '@/utils/enums';

import { CustomerIdentityCard } from './CustomerDetail.styled';

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

export const fields: FieldType[] = [
    {
        key: 1,
        label: 'Họ và tên',
        name: 'fullName',
        component: <Input size="large" placeholder="Nhập họ và tên" disabled />,
        halfWidth: false,
    },
    {
        key: 2,
        label: 'Ngày sinh',
        name: 'dateOfBirth',
        component: (
            <DatePicker
                size="large"
                placeholder="Chưa có ngày sinh"
                locale={locale}
                format="DD/MM/YYYY"
                disabled
                style={{ width: '100%' }}
            />
        ),
        halfWidth: true,
    },
    {
        key: 3,
        label: 'Giới tính',
        name: 'gender',
        component: (
            <Select size="large" placeholder="Chọn giới tính" disabled style={{ width: '100%' }}>
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
        component: (
            <Input
                size="large"
                placeholder="Nhập số điện thoại"
                disabled
                style={{ width: '100%' }}
            />
        ),
        halfWidth: true,
    },
    {
        key: 5,
        label: 'Chức vụ',
        name: 'role',
        initialValue: Role.CUSTOMER,
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
                <Select.Option value={Role.ADMIN}>Quản trị viên</Select.Option>
                <Select.Option value={Role.STAFF}>Nhân viên</Select.Option>
                <Select.Option value={Role.CUSTOMER}>Khách hàng</Select.Option>
            </Select>
        ),
        halfWidth: true,
    },
    {
        key: 6,
        label: 'Email',
        name: 'emailAddress',
        component: <Input size="large" placeholder="Nhập địa chỉ email" disabled />,
        halfWidth: false,
    },
    {
        key: 7,
        label: 'Địa chỉ',
        name: 'address',
        component: <Input size="large" placeholder="Chưa có địa chỉ thường trú" disabled />,
        halfWidth: false,
    },
    {
        key: 8,
        label: 'Căn cước công dân',
        name: 'identityCard',
        rules: [
            {
                required: true,
                message: 'Vui lòng nhập căn cước công dân',
            },
        ],
        component: (
            <CustomerIdentityCard size="large" placeholder="Chưa có căn cước công dân" readOnly />
        ),
        halfWidth: false,
    },
];
