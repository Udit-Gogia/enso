import { CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { BookingResult } from "../hooks/useCreateBooking";
import { useNavigate } from "react-router-dom";
import { Modal } from "@/components/common/Modal";

interface BookingConfirmModalProps {
  open: boolean;
  onClose: () => void;
  booking: BookingResult | null;
}

export default function BookingConfirmModal({
  open,
  onClose,
  booking,
}: BookingConfirmModalProps) {
  const navigate = useNavigate();

  if (!booking) return null;

  const isPrivate = booking.visibility === "PRIVATE";

  return (
    <Modal open={open} onClose={onClose} title="Request sent">
      <div className="flex flex-col items-center text-center gap-3 py-2">
        <div className="w-14 h-14 rounded-full bg-success/10 flex items-center justify-center">
          <CheckCircle2 size={28} className="text-success" />
        </div>

        {isPrivate ? (
          <p className="text-sm text-ink-body">
            Your request has been sent directly to{" "}
            <span className="font-semibold text-ink">
              {booking.vendorBusinessName}
            </span>
            . They'll reach out to confirm the details.
          </p>
        ) : (
          <p className="text-sm text-ink-body">
            Your request is now visible to {booking.categoryName} vendors in
            your area. You'll hear back as vendors respond.
          </p>
        )}

        <Button
          className="mt-2 w-full"
          onClick={() => {
            onClose();
            navigate("/dashboard");
          }}
        >
          Back to Dashboard
        </Button>
      </div>
    </Modal>
  );
}
