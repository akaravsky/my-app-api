import User from "../../mongoose/user.schema";

export default async function fetchUsers(parentValue: any, args: any) {
  const usersFromDB = await User.find({});
  return usersFromDB.map((user: any) => ({
    id: user._id,
    name: user.name,
    likes: user.likes,
    company: user.company,
  }));
}
