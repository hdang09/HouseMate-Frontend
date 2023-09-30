import { useParams } from 'react-router-dom';

const ViewServiceItem = () => {
    let { serviceId } = useParams();

    return <h1>Detail service {serviceId}</h1>;
};

ViewServiceItem.propTypes = {};

export default ViewServiceItem;
