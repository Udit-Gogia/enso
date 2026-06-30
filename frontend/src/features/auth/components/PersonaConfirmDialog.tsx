import { motion, AnimatePresence } from "framer-motion";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Persona } from "./PersonaPanel";
import { Button } from "@/components/ui/button";
import { BriefcaseBusinessIcon, Shield, User } from "lucide-react";

const PERSONA_META: Record<
  Persona,
  { label: string; color: string; icon: JSX.Element }
> = {
  customer: {
    label: "Customer",
    color: "#1A73E8",
    icon: <User color="#1A73E8" />,
  },
  vendor: {
    label: "Vendor",
    color: "#C5221F",
    icon: <BriefcaseBusinessIcon color="#C5221F" />,
  },
  admin: { label: "Admin", color: "#188038", icon: <Shield color="#188038" /> },
};

interface PersonaConfirmDialogProps {
  persona: Persona | null;
  onConfirm: () => void;
  onCancel: () => void;
}

export function PersonaConfirmDialog({
  persona,
  onConfirm,
  onCancel,
}: PersonaConfirmDialogProps) {
  const open = persona !== null;
  const meta = persona ? PERSONA_META[persona] : null;

  return (
    <DialogPrimitive.Root
      open={open}
      onOpenChange={(o: any) => !o && onCancel()}
    >
      <AnimatePresence>
        {open && meta && (
          <DialogPrimitive.Portal forceMount>
            {/* Backdrop */}
            <DialogPrimitive.Overlay asChild forceMount>
              {/* <motion.div
                className="fixed inset-0 bg-black/40 z-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
              /> */}
            </DialogPrimitive.Overlay>

            {/* Dialog */}
            <DialogPrimitive.Content asChild forceMount>
              <motion.div
                className="fixed left-[34%] top-[33%] z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 
                           bg-surface rounded-2xl shadow-xl border border-border-soft p-6 outline-none"
                initial={{ opacity: 0, scale: 0.96, y: -8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: -8 }}
                transition={{ duration: 0.15, ease: [0.32, 0.72, 0, 1] }}
              >
                {/* Persona color accent */}
                <div
                  className="w-10 h-10 rounded-full mb-4"
                  style={{
                    backgroundColor: meta.color + "1A",
                    border: `1.5px solid ${meta.color}33`,
                  }}
                >
                  <div className="w-full h-full rounded-full flex items-center justify-center">
                    {meta.icon}
                  </div>
                </div>

                <DialogPrimitive.Title className="font-display text-xl font-semibold text-ink mb-1">
                  Confirm {meta.label} profile
                </DialogPrimitive.Title>

                <DialogPrimitive.Description className="text-md text-ink-muted mb-6">
                  You'll complete your profile as a {meta.label.toLowerCase()}.
                  You can't change this later.
                </DialogPrimitive.Description>

                <div className="flex gap-3 justify-end w-full">
                  <Button
                    size="default"
                    variant="outline"
                    onClick={onCancel}
                    className="border-border-input text-md  text-ink hover:-translate-y-0.5 hover:border-primary hover:text-primary transition-all duration-200 active:scale-[0.98] w-full"
                  >
                    Cancel
                  </Button>

                  <Button
                    onClick={onConfirm}
                    className="bg-primary text-white  text-md shadow-cta hover:-translate-y-0.5 hover:bg-primary-hover hover:shadow-cta transition-all duration-200 w-full"
                  >
                    Confirm
                  </Button>
                </div>
              </motion.div>
            </DialogPrimitive.Content>
          </DialogPrimitive.Portal>
        )}
      </AnimatePresence>
    </DialogPrimitive.Root>
  );
}
