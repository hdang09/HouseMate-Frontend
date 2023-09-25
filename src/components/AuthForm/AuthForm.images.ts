export { default as fallbackImg } from '@/assets/images/fallback-img.jpg';
import loginImg01 from '@/assets/images/form-img-01.png';
import loginImg02 from '@/assets/images/form-img-02.png';
import loginImg03 from '@/assets/images/form-img-03.png';

type Image = {
    id: number;
    src: string;
};

const images: Image[] = [
    {
        id: 1,
        src: loginImg01,
    },
    {
        id: 2,
        src: loginImg02,
    },
    {
        id: 3,
        src: loginImg03,
    },
];

export default images;
