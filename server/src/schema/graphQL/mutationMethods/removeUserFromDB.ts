import User from "../../mongoose/user.schema";

export default async function removeUserFromDB(
  parentValue: any,
  args: any
): Promise<void> {
  //MONGO
  // User.remove({name:name}) //remove all users with criteria
  // User.findOneAndRemove({name: name})
  await User.findByIdAndRemove(args.id, { useFindAndModify: false });
}
