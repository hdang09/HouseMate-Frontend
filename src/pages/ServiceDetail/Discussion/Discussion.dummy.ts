import userImage from '@/assets/images/user-img.jpg';
import { CommentType } from './Discussion.type';

const DiscussionDummy: CommentType[] = [
    {
        commentId: 24,
        serviceId: 1,
        userId: 30,
        text: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
        date: '2023-10-08T14:22:53',
        listReplyComment: [
            {
                replyId: 7,
                commentId: 24,
                userId: 31,
                text: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure)',
                date: '2023-10-08T17:35:36',
                userDetail: {
                    userId: 31,
                    fullName: 'Dương Hoàng Nam',
                    avatar: userImage,
                },
            },
        ],
        userDetail: {
            userId: 30,
            fullName: 'Lâm Thị Ngọc Hân',
            avatar: userImage,
        },
    },
    {
        commentId: 25,
        serviceId: 1,
        userId: 30,
        text: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
        date: '2023-10-08T14:22:53',
        listReplyComment: [
            {
                replyId: 8,
                commentId: 25,
                userId: 31,
                text: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure)',
                date: '2023-10-08T14:35:36',
                userDetail: {
                    userId: 31,
                    fullName: 'Dương Hoàng Nam',
                    avatar: userImage,
                },
            },
        ],
        userDetail: {
            userId: 30,
            fullName: 'Lâm Thị Ngọc Hân',
            avatar: userImage,
        },
    },
];

export default DiscussionDummy;
