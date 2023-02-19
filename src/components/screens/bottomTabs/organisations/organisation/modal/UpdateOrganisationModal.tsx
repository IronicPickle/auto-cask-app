import { colors } from "@lib/constants/colors";
import dayjs from "dayjs";
import { StyleSheet, Text, View } from "react-native";
import { Organisation } from "@shared/ts/api/generic";
import Modal from "@components/modals/Modal";
import useForm from "@hooks/useForm";
import useUpdateOrganisation from "@api/organisations/hooks/useUpdateOrganisation";
import React, { useEffect } from "react";
import organisationValidators from "@shared/validators/organisationValidators";
import FormRow from "@components/form/FormRow";
import FormEntry from "@components/form/FormEntry";
import Input from "@components/common/Input";
import FormError from "@components/form/FormError";
import Button from "@components/common/Button";
import TextWrapper from "@components/common/TextWrapper";

interface Props {
  organisation?: Organisation;
  onClose: () => void;
}

const UpdateOrganisationModal = (props: Props) => {
  const { organisation, onClose } = props;

  const { name, createdOn } = organisation ?? {};

  const updateOrganisation = useUpdateOrganisation(null);

  const { values, validation, onChange, onSubmit, setValues, resetValues } = useForm(
    {
      organisationId: "",
      name: "",
    },
    async values => {
      const res = await updateOrganisation.send({
        params: {
          organisationId: values.organisationId,
        },
        body: {
          name: values.name,
        },
      });
      if (!res.error) onClose();
      return res;
    },
    organisationValidators.update,
  );

  useEffect(() => {
    if (!organisation) return;
    resetValues();
    updateOrganisation.reset();
    setValues({
      organisationId: organisation._id,
      name: organisation.name,
    });
  }, [organisation]);

  const changesMade = values.name !== name;

  return (
    <Modal active={!!organisation} onClose={onClose}>
      <View style={styles.wrapper}>
        <View style={styles.details}>
          <TextWrapper>
            <Text style={styles.name} numberOfLines={1}>
              Editing {name}
            </Text>
          </TextWrapper>
          <Text style={styles.createdOn}>Created {dayjs(createdOn).format("DD/MM/YYYY")}</Text>
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
          <FormError error={updateOrganisation.error?.error} />
          {changesMade && (
            <Button color="green" onPress={onSubmit} isLoading={updateOrganisation.isLoading}>
              Update organisation
            </Button>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default UpdateOrganisationModal;

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
  name: {
    flex: 1,

    color: colors.black,
    fontSize: 24,
    fontWeight: "700",
  },
  createdOn: {
    color: colors.black,
    fontSize: 14,
    fontWeight: "400",
  },
});
