import { OrganisationInvite } from "@shared/ts/api/generic";
import useAcceptOrganisationInvite from "@api/organisations/invites/hooks/useAcceptOrganisationInvite";
import DialogModal from "@components/modals/DialogModal";
import { useEffect } from "react";
import FormError from "@components/form/FormError";
import useRejectOrganisationInvite from "@api/organisations/invites/hooks/useRejectOrganisationInvite";

interface Props {
  invite?: OrganisationInvite;
  onClose: () => void;
}

const OrganisationPromptModal = (props: Props) => {
  const { invite, onClose } = props;

  const { organisation } = invite ?? {};

  const acceptInvite = useAcceptOrganisationInvite(null);
  const rejectinvite = useRejectOrganisationInvite(null);

  useEffect(() => {
    if (!organisation) return;
    acceptInvite.reset();
    rejectinvite.reset();
  }, [organisation]);

  const accept = async () => {
    if (!invite) return;
    const res = await acceptInvite.send({
      params: {
        organisationId: invite.organisation._id,
        inviteId: invite._id,
      },
    });
    if (res.error) return;
    onClose();
  };

  const reject = async () => {
    if (!invite) return;
    const res = await rejectinvite.send({
      params: {
        organisationId: invite.organisation._id,
        inviteId: invite._id,
      },
    });
    if (res.error) return;
    onClose();
  };

  return (
    <DialogModal
      active={!!organisation}
      title="Invite Pending"
      subTitle={`You have been invited to ${organisation?.name}`}
      onConfirm={accept}
      onCancel={reject}
      confirmButtonProps={{
        isLoading: acceptInvite.isLoading,
      }}
      cancelButtonProps={{
        isLoading: rejectinvite.isLoading,
      }}
      confirmText="Accept"
      cancelText="Reject"
    >
      <FormError error={acceptInvite.error?.error ?? rejectinvite.error?.error} />
    </DialogModal>
  );
};

export default OrganisationPromptModal;
