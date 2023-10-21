import { Typography } from 'antd';
import { dummy } from './Profile.dummy';
import * as St from './Profile.styled';

const { Text } = Typography;

const Profile = () => {
    return (
        <>
            <St.ProfileHeader>
                <St.ProfileName>{dummy.fullName}</St.ProfileName>
                <St.ProfileJobPosition>{dummy.position}</St.ProfileJobPosition>
                <St.ProfilePoint>
                    <Text>Điểm tin cậy:</Text>
                    <Text>{dummy.point}</Text>
                </St.ProfilePoint>
            </St.ProfileHeader>

            <St.ProfileBody>
                <St.ProfileContentWrapper>
                    <St.ProfileContentTitle>Thành tích</St.ProfileContentTitle>
                    <St.ProfileContent>
                        {dummy.achievements.map((achievement) => {
                            return (
                                <St.ProfileRow key={achievement.id}>
                                    <St.ProfileTextKey>
                                        {achievement.serviceName}:
                                    </St.ProfileTextKey>
                                    <St.ProfileTextValue>
                                        <Text>{achievement.amount}</Text>
                                        <Text>{achievement.type}</Text>
                                    </St.ProfileTextValue>
                                </St.ProfileRow>
                            );
                        })}
                    </St.ProfileContent>
                </St.ProfileContentWrapper>

                <St.ProfileContentWrapper>
                    <St.ProfileContentTitle>Báo cáo tháng</St.ProfileContentTitle>
                    <St.ProfileContent>
                        <St.ProfileRow>
                            <St.ProfileTextKey>Tháng:</St.ProfileTextKey>
                            <St.RangePickerStyled picker="month" />
                        </St.ProfileRow>

                        {dummy.achievements.map((achievement) => {
                            return (
                                <St.ProfileRow key={achievement.id}>
                                    <St.ProfileTextKey>
                                        {achievement.serviceName}:
                                    </St.ProfileTextKey>
                                    <St.ProfileTextValue>
                                        <Text>{achievement.amount}</Text>
                                        <Text>{achievement.type}</Text>
                                    </St.ProfileTextValue>
                                </St.ProfileRow>
                            );
                        })}
                    </St.ProfileContent>
                </St.ProfileContentWrapper>

                <St.ProfileContentWrapper>
                    <St.ProfileContentTitle>Thông tin cá nhân</St.ProfileContentTitle>
                    <St.ProfileContent></St.ProfileContent>
                </St.ProfileContentWrapper>
            </St.ProfileBody>
        </>
    );
};

export default Profile;
