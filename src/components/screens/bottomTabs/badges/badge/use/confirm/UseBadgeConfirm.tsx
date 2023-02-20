import useUpdateOrganisationPumpsBadge from "@api/organisations/pumps/badge/hooks/useUpdateOrganisationPumpsBadge";
import useGetOrganisationPump from "@api/organisations/pumps/hooks/useGetOrganisationPump";
import Button from "@components/common/Button";
import DataCheck from "@components/common/DataCheck";
import { colors } from "@lib/constants/colors";
import { isEmpty } from "@shared/utils/generic";
import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

interface Props {
  organisationId: string;
  pumpId: string;
  badgeId: string;
  onClose: () => void;
}

const UseBadgeConfirm = (props: Props) => {
  const { organisationId, pumpId, badgeId, onClose } = props;

  const pump = useGetOrganisationPump(undefined);
  const updatePumpBadge = useUpdateOrganisationPumpsBadge(undefined);

  useEffect(() => {
    pump.send({
      params: { organisationId, pumpId },
    });
  }, [organisationId, pumpId]);

  const handleConfirm = async () => {
    await updatePumpBadge.send({
      params: { organisationId, pumpId },
      body: {
        badgeId,
      },
    });
    onClose();
  };

  return (
    <View style={styles.wrapper}>
      <DataCheck
        error={pump.error?.error}
        isEmpty={isEmpty(pump.data)}
        isLoading={pump.isLoading}
        emptyMessage="Missing organisation or pump"
      >
        <View style={styles.summaryWrapper}>
          <Text style={styles.label}>Organisation</Text>
          <Text style={styles.value}>{pump.data?.organisation.name}</Text>
        </View>
        <View style={[styles.summaryWrapper, { marginTop: 16 }]}>
          <Text style={styles.label}>Pump</Text>
          <Text style={styles.value}>{pump.data?.name}</Text>
        </View>
      </DataCheck>

      <View style={styles.buttonWrapper}>
        <Button
          color="red"
          textColor="white"
          onPress={onClose}
          disabled={updatePumpBadge.isLoading}
        >
          Cancel
        </Button>
        <Button
          color="blue"
          textColor="white"
          onPress={handleConfirm}
          isLoading={updatePumpBadge.isLoading}
        >
          Confirm
        </Button>
      </View>
    </View>
  );
};

export default UseBadgeConfirm;

const styles = StyleSheet.create({
  wrapper: {
    minHeight: 100,
  },

  summaryWrapper: {
    backgroundColor: colors.silver,

    paddingVertical: 16,
    paddingHorizontal: 24,
  },

  label: {
    color: colors.gray,
    fontSize: 16,
    fontWeight: "700",
  },
  value: {
    color: colors.black,
    fontSize: 24,
    fontWeight: "500",
  },

  buttonWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,

    marginTop: 32,
    paddingHorizontal: 32,
    paddingBottom: 32,
  },
});
