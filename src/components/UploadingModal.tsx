import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,

  Progress,
} from "@nextui-org/react"

export default function UploadingModal({ isOpen, value, message }: { isOpen: boolean, value:number, message:string }) {
  return (
    <Modal isOpen={isOpen} isDismissable={false} hideCloseButton classNames={{body:"pb-8"}}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          {message}
        </ModalHeader>
        <ModalBody>
          <Progress
            aria-label="Downloading..."
            className="max-w-md"
            color="success"
            showValueLabel={true}
            size="md"
            value={value}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
