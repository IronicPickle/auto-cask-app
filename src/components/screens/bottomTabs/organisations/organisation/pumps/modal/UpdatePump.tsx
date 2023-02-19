import FormEntry from "@components/form/FormEntry";
import FormError from "@components/form/FormError";
import FormRow from "@components/form/FormRow";
import useForm from "@hooks/useForm";
import { colors } from "@lib/constants/colors";
import organisationValidators from "@shared/validators/organisationValidators";
import { Organisation, OrganisationPump } from "@shared/ts/api/generic";
import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import useGlobalContext from "@src/globalContext/hooks/useGlobalContext";
import Button from "@components/common/Button";
import DialogModal from "@components/modals/DialogModal";
import useDialogModal from "@components/modals/hooks/useDialogModal";
import useOrganisationsContext from "@screens/bottomTabs/organisations/context/useOrganisationsContext";
import useUpdateOrganisationPump from "@api/organisations/pumps/hooks/useUpdateOrganisationPump";
import Input from "@components/common/Input";

interface Props {
  pump?: OrganisationPump;
  onClose?: () => void;
}

const UpdatePump = (props: Props) => {
  const { pump, onClose = () => {} } = props;

  const { self } = useGlobalContext();

  const { permissionChecker } = useOrganisationsContext();

  const updatePump = useUpdateOrganisationPump(null);

  const { name } = pump ?? {};

  const { values, validation, onChange, onSubmit, setValues, resetValues } = useForm(
    {
      organisationId: "",
      pumpId: "",
      name: "",
    },
    async values => {
      const res = await updatePump.send({
        params: {
          organisationId: values.organisationId,
          pumpId: values.pumpId,
        },
        body: {
          name: values.name,
        },
      });
      if (!res.error) onClose();
      return res;
    },
    organisationValidators.pumpsUpdate,
  );

  const { dialogActive, openDialog, closeDialog, confirmDialog } = useDialogModal(onSubmit);

  useEffect(() => {
    if (!pump) return;
    resetValues();
    updatePump.reset();
    setValues({
      organisationId: pump.organisation._id,
      pumpId: pump._id,
      name: pump.name,
    });
  }, [pump]);

  const canUpdatePumps = permissionChecker.canUpdatePumps(self.data?._id);

  const changesMade = values.name !== name;

  return (
    <View style={styles.wrapper}>
      <FormRow>
        <FormEntry label="Name" errors={validation.name}>
          <Input
            variant="outlined"
            textColor="black"
            name="name"
            placeholder="Pump #1"
            value={values.name}
            onChange={onChange}
            disabled={!canUpdatePumps}
          />
        </FormEntry>
      </FormRow>
      <FormError error={updatePump.error?.error} />
      {changesMade && (
        <Button color="green" onPress={openDialog} isLoading={updatePump.isLoading}>
          Update pump
        </Button>
      )}

      <DialogModal active={dialogActive} onClose={closeDialog} onConfirm={confirmDialog} />
    </View>
  );
};

export default UpdatePump;

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
    gap: 12,

    padding: 32,

    backgroundColor: colors.silver,
  },
});
