import useGetMemberships from "@api/users/hooks/useGetMemberships";
import DataCheck from "@components/common/DataCheck";
import { useFocusEffect } from "@react-navigation/native";
import { isEmpty } from "@shared/utils/generic";
import { useCallback, useEffect } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import OrganisationSelectListItem from "./OrganisationSelectListItem";

interface Props {
  onSelect: (organisationId: string) => void;
}

const OrganisationSelectList = (props: Props) => {
  const { onSelect } = props;

  const memberships = useGetMemberships([]);

  useFocusEffect(
    useCallback(() => {
      memberships.send({});
    }, []),
  );

  useEffect(() => {
    if (memberships.data.length === 1) onSelect(memberships.data[0].organisation._id);
  }, [memberships.data]);

  if (memberships.data.length === 1) return null;

  return (
    <View style={styles.wrapper}>
      <DataCheck
        error={memberships.error?.error}
        isEmpty={isEmpty(memberships.data)}
        emptyMessage="You're not a member of any organisations"
      >
        <ScrollView>
          {memberships.data.map(membership => (
            <OrganisationSelectListItem
              key={membership._id}
              membership={membership}
              onSelect={() => onSelect(membership.organisation._id)}
            />
          ))}
        </ScrollView>
      </DataCheck>
    </View>
  );
};

export default OrganisationSelectList;

const styles = StyleSheet.create({
  wrapper: {
    minHeight: 100,
  },
});
