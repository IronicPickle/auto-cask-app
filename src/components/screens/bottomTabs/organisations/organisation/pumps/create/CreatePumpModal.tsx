import { colors } from "@lib/constants/colors";
import { StyleSheet, Text, View } from "react-native";
import { Organisation } from "@shared/ts/api/generic";
import Modal from "@components/modals/Modal";
import useForm from "@hooks/useForm";
import React, { useEffect, useState } from "react";
import organisationValidators from "@shared/validators/organisationValidators";
import FormRow from "@components/form/FormRow";
import FormEntry from "@components/form/FormEntry";
import Input from "@components/common/Input";
import FormError from "@components/form/FormError";
import Button from "@components/common/Button";
import TextWrapper from "@components/common/TextWrapper";
import ServiceList from "./list/ServiceList";
import { AutoCaskService } from "@lib/ts/generic";
import IconButton from "@components/common/IconButton";
import Icon from "react-native-vector-icons/Ionicons";
import useCreateOrganisationPump from "@api/organisations/pumps/hooks/useCreateOrganisationPump";

interface Props {
  organisation?: Organisation;
  onClose: () => void;
}

const CreatePumpModal = (props: Props) => {
  const { organisation, onClose } = props;

  const [service, setService] = useState<AutoCaskService | undefined>(undefined);

  const { name } = organisation ?? {};

  const createPump = useCreateOrganisationPump(undefined);

  const { values, validation, onChange, onSubmit, setValues, resetValues } = useForm(
    {
      organisationId: "",
      mac: "",
      name: "",
    },
    async values => {
      const res = await createPump.send({
        params: {
          organisationId: values.organisationId,
        },
        body: {
          mac: values.mac,
          name: values.name,
        },
      });
      if (!res.error) onClose();
      return res;
    },
    organisationValidators.pumpsCreate,
  );

  useEffect(() => {
    if (!organisation || !service) return;
    resetValues();
    createPump.reset();
    setValues({
      organisationId: organisation._id,
      mac: service?.txt.mac,
      name: "",
    });
  }, [organisation, service]);

  useEffect(() => {
    if (organisation) setService(undefined);
  }, [organisation]);

  if (!organisation) return null;

  return (
    <Modal active={!!organisation} onClose={onClose}>
      <View style={styles.wrapper}>
        <View style={styles.details}>
          <Text style={styles.title}>Pump Setup</Text>
          <TextWrapper>
            <Text style={styles.name} numberOfLines={1}>
              {name}
            </Text>
          </TextWrapper>
        </View>

        {service ? (
          <View style={styles.pumpWrapper}>
            <View style={styles.pumpHeader}>
              <View style={styles.pumpDetails}>
                <Text style={styles.pumpTitle}>Selected Pump</Text>
                <TextWrapper>
                  <Text style={styles.pumpName}>{service.name}</Text>
                </TextWrapper>
              </View>

              <IconButton
                size="small"
                color="red"
                iconColor="white"
                icon={<Icon name="close" />}
                rounded
                onPress={() => setService(undefined)}
              />
            </View>

            <View style={styles.form}>
              <FormRow>
                <FormEntry label="Name" errors={validation.name}>
                  <Input
                    variant="outlined"
                    textColor="black"
                    name="name"
                    placeholder="Pump #1"
                    value={values.name}
                    onChange={onChange}
                  />
                </FormEntry>
              </FormRow>
              <FormError error={createPump.error?.error} />
              <Button color="green" onPress={onSubmit} isLoading={createPump.isLoading}>
                Create pump
              </Button>
            </View>
          </View>
        ) : (
          <ServiceList onFingerprint={setService} />
        )}
      </View>
    </Modal>
  );
};

export default CreatePumpModal;

const styles = StyleSheet.create({
  wrapper: {},

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

  pumpWrapper: {},

  pumpHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,

    paddingVertical: 16,
    paddingHorizontal: 24,

    backgroundColor: colors.silver,
  },

  pumpDetails: {
    flex: 1,
  },
  pumpTitle: {
    color: colors.black,
    fontSize: 18,
    fontWeight: "700",
  },
  pumpName: {
    flex: 1,

    color: colors.black,
    fontSize: 14,
    fontWeight: "400",
  },

  form: {
    alignItems: "center",
    gap: 12,

    padding: 32,

    backgroundColor: colors.silver,
  },
});
