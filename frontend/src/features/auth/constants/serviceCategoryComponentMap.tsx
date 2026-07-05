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

/**
 * Keyed by ServiceCategory.code. Colors are pulled from the project palette only.
 * NOTE: the palette has ~8 usable hues, so with 27 categories many colors repeat.
 * Assignment is by closest semantic fit, not uniqueness.
 */
export const SERVICE_CATEGORY_META: Record<string, ServiceCategoryMeta> = {
  ELECTRICIAN: {
    code: "ELECTRICIAN",
    name: "Electrician",
    icon: Zap,
    colorClass: "text-accent-amber",
  }, // spark / power
  PLUMBER: {
    code: "PLUMBER",
    name: "Plumber",
    icon: Droplets,
    colorClass: "text-google-blue",
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
    colorClass: "text-google-red",
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
    colorClass: "text-accent-green",
  }, // outdoors
  AC_REPAIR: {
    code: "AC_REPAIR",
    name: "AC Repair",
    icon: AirVent,
    colorClass: "text-google-blue",
  }, // cool air
  APPLIANCE_REPAIR: {
    code: "APPLIANCE_REPAIR",
    name: "Appliance Repair",
    icon: Wrench,
    colorClass: "text-muted",
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
    colorClass: "text-google-red",
  }, // beauty
  FITNESS_TRAINER: {
    code: "FITNESS_TRAINER",
    name: "Fitness Trainer",
    icon: Dumbbell,
    colorClass: "text-accent-amber",
  }, // energy
  COOK: {
    code: "COOK",
    name: "Cook",
    icon: ChefHat,
    colorClass: "text-accent-amber",
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
    colorClass: "text-google-blue",
  }, // education
  SPORTS_TRAINER: {
    code: "SPORTS_TRAINER",
    name: "Sports Trainer",
    icon: Trophy,
    colorClass: "text-google-yellow",
  }, // achievement / gold
  HEALTHCARE: {
    code: "HEALTHCARE",
    name: "Healthcare",
    icon: Stethoscope,
    colorClass: "text-accent-green",
  }, // health
  CARETAKER: {
    code: "CARETAKER",
    name: "Caretaker",
    icon: HeartHandshake,
    colorClass: "text-google-red",
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
    colorClass: "text-google-yellow",
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
    colorClass: "text-google-red",
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
    colorClass: "text-google-green",
  }, // code
  HARDWARE_SHOP: {
    code: "HARDWARE_SHOP",
    name: "Hardware Shop",
    icon: Store,
    colorClass: "text-accent-amber",
  }, // retail
  GROCERY: {
    code: "GROCERY",
    name: "Grocery",
    icon: ShoppingBasket,
    colorClass: "text-google-green",
  }, // produce
  MEDICAL_SUPPLIES: {
    code: "MEDICAL_SUPPLIES",
    name: "Medical Supplies",
    icon: Pill,
    colorClass: "text-google-red",
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
