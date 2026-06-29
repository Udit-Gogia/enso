import { motion, AnimatePresence } from "framer-motion";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Persona } from "./PersonaPanel";

const PERSONA_META: Record<Persona, { label: string; color: string }> = {
  customer: { label: "Customer", color: "#1A73E8" },
  vendor: { label: "Vendor", color: "#C5221F" },
  admin: { label: "Admin", color: "#188038" },
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
              <motion.div
                className="fixed inset-0 bg-black/40 z-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
              />
            </DialogPrimitive.Overlay>

            {/* Dialog */}
            <DialogPrimitive.Content asChild forceMount>
              <motion.div
                className="fixed left-[38.5%] top-[33%] z-50 w-full max-w-sm -translate-x-1/2 -translate-y-1/2 
                           bg-surface rounded-2xl shadow-card border border-border-soft p-6 outline-none"
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
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: meta.color }}
                    />
                  </div>
                </div>

                <DialogPrimitive.Title className="font-display text-lg font-semibold text-ink mb-1">
                  Continue as {meta.label}?
                </DialogPrimitive.Title>

                <DialogPrimitive.Description className="text-sm text-ink-muted mb-6">
                  You'll complete your profile as a {meta.label.toLowerCase()}.
                  You can't change this later.
                </DialogPrimitive.Description>

                <div className="flex gap-3 justify-end">
                  <button
                    onClick={onCancel}
                    className="px-4 py-2 text-sm font-medium text-ink-muted hover:text-ink 
                               rounded-lg border border-border-soft hover:border-border 
                               transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={onConfirm}
                    className="px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors"
                    style={{ backgroundColor: meta.color }}
                  >
                    Continue
                  </button>
                </div>
              </motion.div>
            </DialogPrimitive.Content>
          </DialogPrimitive.Portal>
        )}
      </AnimatePresence>
    </DialogPrimitive.Root>
  );
}
