import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,

  Progress,
} from "@nextui-org/react"

export default function UploadingModal({ isOpen, value }: { isOpen: boolean, value:number }) {
  return (
    <Modal isOpen={isOpen} isDismissable={false} hideCloseButton classNames={{body:"pb-8"}}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          Updating post...
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
