import { User_user } from "../../../../__types/User";

export interface UserProfileProps {
    user: User_user;
    handleUserRefetch: () => void;
}
