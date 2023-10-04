import { RadioChangeEvent } from 'antd';
import { CheckboxValueType } from 'antd/es/checkbox/Group';

export type CheckboxCategoryProps = {
    checkedCategoryList: CheckboxValueType[];
    handleCategoryCheckbox: (checkedValue: CheckboxValueType[]) => void;
};

export type CheckboxExpirationProps = {
    checkedExpirationList: CheckboxValueType[];
    handleExpirationCheckbox: (checkedValue: CheckboxValueType[]) => void;
};

export type RadioRatingProps = {
    radioValue: string;
    handleRatingRadio: (e: RadioChangeEvent) => void;
};
