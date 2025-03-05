"use client";

import React from "react";
import { CANCEL, DELETE, CONFIRM_DELETE, ARE_U_SURE } from "../constants/constants";

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-bold">{CONFIRM_DELETE}</h2>
        <p>{ARE_U_SURE}</p>
        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="cursor-pointer bg-primary px-4 py-2 rounded-lg mr-2"
          >
            {CANCEL}
          </button>
          <button
            onClick={onConfirm}
            className="cursor-pointer bg-secondary hover:bg-hover text-white px-4 py-2 rounded-lg"
          >
            {DELETE}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
