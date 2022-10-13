import * as React from "react";
import ProfileUser from "./ProfileUser";
import star from "../../Assets/icons/star.svg";
import phone from "../../Assets/icons/phone.svg";
import chevron from "../../Assets/icons/chevron.svg";
import userPhoto from "../../Assets/image/gus.svg";
import { getProfileUser } from "../../redux/profile-reducer";
import { connect } from "react-redux";
import { compose } from "redux";
import { useParams } from "react-router-dom";
import Fetching from "../Fetching/Fetching";
import ErrorServer from "../Errors/ErrorServer/ErrorServer";

//контейнерная компонента (HOС) для получения деталей выбранного пользователя
//и всех паретров для ее отрисовки

const ProfileUserContainer = (props) => {
  //хук получения id пользователя
  let { userId } = useParams();
  React.useEffect(() => {
    props.getProfileUser(userId);
  }, [userId]);

  return (
    <>
      {props.errorProfileUser ? (
        <ErrorServer />
      ) : props.userProfile ? (
        <div>
          <ProfileUser
            star={star}
            phone={phone}
            chevron={chevron}
            userPhoto={userPhoto}
            userProfile={props.userProfile}
          />
        </div>
      ) : (
        <Fetching />
      )}
    </>
  );
};

//получение данных из стейта
let mapStateToProps = (state) => ({
  userProfile: state.profilePage.userProfile,
  errorProfileUser: state.profilePage.errorProfileUser,
});

export default compose(connect(mapStateToProps, { getProfileUser }))(
  ProfileUserContainer
);
