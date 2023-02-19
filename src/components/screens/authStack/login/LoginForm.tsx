import useLogin from "@api/auth/hooks/useLogin";
import Button from "@components/common/Button";
import Input from "@components/common/Input";
import useForm from "@hooks/useForm";
import { storageManager } from "@src/App";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import authValidators from "@shared/validators/authValidators";
import FormRow from "@components/form/FormRow";
import FormEntry from "@components/form/FormEntry";
import FormError from "@components/form/FormError";
import { ScrollView } from "react-native-gesture-handler";
import { colors } from "@lib/constants/colors";
import { useAuthStackNavigator } from "@src/AuthStackNavigator";
import useGlobalContext from "@src/globalContext/hooks/useGlobalContext";

const LoginForm = () => {
  const { self } = useGlobalContext();

  const navigator = useAuthStackNavigator();

  const login = useLogin(undefined);

  const { values, validation, onChange, onSubmit } = useForm(
    {
      email: "",
      password: "",
    },
    async (): Promise<any> => {
      const res = await login.send({
        body: {
          email: values.email,
          password: values.password,
        },
      });
      const { data: tokens } = res;
      if (tokens) storageManager.set("session", tokens);
      return res;
    },
    authValidators.login,
  );

  const isLoading = login.isLoading || self.isLoading;
  const error = login.error ?? self.error;

  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>Auto Cask</Text>

      <View style={styles.formWrapper}>
        <Text style={styles.subTitle}>Sign in</Text>
        <ScrollView contentContainerStyle={styles.form}>
          <FormRow>
            <FormEntry label="Email" errors={validation.email}>
              <Input
                size="medium"
                variant="outlined"
                color="black"
                textColor="black"
                name="email"
                value={values.email}
                onChange={onChange}
                type="emailAddress"
                placeholder="example@email.com"
              />
            </FormEntry>
          </FormRow>
          <FormRow>
            <FormEntry label="Password" errors={validation.password}>
              <Input
                size="medium"
                variant="outlined"
                color="black"
                textColor="black"
                name="password"
                value={values.password}
                onChange={onChange}
                type="password"
                placeholder="*********"
              />
            </FormEntry>
          </FormRow>
          <Button
            size="medium"
            variant="flat"
            textColor="black"
            style={styles.ctaButton}
            onPress={() => navigator.navigate("Register")}
          >
            Don't have an account?
          </Button>
          <FormError error={error?.error} />
        </ScrollView>
      </View>

      <Button
        size="medium"
        variant="contained"
        color="black"
        textColor="white"
        endIcon={<Icon name="arrow-forward" />}
        onPress={onSubmit}
        isLoading={isLoading}
      >
        Login
      </Button>
    </View>
  );
};

export default LoginForm;

const styles = StyleSheet.create({
  wrapper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 16,

    height: "100%",

    padding: 24,
  },

  title: {
    fontSize: 36,
    fontWeight: "700",
    color: colors.black,
    textAlign: "center",
  },

  formWrapper: {
    width: "100%",
  },
  subTitle: {
    fontSize: 24,
    fontWeight: "600",
    color: colors.black,
  },
  form: {
    gap: 16,

    marginTop: 24,
  },
  ctaButton: {
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
});
