import TextWrapper from "@components/common/TextWrapper";
import config from "@config/config";
import useForceRerender from "@hooks/useForceRerender";
import { colors } from "@lib/constants/colors";
import { generateBadgeImageUrl } from "@lib/utils/generic";
import { useFocusEffect } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import dayjs from "dayjs";
import { useCallback } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { BadgesStackParamList } from "../BadgesStackNavigator";
import useBadgesContext from "../context/useBadgesContext";
import DeleteBadgeButton from "./DeleteBadgeButton";
import GetQrcodeButton from "./GetQrcodeButton";
import UpdateBadgeButton from "./UpdateBadgeButton";
import UpdateBadgeImageButton from "./UpdateBadgeImageButton";
import UseBadgeButton from "./UseBadgeButton";

interface Props extends StackScreenProps<BadgesStackParamList, "Badge"> {}

const Badge = (props: Props) => {
  const { route } = props;

  const { badges } = useBadgesContext();

  const [imageKey, reloadImage] = useForceRerender();

  const { badgeId, autoUse } = route.params;

  const badge = badges.data.find(({ _id }) => _id === badgeId);

  useFocusEffect(
    useCallback(() => {
      badges.send({});
    }, []),
  );

  if (!badge) return null;

  const { _id, name, breweryName, createdBy, createdOn } = badge;

  return (
    <ScrollView style={styles.wrapper}>
      <View style={styles.details}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <TextWrapper>
              <Text style={styles.name} numberOfLines={1}>
                {name}
              </Text>
            </TextWrapper>
            <Text style={styles.createdOn}>Created {dayjs(createdOn).format("DD/MM/YYYY")}</Text>
          </View>
          <View style={styles.headerRight}>
            <DeleteBadgeButton badge={badge} />
            <UpdateBadgeButton badge={badge} />
          </View>
        </View>

        <Text style={styles.label}>Brewery</Text>
        <Text style={styles.value}>{breweryName}</Text>

        <Text style={styles.label}>Created By</Text>
        <Text style={styles.value}>{createdBy.displayName}</Text>
      </View>

      <Image
        key={imageKey}
        source={{
          uri: generateBadgeImageUrl(_id),
        }}
        resizeMode="contain"
        style={styles.image}
      />

      <View style={styles.options}>
        <UpdateBadgeImageButton badge={badge} onClose={reloadImage} />
        <UseBadgeButton badge={badge} autoUse={autoUse} />
        <GetQrcodeButton badge={badge} />
      </View>
    </ScrollView>
  );
};

export default Badge;

const styles = StyleSheet.create({
  wrapper: {},

  details: {
    padding: 32,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 16,
  },
  headerLeft: {
    flex: 1,
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

  headerRight: {
    flexShrink: 0,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  label: {
    marginTop: 24,

    color: colors.gray,
    fontSize: 16,
    fontWeight: "700",
  },
  value: {
    color: colors.black,
    fontSize: 24,
    fontWeight: "500",
  },

  image: {
    height: 300,

    paddingHorizontal: 32,
  },

  options: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    gap: 16,

    padding: 32,
  },
});
