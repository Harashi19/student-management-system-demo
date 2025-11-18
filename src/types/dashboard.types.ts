/**
 * Dashboard Type Definitions
 * 
 * This file contains all TypeScript interfaces and types related to dashboard
 * statistics, recent activity, and upcoming events.
 */

/**
 * Dashboard statistics for different user roles
 */
export interface DashboardStats {
  // Common statistics
  total_students?: number;
  total_teachers?: number;
  total_classes?: number;
  
  // Admin-specific statistics
  pending_approvals?: number;
  active_users?: number;
  total_staff?: number;
  
  // Teacher-specific statistics
  assigned_classes?: number;
  assigned_subjects?: number;
  pending_marks?: number;
  
  // Student-specific statistics
  attendance_rate?: number;
  average_grade?: number;
  pending_assignments?: number;
  
  // Parent-specific statistics
  children_count?: number;
  total_outstanding_fees?: number;
  
  // Financial statistics (for admin/bursar)
  total_collections?: number;
  outstanding_balance?: number;
  arrears?: number;
  
  // Hostel statistics (for hostel warden)
  total_capacity?: number;
  current_occupancy?: number;
  available_rooms?: number;
}

/**
 * Activity type enumeration
 */
export type ActivityType =
  | 'student_enrollment'
  | 'teacher_assignment'
  | 'marks_entry'
  | 'attendance_marked'
  | 'payment_received'
  | 'announcement_published'
  | 'timetable_updated'
  | 'leave_request'
  | 'transfer_request'
  | 'user_login'
  | 'user_logout';

/**
 * Recent activity item
 */
export interface RecentActivity {
  id: string;
  type: ActivityType;
  title: string;
  description: string;
  user?: {
    id: string;
    name: string;
    profile_picture?: string;
  };
  timestamp: string;
  metadata?: Record<string, any>;
}

/**
 * Event type enumeration
 */
export type EventType =
  | 'exam'
  | 'holiday'
  | 'meeting'
  | 'sports'
  | 'cultural'
  | 'parent_teacher_meeting'
  | 'assessment'
  | 'deadline'
  | 'other';

/**
 * Upcoming event item
 */
export interface UpcomingEvent {
  id: string;
  title: string;
  description?: string;
  type: EventType;
  start_date: string;
  end_date?: string;
  location?: string;
  audience?: string[];
  is_all_day?: boolean;
  created_by?: {
    id: string;
    name: string;
  };
}

/**
 * Dashboard data response combining all dashboard information
 */
export interface DashboardData {
  stats: DashboardStats;
  recent_activity: RecentActivity[];
  upcoming_events: UpcomingEvent[];
}

/**
 * Query parameters for dashboard endpoints
 */
export interface DashboardQueryParams {
  role?: string;
  limit?: number;
  days_ahead?: number;
}
