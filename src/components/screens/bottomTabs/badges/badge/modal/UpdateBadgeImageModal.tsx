import { colors } from "@lib/constants/colors";
import dayjs from "dayjs";
import { StyleSheet, Text, View } from "react-native";
import { Badge } from "@shared/ts/api/generic";
import Modal from "@components/modals/Modal";
import useForm from "@hooks/useForm";
import React, { useEffect } from "react";
import FormRow from "@components/form/FormRow";
import FormEntry from "@components/form/FormEntry";
import FormError from "@components/form/FormError";
import Button from "@components/common/Button";
import TextWrapper from "@components/common/TextWrapper";
import badgeValidators from "@shared/validators/badgeValidators";
import useUpdateBadgeImage from "@api/badges/image/hooks/useUpdateBadgeImage";
import ImagePicker from "@components/common/ImagePicker";
import { generateBadgeImageUrl } from "@lib/utils/generic";
import { Asset } from "react-native-image-picker/lib/typescript/types";

interface Props {
  badge?: Badge;
  onClose: () => void;
}

const UpdateBadgeImageModal = (props: Props) => {
  const { badge, onClose } = props;

  const { name, createdOn } = badge ?? {};

  const updateBadgeImage = useUpdateBadgeImage(null);

  const { values, validation, onChange, onSubmit, setValues, resetValues } = useForm(
    {
      badgeId: "",
      image: undefined as undefined | Asset,
    },
    async values => {
      const { image } = values;

      if (!image) return;

      const res = await updateBadgeImage.send({
        params: {
          badgeId: values.badgeId ?? "",
        },
        body: { image },
      });
      if (!res.error) onClose();
      return res;
    },
    badgeValidators.updateImage,
  );

  useEffect(() => {
    if (!badge) return;
    resetValues();
    updateBadgeImage.reset();
    setValues({
      badgeId: badge._id,
      image: undefined,
    });
  }, [badge]);

  const changesMade = !!values.image;

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
            <FormEntry label="Image" errors={validation.image}>
              <ImagePicker
                name="image"
                color="silver"
                textColor="black"
                value={values.image}
                onChange={onChange}
                placeholderSrc={badge ? generateBadgeImageUrl(badge?._id) : undefined}
                isLoading={updateBadgeImage.isLoading}
              />
            </FormEntry>
          </FormRow>
          <FormError error={updateBadgeImage.error?.error} />
          {changesMade && (
            <Button color="green" onPress={onSubmit} isLoading={updateBadgeImage.isLoading}>
              Update image
            </Button>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default UpdateBadgeImageModal;

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
