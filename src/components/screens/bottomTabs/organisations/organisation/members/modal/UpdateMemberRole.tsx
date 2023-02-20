import useUpdateOrganisationMembersRole from "@api/organisations/members/role/hooks/useUpdateOrganisationMembersRole";
import Select from "@components/common/Select";
import FormEntry from "@components/form/FormEntry";
import FormError from "@components/form/FormError";
import FormRow from "@components/form/FormRow";
import useForm from "@hooks/useForm";
import { colors } from "@lib/constants/colors";
import { OrganisationRole } from "@shared/enums/api/generic";
import organisationValidators from "@shared/validators/organisationValidators";
import { OrganisationMember } from "@shared/ts/api/generic";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { organisationSelectItems } from "@lib/constants/generic";
import useGlobalContext from "@src/globalContext/hooks/useGlobalContext";
import Button from "@components/common/Button";
import DialogModal from "@components/modals/DialogModal";
import useDialogModal from "@components/modals/hooks/useDialogModal";
import useOrganisationsContext from "@screens/bottomTabs/organisations/context/useOrganisationsContext";

interface Props {
  member?: OrganisationMember;
  onClose?: () => void;
}

const UpdateMemberRole = (props: Props) => {
  const { member, onClose = () => {} } = props;

  const { self } = useGlobalContext();

  const { permissionChecker } = useOrganisationsContext();

  const { role } = member ?? {};

  const updateMember = useUpdateOrganisationMembersRole(null);

  const { values, validation, onChange, onSubmit, setValues, resetValues } = useForm(
    {
      organisationId: "",
      userId: "",
      role: OrganisationRole.Member,
    },
    async values => {
      const res = await updateMember.send({
        params: {
          organisationId: values.organisationId,
          userId: values.userId,
        },
        body: {
          role: values.role,
        },
      });
      if (!res.error) onClose();
      return res;
    },
    organisationValidators.membersUpdateRole,
  );

  const { dialogActive, openDialog, closeDialog, confirmDialog } = useDialogModal(onSubmit);

  useEffect(() => {
    if (!member) return;
    resetValues();
    updateMember.reset();
    setValues({
      organisationId: member.organisation._id,
      userId: member.user._id,
      role: member.role,
    });
  }, [member]);

  const canModifyRole =
    permissionChecker.canModifyRoles(self.data?._id) && role !== OrganisationRole.Owner;

  const changesMade = values.role !== role;

  return (
    <View style={styles.wrapper}>
      <FormRow>
        <FormEntry label="Role" errors={validation.role}>
          <Select
            variant="outlined"
            textColor="black"
            name="role"
            value={values.role}
            items={organisationSelectItems}
            onChange={onChange}
            disabled={!canModifyRole}
          />
        </FormEntry>
      </FormRow>
      <FormError error={updateMember.error?.error} />
      {changesMade && (
        <Button color="green" onPress={openDialog} isLoading={updateMember.isLoading}>
          Update role
        </Button>
      )}

      <DialogModal active={dialogActive} onClose={closeDialog} onConfirm={confirmDialog} />
    </View>
  );
};

export default UpdateMemberRole;

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
    gap: 12,

    padding: 32,

    backgroundColor: colors.silver,
  },
});
