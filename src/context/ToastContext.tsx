

"use client";

import { toast } from "react-toastify";

export function ToastProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

export function useToast() {
  return {
    showToast: (message: string) => {
      toast.success(message);
    },

    showErrorToast: (message: string) => {
      toast.error(message);
    },

    showWarningToast: (message: string) => {
      toast.warning(message);
    },

    showInfoToast: (message: string) => {
      toast.info(message);
    },
  };
}