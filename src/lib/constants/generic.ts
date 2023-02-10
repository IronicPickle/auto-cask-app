import { ItemValue, PickerItemProps } from "@react-native-picker/picker/typings/Picker";
import { OrganisationRole } from "@shared/enums/api/generic";
import { colors } from "./colors";

export const organisationRoleNames = {
  [OrganisationRole.Owner]: "Owner",
  [OrganisationRole.Admin]: "Admin",
  [OrganisationRole.Member]: "Member",
};

export const organisationRoleColors = {
  [OrganisationRole.Owner]: colors.red,
  [OrganisationRole.Admin]: colors.orange,
  [OrganisationRole.Member]: colors.teal,
};

export const organisationSelectItems: PickerItemProps<ItemValue>[] = [
  {
    value: OrganisationRole.Admin,
    label: organisationRoleNames.ADMIN,
    color: organisationRoleColors.ADMIN,
  },
  {
    value: OrganisationRole.Member,
    label: organisationRoleNames.MEMBER,
    color: organisationRoleColors.MEMBER,
  },
];
