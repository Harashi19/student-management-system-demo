/**
 * Authentication Type Definitions
 * 
 * This file contains all TypeScript interfaces and types related to authentication,
 * including User, Role, Permission, and authentication state management.
 */

/**
 * Permission interface representing a single permission in the system
 */
export interface Permission {
  id: string;
  code: string;
  name: string;
  description?: string;
}

/**
 * Role interface representing a user role with associated permissions
 */
export interface Role {
  id: string;
  name: string;
  permissions: Permission[];
  description?: string;
}

/**
 * User interface representing an authenticated user
 */
export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  roles: Role[];
  profile_picture?: string;
  phone_number?: string;
  is_active: boolean;
  date_joined: string;
  last_login?: string;
}

/**
 * Login credentials for authentication
 */
export interface LoginCredentials {
  email: string;
  password: string;
  remember_me?: boolean;
}

/**
 * Response from authentication API endpoints
 */
export interface AuthResponse {
  access: string;
  refresh: string;
  user: User;
  requires_2fa?: boolean;
}

/**
 * Token refresh request payload
 */
export interface RefreshTokenRequest {
  refresh: string;
}

/**
 * Token refresh response
 */
export interface RefreshTokenResponse {
  access: string;
  refresh?: string;
}

/**
 * Two-factor authentication verification payload
 */
export interface TwoFactorAuthRequest {
  user_id: string;
  code: string;
}

/**
 * Two-factor authentication setup response
 */
export interface TwoFactorAuthSetup {
  qr_code: string;
  secret: string;
  backup_codes: string[];
}

/**
 * Authentication state for Redux slice
 */
export interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  requires2FA: boolean;
  pendingUserId?: string;
}

/**
 * Password change request payload
 */
export interface PasswordChangeRequest {
  old_password: string;
  new_password: string;
  confirm_password: string;
}

/**
 * Password reset request payload
 */
export interface PasswordResetRequest {
  email: string;
}

/**
 * Password reset confirmation payload
 */
export interface PasswordResetConfirm {
  token: string;
  new_password: string;
  confirm_password: string;
}

/**
 * Type guard to check if a user has a specific role
 */
export const hasRole = (user: User | null, roleName: string): boolean => {
  if (!user) return false;
  return user.roles.some((role) => role.name === roleName);
};

/**
 * Type guard to check if a user has a specific permission
 */
export const hasPermission = (user: User | null, permissionCode: string): boolean => {
  if (!user) return false;
  return user.roles.some((role) =>
    role.permissions.some((permission) => permission.code === permissionCode)
  );
};

/**
 * Helper type for role names commonly used in the application
 */
export type RoleName = 'ADMIN' | 'TEACHER' | 'STUDENT' | 'PARENT' | 'BURSAR' | 'HOSTEL_WARDEN';

/**
 * Helper type for common permission codes
 */
export type PermissionCode =
  | 'view_students'
  | 'create_students'
  | 'edit_students'
  | 'delete_students'
  | 'view_teachers'
  | 'create_teachers'
  | 'edit_teachers'
  | 'delete_teachers'
  | 'view_marks'
  | 'enter_marks'
  | 'view_attendance'
  | 'mark_attendance'
  | 'view_finance'
  | 'manage_finance'
  | 'view_hostel'
  | 'manage_hostel'
  | 'send_announcements'
  | 'manage_timetable';
