import React from "react";
import { FaCheck } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { handleChangeIcon } from "../../../../../store/editSlice";
import { RootState } from "../../../../../store/store";
import helpIcon from '/src/assets/icons/helpicon.svg'
import learnMOreIcon from '/src/assets/icons/learnMore.svg'
import editIcon from "/src/assets/icons/editIconOutline.svg"

interface TextAreaDocketProps {
  deploymentName: string;
  placeholder: string;
  learnMoreLink: string;
  value: string;
  editable?: boolean;
  onValueChange?: (newValue: string) => void;
  disabled?: boolean;
}

const TextAreaDocket: React.FC<TextAreaDocketProps> = ({
  deploymentName,
  learnMoreLink,
  placeholder,
  value,
  editable = false,
  disabled = false,
  onValueChange,
}) => {
  const dispatch = useDispatch();
  const isEditing = useSelector(
    (state: RootState) => state.counter[deploymentName]
  );

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (onValueChange) {
      onValueChange(e.target.value);
    }
  };

  const handleEditClick = () => {
    dispatch(handleChangeIcon({ deploymentName, isEditing: true }));
  };

  const handleSaveClick = () => {
    dispatch(handleChangeIcon({ deploymentName, isEditing: false }));
  };

  return (
    <div className="w-full">
      <div className="border border-[#BBBBBB26] rounded-lg py-[19px] px-[32px] rounded-bl-none rounded-br-none">
        <div className="flex gap-1">
          <label
            htmlFor="deployment-name"
            className="text-sm font-normal text-[#C4C4C4A8]"
          >
            {deploymentName}
          </label>
          <img src={helpIcon} alt="Help Icon" />
        </div>
        {editable ? (
          isEditing ? (
            <div className="relative flex items-center mt-[4px]">
              <textarea
                id="deployment-name"
                value={value}
                onChange={(e) => handleChange(e)}
                disabled={disabled}
                placeholder={placeholder}
                className="bg-[#BBBBBB0A]  text-white w-full px-3 py-4 rounded-md placeholder:text-[#F1F1FF4D] placeholder:text-sm placeholder:font-normal border border-[#BBBBBB1F] focus:border-[#BBBBBB80] active:border-[#BBBBBB80] focus:outline-none active:outline-none"
              />
              <button
                onClick={handleSaveClick}
                className="absolute text-[#BBBBBB] right-2.5 px-2"
              >
                <FaCheck />
              </button>
            </div>
          ) : (
            <div className="relative mt-[4px] flex items-center">
              <div className="bg-[#BBBBBB0A] h-[57.8px] text-white w-full px-3 py-4 rounded-md placeholder:text-[#F1F1FF4D] placeholder:text-sm placeholder:font-normal border border-[#BBBBBB1F]">
                {value}
              </div>
              <button
                onClick={handleEditClick}
                className="absolute right-2.5 px-2"
              >
                <img src={editIcon} alt="Edit Icon" />
              </button>
            </div>
          )
        ) : (
          <div className="relative flex items-center mt-[4px]">
            <textarea
              id="deployment-name"
              value={value}
              onChange={(e) => handleChange(e)}
              disabled={disabled}
              placeholder={placeholder}
              className="bg-[#BBBBBB0A]  text-white w-full px-3 py-4 rounded-md placeholder:text-[#F1F1FF4D] placeholder:text-sm placeholder:font-normal border border-[#BBBBBB1F] focus:border-[#BBBBBB80] active:border-[#BBBBBB80] focus:outline-none active:outline-none"
            />
          </div>
        )}
      </div>

      <div className="border border-[#BBBBBB26] rounded-lg py-[19px] px-[32px] rounded-tl-none rounded-tr-none border-t-0">
        <div className="flex gap-1 items-center">
          <p className="text-[#C4C4C4A8] text-sm font-normal">
            Learn more about
          </p>
          <a
            href={learnMoreLink}
            className="flex gap-1 items-center cursor-pointer"
          >
            <span className="text-[#1A73E8] text-sm font-normal">
              {deploymentName}
            </span>
            <img src={learnMOreIcon} alt="Learn More Icon" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default TextAreaDocket;
