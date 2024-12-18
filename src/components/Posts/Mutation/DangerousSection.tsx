import { deletePost } from "@/serverActions/posts"
import {
  Accordion,
  AccordionItem,
  Button,
  Divider,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react"
import React, { useState } from "react"

const confirmKey = "Delete this post"
export default function DangerousSection({ param }: { param: string }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [confirmText, setConfirmText] = useState("")
  const [submitting, setSubmitting] = useState(false)
  async function onDelete() {
    setSubmitting(true)
    const result = await deletePost(param)
    if (result?.message) alert(result?.message)
  }
  return (
    <div className="mt-12">
      <Divider />
      <Accordion>
        <AccordionItem
          key="1"
          aria-label="Accordion 1"
          title="Khu vực nguy hiểm"
        >
          <Button onPress={onOpen} color="danger">
            Xoá bài viết
          </Button>
          <Modal
            isOpen={isOpen}
            placement="top-center"
            onOpenChange={onOpenChange}
          >
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1 text-danger-500">
                    Hành động này sẽ không thể phục hồi!
                  </ModalHeader>
                  <ModalBody>
                    <p>
                      Nhập <b>&quot;{confirmKey}&quot;</b> để xác nhận xóa
                    </p>
                    <Input
                      label="Xác nhận"
                      placeholder=""
                      variant="bordered"
                      value={confirmText}
                      onValueChange={(value) => {
                        setConfirmText(value)
                      }}
                    />
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      variant="flat"
                      onPress={onClose}
                      isDisabled={submitting}
                    >
                      Hủy
                    </Button>
                    <Button
                      color="danger"
                      onPress={() => {
                        onDelete()
                      }}
                      isDisabled={confirmText != confirmKey || submitting}
                    >
                      Xóa
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
