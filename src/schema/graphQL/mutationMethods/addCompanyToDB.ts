import Company from "../../mongoose/company.schema";

export default async function addCompanyToDB(
  parentValue: any,
  { name }: { name: string }
) {
  //MONGO
  const newCompany = new Company({ name }); // still not saved in db
  await newCompany.save();
  return newCompany;
}
