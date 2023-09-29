import { Role } from '@/utils/enums';

const useAuth = () => {
    let role: Role = Role.CUSTOMER;
    const loading: boolean = true;

    return { role, loading };
};

export default useAuth;
