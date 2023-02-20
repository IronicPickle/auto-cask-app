import { colors } from "@lib/constants/colors";
import { organisationRoleColors, organisationRoleNames } from "@constants/generic";
import dayjs from "dayjs";
import { Pressable, StyleSheet } from "react-native";
import { Text, View } from "react-native";
import TextWrapper from "@components/common/TextWrapper";
import { OrganisationPump } from "@shared/ts/api/generic";

interface Props {
  pump: OrganisationPump;
  onSelect: () => void;
}

const PumpSelectListItem = (props: Props) => {
  const { pump, onSelect } = props;

  const { name, createdOn } = pump;

  return (
    <Pressable style={styles.wrapper} onPress={onSelect}>
      <View style={styles.detailsWrapper}>
        <TextWrapper>
          <Text style={styles.name} numberOfLines={1}>
            {name}
          </Text>
        </TextWrapper>
        <Text style={styles.createdOn}>Created {dayjs(createdOn).format("DD/MM/YYYY")}</Text>
      </View>
    </Pressable>
  );
};

export default PumpSelectListItem;

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 16,

    backgroundColor: colors.silver,

    paddingVertical: 16,
    paddingHorizontal: 24,
  },

  detailsWrapper: {
    flex: 1,
  },
  name: {
    flex: 1,

    color: colors.black,
    fontSize: 18,
    fontWeight: "700",
  },
  createdOn: {
    color: colors.black,
    fontSize: 14,
    fontWeight: "400",
  },
  role: {
    fontSize: 16,
    fontWeight: "500",
  },
});
