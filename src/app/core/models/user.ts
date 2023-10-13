export default interface User {
  id: string;
  email: string;
  name: string;
  age: number;
  address: string;
  roles?: string[];
}

export const ROLES = ['admin', 'developer', 'owner'];
