import { RadioChangeEvent } from 'antd';
import { CheckboxValueType } from 'antd/es/checkbox/Group';

export type OptionType = {
    label: string | JSX.Element;
    value: string;
    disabled?: boolean;
};

export type CheckboxProps = {
    options: OptionType[];
    checkedList: CheckboxValueType[];
    handleCheckbox: (checkedValue: CheckboxValueType[]) => void;
};

export type RadioProps = {
    options: OptionType[];
    value: string;
    handleRadio: (e: RadioChangeEvent) => void;
};

export type SidebarProps = {
    title: string;
    children: any;
};
