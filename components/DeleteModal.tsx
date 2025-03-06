'use client';

import React from 'react';
import {
  CANCEL,
  DELETE,
  CONFIRM_DELETE,
  ARE_U_SURE,
} from '../constants/constants';

// Define the props for DeleteModal
interface DeleteModalProps {
  isOpen: boolean; // Controls whether the modal is open or closed
  onClose: () => void; // Function to handle closing the modal
  onConfirm: () => void; // Function to handle confirmation (delete action)
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  // If modal is not open, do not render anything
  if (!isOpen) return null;

  return (
    // Overlay background
    <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50'>
      {/* Modal content */}
      <div className='bg-white p-6 rounded-lg shadow-lg w-96'>
        <h2 className='text-lg font-bold'>{CONFIRM_DELETE}</h2>
        <p>{ARE_U_SURE}</p>

        {/* Action buttons */}
        <div className='flex justify-end mt-4'>
          {/* Cancel button */}
          <button
            onClick={onClose}
            className='cursor-pointer bg-primary px-4 py-2 rounded-lg mr-2'
          >
            {CANCEL}
          </button>

          {/* Delete confirmation button */}
          <button
            onClick={onConfirm}
            className='cursor-pointer bg-secondary hover:bg-hover text-white px-4 py-2 rounded-lg'
          >
            {DELETE}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
