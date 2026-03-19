import * as LucideIcons from "lucide-react";
import type { LucideProps } from "lucide-react";

interface DynamicIconProps extends LucideProps {
  iconName: string;
}

export function DynamicIcon({ iconName, size = 20, ...props }: DynamicIconProps) {
  const Icon = (
    LucideIcons as unknown as Record<string, React.FC<LucideProps>>
  )[iconName];

  if (!Icon) {
    return <LucideIcons.CircleDot size={size} {...props} />;
  }

  return <Icon size={size} {...props} />;
}
