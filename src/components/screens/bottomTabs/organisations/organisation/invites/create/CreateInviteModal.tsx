import { colors } from "@lib/constants/colors";
import dayjs from "dayjs";
import { StyleSheet, Text, View } from "react-native";
import { Organisation } from "@shared/ts/api/generic";
import Modal from "@components/modals/Modal";
import useForm from "@hooks/useForm";
import React, { useEffect } from "react";
import organisationValidators from "@shared/validators/organisationValidators";
import FormRow from "@components/form/FormRow";
import FormEntry from "@components/form/FormEntry";
import Input from "@components/common/Input";
import FormError from "@components/form/FormError";
import Button from "@components/common/Button";
import TextWrapper from "@components/common/TextWrapper";
import useCreateOrganisationInvite from "@api/organisations/invites/hooks/useCreateOrganisationInvite";

interface Props {
  organisation?: Organisation;
  onClose: () => void;
}

const CreateInviteModal = (props: Props) => {
  const { organisation, onClose } = props;

  const { name } = organisation ?? {};

  const createInvite = useCreateOrganisationInvite(null);

  const { values, validation, onChange, onSubmit, setValues, resetValues } = useForm(
    {
      organisationId: "",
      email: "",
    },
    async values => {
      const res = await createInvite.send({
        params: { organisationId: values.organisationId },
        body: { email: values.email },
      });
      if (!res.error) onClose();
      return res;
    },
    organisationValidators.invitesCreate,
  );

  useEffect(() => {
    if (!organisation) return;
    resetValues();
    createInvite.reset();
    setValues({
      organisationId: organisation._id,
      email: "",
    });
  }, [organisation]);

  return (
    <Modal active={!!organisation} onClose={onClose}>
      <View style={styles.wrapper}>
        <View style={styles.details}>
          <Text style={styles.title}>Inviting to</Text>
          <TextWrapper>
            <Text style={styles.name} numberOfLines={1}>
              {name}
            </Text>
          </TextWrapper>
        </View>

        <View style={styles.form}>
          <FormRow>
            <FormEntry label="Email" errors={validation.email}>
              <Input
                variant="outlined"
                textColor="black"
                name="email"
                type="emailAddress"
                placeholder="example@email.com"
                value={values.email}
                onChange={onChange}
              />
            </FormEntry>
          </FormRow>
          <FormError error={createInvite.error?.error} />
          <Button color="green" onPress={onSubmit} isLoading={createInvite.isLoading}>
            Invite
          </Button>
        </View>
      </View>
    </Modal>
  );
};

export default CreateInviteModal;

const styles = StyleSheet.create({
  wrapper: {},

  form: {
    alignItems: "center",
    gap: 12,

    padding: 32,

    backgroundColor: colors.silver,
  },

  details: {
    padding: 32,
    paddingRight: 64,
  },
  title: {
    color: colors.black,
    fontSize: 24,
    fontWeight: "700",
  },
  name: {
    flex: 1,

    color: colors.black,
    fontSize: 14,
    fontWeight: "400",
  },
});
