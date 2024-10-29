import { useState } from "react";
import DeleteDangerZoneModal from "./DeleteDangerZoneModal";
import deleteIcon from "/src/assets/icons/deleteIcon.svg";
import { useNavigate, useParams } from "react-router-dom";
import { removeAccessToken } from "pages/Auth/removeAccessToken";
const SummaryDangerZone = () => {
  const exoApiUrl: string = import.meta.env.VITE_EXO_API_URL;
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const openModal = () => setIsOpen(true);
  const { id } = useParams();
  console.log("🚀 ~ SummaryDangerZone ~ id:", id);
  const handleModalClose = (open: boolean) => {
    setIsOpen(open);
  };

  async function handleDeleteDeployment() {
    setIsLoading(true);
    const accessToken = window.localStorage.getItem("access_token");
    const deleteDeploymentUrl = `${exoApiUrl}kube/delete-container/${id}`;

    try {
      const response = await fetch(deleteDeploymentUrl, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      });

      if (response.ok) {
        setIsLoading(false);
        navigate("/services");
      } else if (response.status === 401) {
        removeAccessToken();
        navigate("/");
      }
    } catch (err) {
      setIsLoading(false);
      console.log("Error:", err);
    }
  }
  return (
    <>
      <div>
        <div>
          <p className="text-2xl text-[#D93036] font-semibold">Danger zone</p>
        </div>
        <div className="mt-[14px] w-full">
          <div className="border border-[#BBBBBB26] rounded-lg py-[19px] px-[32px] rounded-bl-none rounded-br-none ">
            <p className="text-sm font-medium text-[#D93036]">
              Delete Deployment
            </p>
            <p className="text-sm text-[#fff] font-normal">
              Please note that deleting the{" "}
              <span className="font-bold"> expresjs-cn8x </span> deployment{" "}
              <span className="text-[#D93036]">
                {" "}
                is permanent and irreversible.{" "}
              </span>
            </p>
          </div>
          <div className="border border-[#BBBBBB26] rounded-lg py-[19px] px-[32px] rounded-tl-none rounded-tr-none border-t-0">
            <div className="flex justify-end">
              <button
                className="bg-[#D930361A] border border-[#D93036BD] text-[#D93036] text-sm font-medium py-[10px] px-5 rounded-md"
                onClick={openModal}
              >
                <div className="flex gap-2">
                  <img src={deleteIcon} alt="" />
                  <span>Delete</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
      <DeleteDangerZoneModal
        isOpen={isOpen}
        setIsOpen={handleModalClose}
        onDelete={handleDeleteDeployment}
        isLoading={isLoading}
      />
    </>
  );
};

export default SummaryDangerZone;
