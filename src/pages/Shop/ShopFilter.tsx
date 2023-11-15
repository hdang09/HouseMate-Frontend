import {
    CheckboxCategoryProps,
    RadioRatingProps,
} from '@/components/Mobile/MobileFilter/MobileFilter.type';
import Sidebar from '@/components/Sidebar';
import Checkbox from '@/components/Sidebar/Checkbox';
import Radio from '@/components/Sidebar/Radio';
import { ratingOptions, serviceOptions } from '@/components/Sidebar/Sidebar.options';

const ShopFilter = ({
    checkedCategoryList,
    handleCategoryCheckbox,
    radioValue,
    handleRatingRadio,
}: CheckboxCategoryProps & RadioRatingProps) => {
    return (
        <>
            <Sidebar title="Theo Danh Mục">
                <Checkbox
                    options={serviceOptions}
                    checkedList={checkedCategoryList}
                    handleCheckbox={handleCategoryCheckbox}
                />
            </Sidebar>

            <Sidebar title="Đánh Giá">
                <Radio options={ratingOptions} value={radioValue} handleRadio={handleRatingRadio} />
            </Sidebar>
        </>
    );
};

export default ShopFilter;
