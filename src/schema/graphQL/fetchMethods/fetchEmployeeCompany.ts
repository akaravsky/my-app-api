import { Employee } from "../graphql.interfaces";
import fetchCompany from "./fetchCompany";

export default async (employee: Employee, args: any) => {
  const companyId = employee?.company?._id;
  const company = await fetchCompany(null, { id: companyId });
  return company;
};
