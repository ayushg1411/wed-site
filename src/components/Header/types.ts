export interface NavigationItem {
  label: string;
  href: string;
}

export interface LogoProps {
  text: string;
  href: string;
}

export interface HeaderProps {
  logo?: LogoProps;
  navigationItems?: NavigationItem[];
  scrollThreshold?: number;
  className?: string;
}