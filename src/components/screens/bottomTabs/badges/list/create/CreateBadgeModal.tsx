import { colors } from "@lib/constants/colors";
import { StyleSheet, Text, View } from "react-native";
import Modal from "@components/modals/Modal";
import useForm from "@hooks/useForm";
import React, { useEffect } from "react";
import badgeValidators from "@shared/validators/badgeValidators";
import FormRow from "@components/form/FormRow";
import FormEntry from "@components/form/FormEntry";
import Input from "@components/common/Input";
import FormError from "@components/form/FormError";
import Button from "@components/common/Button";
import TextWrapper from "@components/common/TextWrapper";
import useCreateBadge from "@api/badges/hooks/useCreateBadge";

interface Props {
  active?: boolean;
  onClose: () => void;
}

const CreateBadgeModal = (props: Props) => {
  const { active, onClose } = props;

  const createBadge = useCreateBadge(null);

  const { values, validation, onChange, onSubmit, resetValues } = useForm(
    {
      name: "",
      breweryName: "",
    },
    async values => {
      const res = await createBadge.send({
        body: {
          name: values.name,
          breweryName: values.breweryName,
        },
      });
      if (!res.error) onClose();
      return res;
    },
    badgeValidators.create,
  );

  useEffect(() => {
    if (!active) return;
    resetValues();
    createBadge.reset();
  }, [active]);

  return (
    <Modal active={active} onClose={onClose}>
      <View style={styles.wrapper}>
        <View style={styles.details}>
          <TextWrapper>
            <Text style={styles.title} numberOfLines={1}>
              Create a Badge
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
                placeholder="Pale Ale"
                value={values.name}
                onChange={onChange}
              />
            </FormEntry>
          </FormRow>
          <FormRow>
            <FormEntry label="Brewery Name" errors={validation.breweryName}>
              <Input
                variant="outlined"
                textColor="black"
                name="breweryName"
                placeholder="Pale Brewery"
                value={values.breweryName}
                onChange={onChange}
              />
            </FormEntry>
          </FormRow>
          <FormError error={createBadge.error?.error} />
          <Button color="green" onPress={onSubmit} isLoading={createBadge.isLoading}>
            Create badge
          </Button>
        </View>
      </View>
    </Modal>
  );
};

export default CreateBadgeModal;

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
