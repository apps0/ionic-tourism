import { UserRole } from "./user-role";

export class User {
  Id?: number;
  FullName?: string;
  EmailId?: string;
  PhoneNumber?: string;
  Gender?: string;
  DOB?: string;
  AdhaarId?: string;
  UserName?: string;
  Password?: string;
  Role?: UserRole;

  Address?: string;
  LicenseId?: string;
  LicenseImagePath?: string;
  LicenseImageUrl?: string;
  LatLng?: string;
  FnaType?: string;
  FnaDescription?: string;

  AdhaarIdDocImagePath?: string;
  AdhaarIdDocImageUrl?: string;
}
