import type { ComponentType, SVGProps } from 'react';
import {
  ArrowRight,
  Award,
  BookOpen,
  Brain,
  Briefcase,
  CalendarDays,
  ChartNoAxesCombined,
  Clock3,
  Code2,
  Coffee,
  Database,
  ExternalLink,
  FolderGit2,
  Globe2,
  GraduationCap,
  Heart,
  Home,
  Layers3,
  Lightbulb,
  Linkedin,
  Mail,
  MapPin,
  Mic,
  PenLine,
  Sparkles,
  Target,
  Terminal,
  Trophy,
  Users,
  type LucideIcon,
} from 'lucide-react';
import {
  SiFacebook,
  SiGit,
  SiGithub,
  SiGooglecolab,
  SiInstagram,
  SiKaggle,
  SiLangchain,
  SiNumpy,
  SiPython,
  SiPytorch,
  SiTensorflow,
  SiX,
} from 'react-icons/si';
import type { IconName } from '@/data/content';

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

const lucideIcons: Partial<Record<IconName, LucideIcon>> = {
  home: Home,
  briefcase: Briefcase,
  trophy: Trophy,
  brain: Brain,
  folder: FolderGit2,
  users: Users,
  pen: PenLine,
  mic: Mic,
  mail: Mail,
  linkedin: Linkedin,
  mapPin: MapPin,
  calendar: CalendarDays,
  graduationCap: GraduationCap,
  clock: Clock3,
  globe: Globe2,
  code: Code2,
  sparkles: Sparkles,
  award: Award,
  arrowRight: ArrowRight,
  externalLink: ExternalLink,
  lightbulb: Lightbulb,
  database: Database,
  terminal: Terminal,
  layers: Layers3,
  chart: ChartNoAxesCombined,
  book: BookOpen,
  target: Target,
  coffee: Coffee,
  heart: Heart,
};

const brandIcons: Partial<Record<IconName, IconComponent>> = {
  github: SiGithub as unknown as IconComponent,
  kaggle: SiKaggle as unknown as IconComponent,
  facebook: SiFacebook as unknown as IconComponent,
  instagram: SiInstagram as unknown as IconComponent,
  x: SiX as unknown as IconComponent,
  python: SiPython as unknown as IconComponent,
  pytorch: SiPytorch as unknown as IconComponent,
  tensorflow: SiTensorflow as unknown as IconComponent,
  numpy: SiNumpy as unknown as IconComponent,
  git: SiGit as unknown as IconComponent,
  googlecolab: SiGooglecolab as unknown as IconComponent,
  langchain: SiLangchain as unknown as IconComponent,
};

export function Icon({
  name,
  className,
}: {
  name: IconName;
  className?: string;
}) {
  const Component =
    (lucideIcons[name] as IconComponent | undefined) ??
    brandIcons[name] ??
    (Sparkles as IconComponent);

  return <Component className={className} aria-hidden="true" />;
}
