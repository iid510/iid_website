import {
  Phone, Mail, Globe, MessageCircle, Send, Clock, CheckCircle,
  MapPin, ArrowRight, Users, CalendarDays, Flag, BookOpen, Heart,
  Megaphone, Crown, Shirt, Sun, AlertCircle, Building2, Wrench,
  type LucideIcon,
} from "lucide-react";

export const ICON_MAP: Record<string, LucideIcon> = {
  Phone, Mail, Globe, MessageCircle, Send, Clock, CheckCircle,
  MapPin, ArrowRight, Users, CalendarDays, Flag, BookOpen, Heart,
  Megaphone, Crown, Shirt, Sun, AlertCircle, Building2, Wrench,
};

export function resolveIcon(name: string | undefined | null): LucideIcon {
  if (name && ICON_MAP[name]) return ICON_MAP[name];
  return CheckCircle;
}
