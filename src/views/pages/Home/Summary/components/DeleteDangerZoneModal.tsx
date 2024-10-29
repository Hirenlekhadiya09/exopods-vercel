import { Dialog } from "@headlessui/react";
interface AddNewModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onDelete: () => void;
  isLoading: boolean;
}

const DeleteDangerZoneModal: React.FC<AddNewModalProps> = ({
  isOpen,
  setIsOpen,
  onDelete,
  isLoading,
}) => {
  return (
    <>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <Dialog.Overlay className="fixed inset-0 bg-black/30 backdrop-blur-sm	" />
        <div className="fixed inset-0 flex items-center justify-center">
          <Dialog.Panel className=" max-w-[500px] w-full mx-auto !bg-[#0C1015] rounded-[10px] border border-[#BBBBBB26] ">
            <div>
              <div className="py-[21px] px-6">
                <p className="text-[#FFFFFF] text-[22px] font-semibold">
                  Delete this service?
                </p>
                <p className="text-sm font-normal text-[#C4C4C4A8]">
                  Deleting this project will remove all related Deployments,
                  Domains, Environment Variables, Serverless Functions, and
                  Settings.
                </p>
                <div className="py-[13px] px-[12px] my-[13px] bg-[#3C161859] rounded-md">
                  <p className="text-[#FF5050] text-sm font-semibold ">
                    Warning: This action cannot be undone. Please ensure you are
                    certain before proceeding.
                  </p>
                </div>
              </div>
              <div className="border-t border-t-[#BBBBBB26] py-[20px] px-6 flex justify-between">
                <button
                  onClick={() => setIsOpen(false)}
                  className="py-2 px-[18px] border border-[#BBBBBB26] rounded-[5px] text-white text-sm font-medium h-[40px]"
                >
                  Go back
                </button>
                <button
                  className="py-2 px-[18px] border border-[#BBBBBB26] rounded-[5px] text-white text-sm font-medium h-[40px] bg-[#D93036]"
                  onClick={onDelete}
                  disabled={isLoading}
                >
                  Delete
                </button>
              </div>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
};

export default DeleteDangerZoneModal;
