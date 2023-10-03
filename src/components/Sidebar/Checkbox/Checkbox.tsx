import { Checkbox as AntCheckbox } from 'antd';
import { CheckboxProps } from '@/components/Sidebar/Sidebar.type';
import { CategoryContent } from './Checkbox.styled';

const Checkbox = ({ options, checkedList, handleCheckbox }: CheckboxProps) => {
    return (
        <CategoryContent>
            <AntCheckbox.Group options={options} value={checkedList} onChange={handleCheckbox} />
        </CategoryContent>
    );
};

export default Checkbox;
