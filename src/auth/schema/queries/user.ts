import UserType from "../types/user.type";

const user = {
  type: UserType,
  resolve(parentValue: any, args: any, request: any) {
    return request.user;
  },
};

export default user;
