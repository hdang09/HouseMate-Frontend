import {
    CheckboxCategoryProps,
    CheckboxExpirationProps,
} from '@/components/Mobile/MobileFilter/MobileFilter.type';
import Sidebar from '@/components/Sidebar';
import Checkbox from '@/components/Sidebar/Checkbox';
import { expirationOptions, serviceOptions } from '@/components/Sidebar/Sidebar.options';

const PurchasedFilter = ({
    checkedCategoryList,
    handleCategoryCheckbox,
    checkedExpirationList,
    handleExpirationCheckbox,
}: CheckboxCategoryProps & CheckboxExpirationProps) => {
    return (
        <>
            <Sidebar title="Service Category">
                <Checkbox
                    options={serviceOptions}
                    checkedList={checkedCategoryList}
                    handleCheckbox={handleCategoryCheckbox}
                />
            </Sidebar>

            <Sidebar title="Expiration date">
                <Checkbox
                    options={expirationOptions}
                    checkedList={checkedExpirationList}
                    handleCheckbox={handleExpirationCheckbox}
                />
            </Sidebar>
        </>
    );
};

export default PurchasedFilter;
