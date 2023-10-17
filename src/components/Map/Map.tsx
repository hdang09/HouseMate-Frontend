import embedMapUrl from '@/utils/embedMapUrl';
import { MapStyled } from './Map.styled';

const Map = ({ address }: { address: string }) => {
    return (
        <MapStyled
            src={embedMapUrl(address)}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
        />
    );
};

export default Map;
