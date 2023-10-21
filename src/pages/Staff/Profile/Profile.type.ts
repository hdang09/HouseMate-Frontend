export type AchievementType = {
    id: number;
    serviceName: string;
    amount: number;
    type: string;
};

export type UserType = {
    avatar: string;
    position: string;
    fullName: string;
    phone: string;
    email: string;
    address: string;
    point: number;
    achievements: AchievementType[];
};
