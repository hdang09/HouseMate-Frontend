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
            <Sidebar title="Service Category">
                <Checkbox
                    options={serviceOptions}
                    checkedList={checkedCategoryList}
                    handleCheckbox={handleCategoryCheckbox}
                />
            </Sidebar>

            <Sidebar title="Rating star">
                <Radio options={ratingOptions} value={radioValue} handleRadio={handleRatingRadio} />
            </Sidebar>
        </>
    );
};

export default ShopFilter;
