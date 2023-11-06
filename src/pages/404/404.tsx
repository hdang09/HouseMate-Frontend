import { useDocumentTitle } from '@/hooks';

const NotFound = () => {
    useDocumentTitle('Không Tìm Thấy Trang | HouseMate');

    return <h1>Not Found Page</h1>;
};

NotFound.propTypes = {};

export default NotFound;
