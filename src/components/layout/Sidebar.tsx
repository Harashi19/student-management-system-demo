import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Divider,
  Box,
  Toolbar,
} from '@mui/material';
import {
  Dashboard,
  People,
  School,
  Assignment,
  EventNote,
  Schedule,
  AttachMoney,
  Hotel,
  Announcement,
  CalendarToday,
  ExpandLess,
  ExpandMore,
} from '@mui/icons-material';
import { useAppSelector } from '@/store';
import { selectUserRoles } from '@/features/auth';

interface SidebarProps {
  drawerWidth: number;
  open: boolean;
  onClose: () => void;
  isMobile: boolean;
}

interface MenuItem {
  title: string;
  path?: string;
  icon: React.ReactNode;
  roles?: string[];
  children?: MenuItem[];
}

/**
 * Sidebar Component
 * Collapsible navigation sidebar with role-based menu items
 */
export const Sidebar = ({ drawerWidth, open, onClose, isMobile }: SidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const userRoles = useAppSelector(selectUserRoles);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  /**
   * Menu items configuration with role-based visibility
   */
  const menuItems: MenuItem[] = [
    {
      title: 'Dashboard',
      path: '/',
      icon: <Dashboard />,
    },
    {
      title: 'Students',
      icon: <People />,
      roles: ['ADMIN', 'TEACHER'],
      children: [
        { title: 'Student List', path: '/students', icon: <People /> },
        { title: 'Add Student', path: '/students/new', icon: <People />, roles: ['ADMIN'] },
        { title: 'Transfers', path: '/students/transfers', icon: <People />, roles: ['ADMIN'] },
      ],
    },
    {
      title: 'Teachers',
      icon: <School />,
      roles: ['ADMIN'],
      children: [
        { title: 'Teacher List', path: '/teachers', icon: <School /> },
        { title: 'Add Teacher', path: '/teachers/new', icon: <School /> },
        { title: 'Departments', path: '/teachers/departments', icon: <School /> },
      ],
    },
    {
      title: 'Academics',
      icon: <Assignment />,
      children: [
        { title: 'Marks Entry', path: '/academics/marks', icon: <Assignment />, roles: ['ADMIN', 'TEACHER'] },
        { title: 'Assessments', path: '/academics/assessments', icon: <Assignment />, roles: ['ADMIN', 'TEACHER'] },
        { title: 'Analytics', path: '/academics/analytics', icon: <Assignment />, roles: ['ADMIN', 'TEACHER'] },
        { title: 'Report Cards', path: '/academics/reports', icon: <Assignment /> },
      ],
    },
    {
      title: 'Attendance',
      icon: <EventNote />,
      children: [
        { title: 'Mark Attendance', path: '/attendance/mark', icon: <EventNote />, roles: ['ADMIN', 'TEACHER'] },
        { title: 'View Attendance', path: '/attendance/view', icon: <EventNote /> },
        { title: 'Reports', path: '/attendance/reports', icon: <EventNote />, roles: ['ADMIN', 'TEACHER'] },
      ],
    },
    {
      title: 'Timetable',
      icon: <Schedule />,
      children: [
        { title: 'View Timetable', path: '/timetable/view', icon: <Schedule /> },
        { title: 'Generate Timetable', path: '/timetable/generate', icon: <Schedule />, roles: ['ADMIN'] },
      ],
    },
    {
      title: 'Finance',
      icon: <AttachMoney />,
      roles: ['ADMIN', 'BURSAR'],
      children: [
        { title: 'Dashboard', path: '/finance', icon: <AttachMoney /> },
        { title: 'Payments', path: '/finance/payments', icon: <AttachMoney /> },
        { title: 'Reports', path: '/finance/reports', icon: <AttachMoney /> },
      ],
    },
    {
      title: 'Hostel',
      icon: <Hotel />,
      roles: ['ADMIN', 'HOSTEL_WARDEN'],
      children: [
        { title: 'Dashboard', path: '/hostel', icon: <Hotel /> },
        { title: 'Room Allocation', path: '/hostel/allocations', icon: <Hotel /> },
        { title: 'Attendance', path: '/hostel/attendance', icon: <Hotel /> },
        { title: 'Leave Passes', path: '/hostel/passes', icon: <Hotel /> },
      ],
    },
    {
      title: 'Communication',
      icon: <Announcement />,
      children: [
        { title: 'Announcements', path: '/communication/announcements', icon: <Announcement /> },
        { title: 'Messages', path: '/communication/messages', icon: <Announcement /> },
        { title: 'Calendar', path: '/communication/calendar', icon: <CalendarToday /> },
      ],
    },
  ];

  /**
   * Check if user has required role for menu item
   */
  const hasAccess = (item: MenuItem): boolean => {
    if (!item.roles || item.roles.length === 0) return true;
    return item.roles.some((role) => userRoles.includes(role));
  };

  /**
   * Handle menu item click
   */
  const handleItemClick = (item: MenuItem) => {
    if (item.children) {
      // Toggle expansion for items with children
      setExpandedItems((prev) =>
        prev.includes(item.title) ? prev.filter((i) => i !== item.title) : [...prev, item.title]
      );
    } else if (item.path) {
      // Navigate to path
      navigate(item.path);
      if (isMobile) {
        onClose();
      }
    }
  };

  /**
   * Check if path is active
   */
  const isActive = (path?: string): boolean => {
    if (!path) return false;
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  /**
   * Render menu item
   */
  const renderMenuItem = (item: MenuItem, depth: number = 0) => {
    if (!hasAccess(item)) return null;

    const isExpanded = expandedItems.includes(item.title);
    const active = isActive(item.path);

    return (
      <div key={item.title}>
        <ListItem disablePadding sx={{ display: 'block' }}>
          <ListItemButton
            onClick={() => handleItemClick(item)}
            selected={active}
            sx={{
              pl: 2 + depth * 2,
              minHeight: 48,
              justifyContent: open ? 'initial' : 'center',
              px: 2.5,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : 'auto',
                justifyContent: 'center',
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.title} sx={{ opacity: open ? 1 : 0 }} />
            {item.children && open && (isExpanded ? <ExpandLess /> : <ExpandMore />)}
          </ListItemButton>
        </ListItem>

        {/* Render children if expanded */}
        {item.children && (
          <Collapse in={isExpanded && open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {item.children.map((child) => renderMenuItem(child, depth + 1))}
            </List>
          </Collapse>
        )}
      </div>
    );
  };

  const drawerContent = (
    <Box>
      <Toolbar />
      <Divider />
      <List>{menuItems.map((item) => renderMenuItem(item))}</List>
    </Box>
  );

  return (
    <Drawer
      variant={isMobile ? 'temporary' : 'persistent'}
      open={open}
      onClose={onClose}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
      ModalProps={{
        keepMounted: true, // Better mobile performance
      }}
    >
      {drawerContent}
    </Drawer>
  );
};
