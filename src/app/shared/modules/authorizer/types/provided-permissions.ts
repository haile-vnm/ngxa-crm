import { Permission } from './permission';

export default interface ProvidedPermissions {
  allow: Permission[];
  deny?: Permission[];
}
