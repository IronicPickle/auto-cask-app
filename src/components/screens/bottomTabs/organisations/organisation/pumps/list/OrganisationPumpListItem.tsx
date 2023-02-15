import { colors } from "@lib/constants/colors";
import { OrganisationPump } from "@shared/ts/api/generic";
import dayjs from "dayjs";
import { Pressable, StyleSheet } from "react-native";
import { Text, View } from "react-native";
import TextWrapper from "@components/common/TextWrapper";

interface Props {
  pump: OrganisationPump;
  onPress: () => void;
}

const OrganisationPumpListItem = (props: Props) => {
  const { pump, onPress } = props;

  const { name, createdOn } = pump;

  return (
    <Pressable style={styles.wrapper} onPress={onPress}>
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

export default OrganisationPumpListItem;

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 16,

    paddingVertical: 16,
    paddingHorizontal: 8,
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
});
