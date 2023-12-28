import React, { useState } from "react";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    background: "#192435",
    width: "700px",
    padding: "40px",
    borderRadius: ".5rem",
    backgroundColor: "#192435",
  },
};
Modal.setAppElement("#root");

function PostModal({ children, modalIsOpen, setIsOpen }) {
  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // Modal açıldığında yapılacak işlemler
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <Modal
      isOpen={modalIsOpen}
      onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      style={customStyles}
      shouldCloseOnOverlayClick={false}
      contentLabel="Example Modal"
    >
      <button
        onClick={closeModal}
        className="absolute right-0 top-0 bg-[red] p-1 px-3 rounded-bl-[0.375rem]"
      >
        X
      </button>
      {children}
    </Modal>
  );
}

export default PostModal;
