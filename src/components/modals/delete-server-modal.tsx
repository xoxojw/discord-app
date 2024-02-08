"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

import { useModal } from "@/hooks/use-modal-store";

import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui";

export const DeleteServerModal = () => { 
  const { isOpen, onClose, type, data } = useModal();
  const router = useRouter();

  const isModalOpen = isOpen && type === "deleteServer";
  const { server } = data;

  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    try {
      setIsLoading(true);

      await axios.delete(`/api/servers/${server?.id}`);

      onClose();
      router.refresh();
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl  text-center">
            서버 삭제
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            정말 <span className="text-indigo-500 font-semibold">{server?.name}</span> 서버를 삭제하시겠어요? <br />
            삭제된 서버는 복구할 수 없어요.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="bg-gray-100 px-6 py-4">
          <div className="flex items-center justify-between w-full">
            <Button
              disabled={isLoading}
              onClick={onClose}
              variant="ghost"
            >
              취소
            </Button>
            <Button
              disabled={isLoading}
              onClick={onClick}
              variant="primary"
            >
              떠나기
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}