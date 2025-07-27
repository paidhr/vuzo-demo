export interface ILogin {
  success: boolean;
  code: number;
  message: string;
  data: Data;
}
export interface Data {
  user: IUser;
  token: string;
  integration: Integration;
}
export interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  emailVerified: boolean;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  integration: string;
  emailVerificationToken: string;
  emailVerificationTokenExpiresAt: string;
}
export interface Integration {
  _id: string;
  name: string;
  website: string;
  legalName: string;
  country: string;
  isActive: boolean;
  state: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  postalCode: string;
  keys?: KeysEntity[] | null;
  createdAt: string;
  updatedAt: string;
  __v: number;
  liveWebhookUrl: string;
  testWebhookUrl: string;
}
export interface KeysEntity {
  key: Key;
  _id: string;
}
export interface Key {
  type: string;
  mode: string;
  value: string;
}
