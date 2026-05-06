export interface MenuItem {
  title: string;
  path: string;
  icon: string;
}

export interface SidebarState {
  employeeMenu: MenuItem[];
  adminMenu: MenuItem[];
}
