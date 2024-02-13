"use client";
import qs from "query-string";
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

export const DeleteChannelModal = () => { 
  const { isOpen, onClose, type, data } = useModal();
  const router = useRouter();

  const isModalOpen = isOpen && type === "deleteChannel";
  const { server, channel } = data;

  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    try {
      setIsLoading(true);
      const url = qs.stringifyUrl({
        url: `/api/channels/${channel?.id}`,
        query: {
          serverId: server?.id
        }
      })

      await axios.delete(url);

      onClose();
      router.push(`/servers/${server?.id}`);
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
            채널 삭제
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            정말 <span className="text-indigo-500 font-semibold">#{channel?.name}</span> 채널을 삭제하시겠어요? <br />
            삭제된 채널은 복구할 수 없어요.
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
              채널 삭제하기
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}