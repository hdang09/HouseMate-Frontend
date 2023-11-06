import Container from '@/components/Container';
import { useDocumentTitle } from '@/hooks';

const Profile = () => {
    useDocumentTitle('Thông Tin Cá Nhân | HouseMate');

    return <Container>Profile Page</Container>;
};

export default Profile;
