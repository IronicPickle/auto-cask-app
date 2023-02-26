import { colors } from "@lib/constants/colors";
import dayjs from "dayjs";
import { StyleSheet, Text, View } from "react-native";
import { Badge } from "@shared/ts/api/generic";
import Modal from "@components/modals/Modal";
import useForm from "@hooks/useForm";
import React, { useEffect } from "react";
import FormRow from "@components/form/FormRow";
import FormEntry from "@components/form/FormEntry";
import Input from "@components/common/Input";
import FormError from "@components/form/FormError";
import Button from "@components/common/Button";
import TextWrapper from "@components/common/TextWrapper";
import badgeValidators from "@shared/validators/badgeValidators";
import useUpdateBadge from "@api/badges/hooks/useUpdateBadge";

interface Props {
  badge?: Badge;
  onClose: () => void;
}

const UpdateBadgeModal = (props: Props) => {
  const { badge, onClose } = props;

  const { name, breweryName, createdOn } = badge ?? {};

  const updateBadge = useUpdateBadge(null);

  const { values, validation, onChange, onSubmit, setValues, resetValues } = useForm(
    {
      badgeId: "",
      name: "",
      breweryName: "",
    },
    async values => {
      const res = await updateBadge.send({
        params: {
          badgeId: values.badgeId,
        },
        body: {
          name: values.name,
          breweryName: values.breweryName,
        },
      });
      if (!res.error) onClose();
      return res;
    },
    badgeValidators.update,
  );

  useEffect(() => {
    if (!badge) return;
    resetValues();
    updateBadge.reset();
    setValues({
      badgeId: badge._id,
      name: badge.name,
      breweryName: badge.breweryName,
    });
  }, [badge]);

  const changesMade = values.name !== name || values.breweryName !== breweryName;

  return (
    <Modal active={!!badge} onClose={onClose}>
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
          <FormError error={updateBadge.error?.error} />
          {changesMade && (
            <Button color="green" onPress={onSubmit} isLoading={updateBadge.isLoading}>
              Update badge
            </Button>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default UpdateBadgeModal;

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
