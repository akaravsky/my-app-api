import Employee from "../mongoose/employee.schema";
import EmployeeType from "./employee.schema";

import {
  GraphQLString,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLInt,
} from "graphql";

import removeEmployeeFromDB from "./mutationMethods/removeEmployeeFromDB";
import CompanyType from "./company.schema";
import addCompanyToDB from "./mutationMethods/addCompanyToDB";
import removeCompany from "./mutationMethods/removeCompany";
import fetchCompany from "./fetchMethods/fetchCompany";
import { signup } from "../../auth/schema/user.mutations";

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addCompany: {
      type: CompanyType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: addCompanyToDB,
    },
    deleteCompany: {
      type: CompanyType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: removeCompany,
    },
    addEmployee: {
      type: EmployeeType, //type that we return in resolve function
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: GraphQLInt },
        companyId: { type: GraphQLString },
      },
      resolve: async (
        parentValue: any,
        { name, companyId }: { name: string; companyId: string }
      ) => {
        //MONGO
        const company = await fetchCompany(null, { id: companyId });
        const newEmployee = new Employee({ name, company, likes: 0 }); // still not saved in db
        await newEmployee.save();
        return newEmployee;
      },
    },
    deleteEmployee: {
      type: EmployeeType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: removeEmployeeFromDB,
    },
    updateEmployee: {
      type: EmployeeType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        companyId: { type: GraphQLString },
      },
      resolve: async (
        parentValue: any,
        { id, name, companyId }: { id: string; name: string; companyId: string }
      ) => {
        //MONGO
        // Employee.update({name: oldName}, {name: newName}) //update all employees with criteria
        // Employee.findOneAndUpdate({name: oldName}, {name: newName})
        const company = await fetchCompany(null, { id: companyId });
        await Employee.findByIdAndUpdate(id, { name, company });
        return Employee.findById(id);
      },
    },
    addLikeToEmployee: {
      type: EmployeeType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: async (parentValue: any, { id }: { id: string }) => {
        /*const employee = await Employee.findOne({_id:id});
                  await employee.update({likes: employee.likes + 1});*/
        await Employee.update({ _id: id }, { $inc: { likes: 1 } });
      },
    },
    signup,
  },
});

export default mutation;
