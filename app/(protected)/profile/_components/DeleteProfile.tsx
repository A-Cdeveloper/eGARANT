"use client";
import { logoutUser } from "@/actions/auth";
import { deleteProfile } from "@/actions/profile";
import Modal from "@/components/modals/Modal";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store";
import { useState } from "react";

const DeleteProfile = ({ userId }: { userId: string }) => {
  const [showModal, setShowModal] = useState(false);
  const removeUser = useAuthStore((state) => state.removeUser);
  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      {showModal && (
        <Modal
          title="Da li ste sigurni?"
          onClose={closeModal}
          onConfirm={async () => {
            await deleteProfile(userId);
            removeUser();
            await logoutUser();
            closeModal();
          }}
        />
      )}

      <div className="my-10 text-end border-t border-gray-300 pt-4">
        <Button
          variant="danger_full"
          size="lg"
          onClick={() => {
            setShowModal(true);
          }}
        >
          Obriši profil
        </Button>
      </div>
    </>
  );
};

export default DeleteProfile;
