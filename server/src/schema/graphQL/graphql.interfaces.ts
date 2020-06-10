export interface User {
  _id: string;
  name: string;
  likes: number;
  company: CompanyInDB;
  posts: Array<Object>;
}

export interface CompanyInDB {
  _id: string;
  name: string;
}

export interface UserStatic {
  id: string;
  name: string;
  age: number;
  companyId?: string;
}

export interface Company {
  id: string;
  name: string;
  description: string;
}
