export interface User {
  _id: string;
  name: string;
  likes: number;
  posts: Array<Object>;
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
