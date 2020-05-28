import User from "../../mongoose/user.schema";
import { User as IUser } from "../graphql.interfaces";

export default async function getUser(parentValue: any, args: { id: string }) {
  const userFromDB = await fetchUserFromDB(args.id);
  return mapUserForFront(userFromDB);
}

async function fetchUserFromDB(id: string) {
  return await User.findOne({ _id: id });
}

function mapUserForFront(user: IUser) {
  return { name: user.name, id: user._id };
}
