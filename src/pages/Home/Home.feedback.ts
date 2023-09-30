import userImg from '@/assets/images/user-img.jpg';

type feedbackType = {
    key: number;
    description: string;
    image: string;
    username: string;
    variation: string;
    star: number;
};

export const feedbacks: feedbackType[] = [
    {
        key: 1,
        description: `I was extremely pleased with the cleaning service provided
        by Cleaning Service. They were punctual, thorough, and used
        high-quality products, making my home spotless and leaving
        me highly satisfied with their service.`,
        image: userImg,
        username: 'Lam Thi Ngoc Han',
        variation: 'Mama at home',
        star: 5,
    },
    {
        key: 2,
        description: `I was extremely pleased with the cleaning service provided
        by Cleaning Service. They were punctual, thorough, and used
        high-quality products, making my home spotless and leaving
        me highly satisfied with their service.`,
        image: userImg,
        username: 'Duong Hoang Nam',
        variation: 'Laundry',
        star: 4,
    },
    {
        key: 3,
        description: `I was extremely pleased with the cleaning service provided
        by Cleaning Service. They were punctual, thorough, and used
        high-quality products, making my home spotless and leaving
        me highly satisfied with their service.`,
        image: userImg,
        username: 'Tran Hai Dang',
        variation: 'Water delivery',
        star: 3,
    },
    {
        key: 4,
        description: `I was extremely pleased with the cleaning service provided
        by Cleaning Service. They were punctual, thorough, and used
        high-quality products, making my home spotless and leaving
        me highly satisfied with their service.`,
        image: userImg,
        username: 'Tran Tan Thanh',
        variation: 'Rice delivery',
        star: 2,
    },
    {
        key: 5,
        description: `I was extremely pleased with the cleaning service provided
        by Cleaning Service. They were punctual, thorough, and used
        high-quality products, making my home spotless and leaving
        me highly satisfied with their service.`,
        image: userImg,
        username: 'Nguyen Hoang Anh',
        variation: 'Cleaning house',
        star: 1,
    },
];
