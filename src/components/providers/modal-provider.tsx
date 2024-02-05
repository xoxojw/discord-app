"use client";

import { CreateServerModal } from "@/components/modals/create-server-modal";
import { useEffect, useState } from "react";

// All modals are rendered via ModalProvider, except 'initial-modal'.
// Because 'initial-modal' renders directly, so it works independently without linking with zustand custom hooks.
export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <CreateServerModal />
    </>
  )
}