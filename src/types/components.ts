export interface HeroProps {
  subtitle?: string;
  title: string;
  highlightedText?: string;
  description: string;
  buttonText?: string;
  buttonHref?: string;
}

export interface CalloutProps {
  type?: 'note' | 'tip' | 'warning' | 'danger' | 'info';
  title?: string;
}

export interface TableOfContentsProps {
  items: TocItem[];
  title?: string;
  showBorder?: boolean;
  centered?: boolean;
  nested?: boolean;
  collapsible?: boolean;
  isPageNav?: boolean;
}

export interface TocItem {
  title: string;
  href: string;
  depth?: number;
  children?: TocItem[];
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export interface SidebarItem {
  title: string;
  href: string;
  items?: SidebarItem[];
}

export interface SidebarProps {
  items: SidebarItem[];
  currentPath?: string;
}

export interface BlogCardProps {
  title: string;
  description: string;
  date: string;
  readTime?: string;
  image?: string;
  href: string;
}

export interface FeatureCardProps {
  title: string;
  description: string;
  icon?: string;
  href?: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface DocNavProps {
  prev?: NavItem;
  next?: NavItem;
}

export interface HeaderProps {
  currentPath?: string;
}

export interface CloudProps {
  class?: string;
}

export interface ReadTimeProps {
  minutes: number;
}

export interface SectionHeaderProps {
  title: string;
  class?: string;
}

export interface StepProps {
  title: string;
}

export interface ExampleProps {
  title?: string;
  description?: string;
}

export interface CollapsibleProps {
  title: string;
  defaultOpen?: boolean;
  id?: string;
}

export interface TabsProps {
  labels: string[];
  defaultIndex?: number;
  id?: string;
}

export interface CodeGroupProps {
  labels: string[];
  id?: string;
}

export interface FooterProps {
  githubUrl?: string;
}
