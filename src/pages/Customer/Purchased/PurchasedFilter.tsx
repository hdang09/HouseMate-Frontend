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
            <Sidebar title="Theo Danh Mục">
                <Checkbox
                    options={serviceOptions}
                    checkedList={checkedCategoryList}
                    handleCheckbox={handleCategoryCheckbox}
                />
            </Sidebar>

            <Sidebar title="Theo Thời Hạn">
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
