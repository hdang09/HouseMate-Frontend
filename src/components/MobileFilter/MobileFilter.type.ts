import { RadioChangeEvent } from 'antd';
import { CheckboxValueType } from 'antd/es/checkbox/Group';

type MobileFilterProps = {
    checkedList: CheckboxValueType[];
    handleCheckbox: (checkedValue: CheckboxValueType[]) => void;
    value: string;
    handleRadio: (e: RadioChangeEvent) => void;
};

export default MobileFilterProps;
