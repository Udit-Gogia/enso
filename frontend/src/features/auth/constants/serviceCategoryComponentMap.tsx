import {
  Zap,
  Droplets,
  Hammer,
  Paintbrush,
  Sparkles,
  Bug,
  AirVent,
  Wrench,
  LayoutDashboard,
  Scissors,
  Dumbbell,
  ChefHat,
  Car,
  BookOpen,
  Trophy,
  Stethoscope,
  HeartHandshake,
  Shield,
  Truck,
  Camera,
  Utensils,
  Monitor,
  Code,
  Store,
  ShoppingBasket,
  Pill,
  Cpu,
  type LucideIcon,
} from "lucide-react";

export interface ServiceCategory {
  code: string;
  name: string;
  iconName: string;
}

export interface ServiceCategoryMeta {
  code: string;
  name: string;
  icon: LucideIcon;
  /**
   * Tailwind text-color utility from the project palette. Lucide icons stroke
   * with `currentColor`, so this class colors the icon when applied via className.
   */
  colorClass: string;
}

export const CATEGORY_HOVER_CLASSES: Record<string, string> = {
  "text-amber": "hover:bg-amber/10 hover:border-amber/40",
  "text-brand-blue": "hover:bg-brand-blue/10 hover:border-brand-blue/40",
  "text-danger": "hover:bg-danger/10 hover:border-danger/40",
  "text-success": "hover:bg-success/10 hover:border-success/40",
  "text-primary": "hover:bg-primary/10 hover:border-primary/40",
  "text-ink": "hover:bg-ink/10 hover:border-ink/40",
};

export const SERVICE_CATEGORY_META: Record<string, ServiceCategoryMeta> = {
  ELECTRICIAN: {
    code: "ELECTRICIAN",
    name: "Electrician",
    icon: Zap,
    colorClass: "text-amber",
  }, // spark / power
  PLUMBER: {
    code: "PLUMBER",
    name: "Plumber",
    icon: Droplets,
    colorClass: "text-brand-blue",
  }, // water
  CARPENTER: {
    code: "CARPENTER",
    name: "Carpenter",
    icon: Hammer,
    colorClass: "text-ink",
  }, // wood / tool (neutral)
  PAINTER: {
    code: "PAINTER",
    name: "Painter",
    icon: Paintbrush,
    colorClass: "text-danger",
  }, // color / paint
  CLEANING: {
    code: "CLEANING",
    name: "Cleaning",
    icon: Sparkles,
    colorClass: "text-primary",
  }, // fresh
  PEST_CONTROL: {
    code: "PEST_CONTROL",
    name: "Pest Control",
    icon: Bug,
    colorClass: "text-success",
  }, // outdoors
  AC_REPAIR: {
    code: "AC_REPAIR",
    name: "AC Repair",
    icon: AirVent,
    colorClass: "text-brand-blue",
  }, // cool air
  APPLIANCE_REPAIR: {
    code: "APPLIANCE_REPAIR",
    name: "Appliance Repair",
    icon: Wrench,
    colorClass: "text-success",
  }, // tool (neutral)
  INTERIOR_DESIGN: {
    code: "INTERIOR_DESIGN",
    name: "Interior Design",
    icon: LayoutDashboard,
    colorClass: "text-primary",
  }, // brand / design
  SALON_BEAUTY: {
    code: "SALON_BEAUTY",
    name: "Salon & Beauty",
    icon: Scissors,
    colorClass: "text-danger",
  }, // beauty
  FITNESS_TRAINER: {
    code: "FITNESS_TRAINER",
    name: "Fitness Trainer",
    icon: Dumbbell,
    colorClass: "text-amber",
  }, // energy
  COOK: {
    code: "COOK",
    name: "Cook",
    icon: ChefHat,
    colorClass: "text-amber",
  }, // kitchen
  DRIVER: {
    code: "DRIVER",
    name: "Driver",
    icon: Car,
    colorClass: "text-primary",
  }, // transport
  TUTOR: {
    code: "TUTOR",
    name: "Tutor",
    icon: BookOpen,
    colorClass: "text-brand-blue",
  }, // education
  SPORTS_TRAINER: {
    code: "SPORTS_TRAINER",
    name: "Sports Trainer",
    icon: Trophy,
    colorClass: "text-amber",
  }, // achievement / gold
  HEALTHCARE: {
    code: "HEALTHCARE",
    name: "Healthcare",
    icon: Stethoscope,
    colorClass: "text-success",
  }, // health
  CARETAKER: {
    code: "CARETAKER",
    name: "Caretaker",
    icon: HeartHandshake,
    colorClass: "text-danger",
  }, // care
  SECURITY: {
    code: "SECURITY",
    name: "Security",
    icon: Shield,
    colorClass: "text-primary",
  }, // trust
  PACKERS_MOVERS: {
    code: "PACKERS_MOVERS",
    name: "Packers & Movers",
    icon: Truck,
    colorClass: "text-amber",
  }, // logistics
  PHOTOGRAPHER: {
    code: "PHOTOGRAPHER",
    name: "Photographer",
    icon: Camera,
    colorClass: "text-ink",
  }, // lens (neutral)
  CATERING: {
    code: "CATERING",
    name: "Catering",
    icon: Utensils,
    colorClass: "text-danger",
  }, // food / events
  IT_SUPPORT: {
    code: "IT_SUPPORT",
    name: "IT Support",
    icon: Monitor,
    colorClass: "text-primary",
  }, // tech
  SOFTWARE_SOLUTIONS: {
    code: "SOFTWARE_SOLUTIONS",
    name: "Software Solutions",
    icon: Code,
    colorClass: "text-success",
  }, // code
  HARDWARE_SHOP: {
    code: "HARDWARE_SHOP",
    name: "Hardware Shop",
    icon: Store,
    colorClass: "text-amber",
  }, // retail
  GROCERY: {
    code: "GROCERY",
    name: "Grocery",
    icon: ShoppingBasket,
    colorClass: "text-success",
  }, // produce
  MEDICAL_SUPPLIES: {
    code: "MEDICAL_SUPPLIES",
    name: "Medical Supplies",
    icon: Pill,
    colorClass: "text-danger",
  }, // pharma
  HARDWARE: {
    code: "HARDWARE",
    name: "Hardware",
    icon: Cpu,
    colorClass: "text-muted",
  }, // components (neutral)
};

/** Fallback lookup by the backend `iconName` string. Extend as categories grow. */
export const ICON_BY_NAME: Record<string, LucideIcon> = {
  zap: Zap,
  droplets: Droplets,
  hammer: Hammer,
  paintbrush: Paintbrush,
  sparkles: Sparkles,
  bug: Bug,
  "air-vent": AirVent,
  wrench: Wrench,
  "layout-dashboard": LayoutDashboard,
  scissors: Scissors,
  dumbbell: Dumbbell,
  "chef-hat": ChefHat,
  car: Car,
  "book-open": BookOpen,
  trophy: Trophy,
  stethoscope: Stethoscope,
  "heart-handshake": HeartHandshake,
  shield: Shield,
  truck: Truck,
  camera: Camera,
  utensils: Utensils,
  monitor: Monitor,
  code: Code,
  store: Store,
  "shopping-basket": ShoppingBasket,
  pill: Pill,
  cpu: Cpu,
};
