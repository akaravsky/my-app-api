import { GraphQLList } from "graphql";
import CompanyType from "./company.schema";

const Companies = new GraphQLList(CompanyType);

export default Companies;
