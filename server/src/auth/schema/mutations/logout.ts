import UserType from "../types/user.type";

const logout = {
  type: UserType,
  resolve(parentValue: any, args: any, request: any) {
    const { user } = request;
    request.logout();
    return user;
  },
};

export default logout;
