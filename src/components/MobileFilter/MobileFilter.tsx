import { Drawer } from 'antd';
import { useState } from 'react';
import { BsFilter } from 'react-icons/bs';

import Sidebar from '@/components/Sidebar';
import Checkbox from '@/components/Sidebar/Checkbox';
import Radio from '@/components/Sidebar/Radio';
import { ratingOptions, serviceOptions } from '@/components/Sidebar/Sidebar.options';
import { theme } from '@/themes';

import MobileFilterProps from './MobileFilter.type';
import { DrawerInner } from './MobileFilter.styled';

const MobileFilter = ({ checkedList, handleCheckbox, value, handleRadio }: MobileFilterProps) => {
    const [open, setOpen] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };
    return (
        <>
            <BsFilter
                onClick={showDrawer}
                size={30}
                cursor="pointer"
                color={theme.colors.textPrimary}
            />

            <Drawer title="Filter" placement="left" onClose={onClose} open={open}>
                <DrawerInner>
                    <Sidebar title="Service Category">
                        <Checkbox
                            options={serviceOptions}
                            checkedList={checkedList}
                            handleCheckbox={handleCheckbox}
                        />
                    </Sidebar>

                    <Sidebar title="Rating star">
                        <Radio options={ratingOptions} value={value} handleRadio={handleRadio} />
                    </Sidebar>
                </DrawerInner>
            </Drawer>
        </>
    );
};

export default MobileFilter;
