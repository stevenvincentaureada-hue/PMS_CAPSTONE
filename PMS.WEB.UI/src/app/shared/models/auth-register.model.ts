export interface AuthRegisterRequest {
  email: string;
  password: string;
  first_name: string;
  middle_name?: string;
  last_name: string;
  address?: string;
  phone_number?: string;
  license_number?: string;
}