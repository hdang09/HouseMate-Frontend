import * as St from './ViewServiceList.styled';

import ServiceList from '@/components/ServiceList';

const ViewServiceList: React.FC = () => {
    const temp = [1, 2, 3, 4, 5, 6, 7];

    return (
        <>
            <St.WebTitle level={1}>View service list</St.WebTitle>
            <ServiceList services={temp} />
        </>
    );
};

export default ViewServiceList;
