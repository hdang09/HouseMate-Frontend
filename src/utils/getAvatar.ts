import { JwtType } from '@/hooks/useAuth';
import cookieUtils from './cookieUtils';
import { getInfoUser } from './accountAPI';

const getAvatar = (): string => {
    const token = cookieUtils.getToken();

    // If there is no token, return an empty string
    if (!token) return '';

    const jwt = cookieUtils.decodeJwt() as JwtType;

    if (!jwt) return '';

    var avatar = '';

    try {
        getInfoUser(jwt.payload.id)
            .then(({ data }) => {
                avatar = data.avatar;
                return avatar;
            })
            .catch((error) => {
                console.log(error);
            });
    } catch (error) {
        console.log(error);
    }

    console.log(avatar); // return empty

    return avatar;
};

export default getAvatar;
