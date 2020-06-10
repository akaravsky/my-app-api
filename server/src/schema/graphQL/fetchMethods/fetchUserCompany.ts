import { User } from "../graphql.interfaces";
import fetchCompany from "./fetchCompany";

export default async (user: User, args: any) => {
  const companyId = user?.company?._id;
  const company = await fetchCompany(null, { id: companyId });
  return company;
};
