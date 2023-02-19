import { colors } from "@lib/constants/colors";
import dayjs from "dayjs";
import { StyleSheet, Text, View } from "react-native";
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
import useCreateOrganisation from "@api/organisations/hooks/useCreateOrganisation";

interface Props {
  active?: boolean;
  onClose: () => void;
}

const CreateOrganisationModal = (props: Props) => {
  const { active, onClose } = props;

  const createOrganisation = useCreateOrganisation(null);

  const { values, validation, onChange, onSubmit, resetValues } = useForm(
    {
      name: "",
    },
    async values => {
      const res = await createOrganisation.send({
        body: {
          name: values.name,
        },
      });
      if (!res.error) onClose();
      return res;
    },
    organisationValidators.create,
  );

  useEffect(() => {
    if (!active) return;
    resetValues();
    createOrganisation.reset();
  }, [active]);

  return (
    <Modal active={active} onClose={onClose}>
      <View style={styles.wrapper}>
        <View style={styles.details}>
          <TextWrapper>
            <Text style={styles.title} numberOfLines={1}>
              Create an Organisation
            </Text>
          </TextWrapper>
        </View>

        <View style={styles.form}>
          <FormRow>
            <FormEntry label="Name" errors={validation.name}>
              <Input
                variant="outlined"
                textColor="black"
                name="name"
                placeholder="The Green Inn"
                value={values.name}
                onChange={onChange}
              />
            </FormEntry>
          </FormRow>
          <FormError error={createOrganisation.error?.error} />
          <Button color="green" onPress={onSubmit} isLoading={createOrganisation.isLoading}>
            Create organisation
          </Button>
        </View>
      </View>
    </Modal>
  );
};

export default CreateOrganisationModal;

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
    flex: 1,

    color: colors.black,
    fontSize: 24,
    fontWeight: "700",
  },
});
