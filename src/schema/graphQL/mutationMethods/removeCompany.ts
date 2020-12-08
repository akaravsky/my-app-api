import Company from "../../mongoose/company.schema";

export default async function removeCompany(
  parentValue: any,
  args: any
): Promise<void> {
  await Company.findByIdAndRemove(args.id, { useFindAndModify: false });
}
