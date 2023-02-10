import useUpdateOrganisationMembersRole from "@api/organisation/members/hooks/useUpdateOrganisationMembersRole";
import Select from "@components/common/Select";
import useForm from "@hooks/useForm";
import { colors } from "@lib/constants/colors";
import { organisationSelectItems } from "@lib/constants/generic";
import { OrganisationRole } from "@shared/enums/api/generic";
import dayjs from "dayjs";
import { StyleSheet, Text, View } from "react-native";
import organisationValidators from "@shared/validators/organisationValidators";
import FormRow from "@components/form/FormRow";
import FormEntry from "@components/form/FormEntry";
import Button from "@components/common/Button";
import FormError from "@components/form/FormError";
import { OrganisationMember } from "@shared/ts/api/generic";
import useOrganisationsContext from "../context/useOrganisationsContext";
import useGlobalContext from "@src/globalContext/hooks/useGlobalContext";
import Modal from "@components/common/Modal";
import { useEffect } from "react";

interface Props {
  member?: OrganisationMember;
  onClose?: () => void;
}

const OrganisationMemberModal = (props: Props) => {
  const { member, onClose = () => {} } = props;

  const { user, joinedOn, role } = member ?? {};

  const { self } = useGlobalContext();

  const { permissionChecker } = useOrganisationsContext();

  const updateMember = useUpdateOrganisationMembersRole(null);

  const { values, validation, onChange, onSubmit, setValues } = useForm(
    {
      organisationId: "",
      userId: "",
      role: OrganisationRole.Member,
    },
    async values => {
      const res = await updateMember.send(values);
      if (!res.error) onClose();
      return res;
    },
    organisationValidators.membersUpdateRole,
  );

  useEffect(() => {
    if (!member) return;
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
    <Modal active={!!member} onClose={onClose}>
      <View style={styles.wrapper}>
        <View style={styles.details}>
          <Text style={styles.displayName}>{user?.displayName}</Text>
          <Text style={styles.joinedOn}>Joined {dayjs(joinedOn).format("DD/MM/YYYY")}</Text>
        </View>

        <View style={styles.roleWrapper}>
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
            <Button
              color="green"
              onPress={async () => {
                const failed = await onSubmit();
                if (failed) return;
                onClose();
              }}
              isLoading={updateMember.isLoading}
            >
              Update role
            </Button>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default OrganisationMemberModal;

const styles = StyleSheet.create({
  wrapper: {},

  details: {
    padding: 32,
  },
  displayName: {
    color: colors.black,
    fontSize: 24,
    fontWeight: "700",
  },
  joinedOn: {
    color: colors.black,
    fontSize: 14,
    fontWeight: "400",
  },

  roleWrapper: {
    display: "flex",
    alignItems: "center",
    gap: 12,

    padding: 32,

    backgroundColor: colors.silver,
  },
});
