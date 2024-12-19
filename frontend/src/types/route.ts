export interface RouteItemConfig {
  path: string;
  element: React.ReactNode;
  sidebarProps?: {
    displayText: string;
    icon?: React.ReactNode;
  };
  groupName?: string;
  child?: RouteItemConfig[];
  disabled?: boolean;
}
