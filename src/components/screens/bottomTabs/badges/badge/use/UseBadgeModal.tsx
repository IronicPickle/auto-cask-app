import { colors } from "@lib/constants/colors";
import dayjs from "dayjs";
import { StyleSheet, Text, View } from "react-native";
import { Badge } from "@shared/ts/api/generic";
import Modal from "@components/modals/Modal";
import React, { useEffect, useState } from "react";
import TextWrapper from "@components/common/TextWrapper";
import PumpSelectList from "./pumpSelect/PumpSelectList";
import OrganisationSelectList from "./organisationSelect/OrganisationSelectList";
import UseBadgeConfirm from "./confirm/UseBadgeConfirm";

interface Props {
  badge?: Badge;
  onClose: () => void;
}

const UseBadgeModal = (props: Props) => {
  const { badge, onClose } = props;

  const [organisationId, setOrganisationId] = useState<string | undefined>(undefined);
  const [pumpId, setPumpId] = useState<string | undefined>(undefined);

  const { name, createdOn } = badge ?? {};

  const organisationSelectActive = !organisationId;
  const pumpSelectActive = !!organisationId && !pumpId;

  useEffect(() => {
    setOrganisationId(undefined);
    setPumpId(undefined);
  }, [badge]);

  return (
    <Modal active={!!badge} onClose={onClose}>
      <View style={styles.wrapper}>
        <View style={styles.details}>
          <TextWrapper>
            <Text style={styles.name} numberOfLines={1}>
              Using {name}
            </Text>
          </TextWrapper>
          <Text style={styles.createdOn}>Created {dayjs(createdOn).format("DD/MM/YYYY")}</Text>
        </View>

        {organisationSelectActive && <OrganisationSelectList onSelect={setOrganisationId} />}
        {pumpSelectActive && (
          <PumpSelectList organisationId={organisationId} onSelect={setPumpId} />
        )}

        {organisationId && pumpId && badge && (
          <UseBadgeConfirm
            organisationId={organisationId}
            pumpId={pumpId}
            badgeId={badge._id}
            onClose={onClose}
          />
        )}
      </View>
    </Modal>
  );
};

export default UseBadgeModal;

const styles = StyleSheet.create({
  wrapper: {},

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
