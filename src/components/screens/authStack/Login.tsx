import useLogin from "@api/auth/hooks/useLogin";
import Button from "@components/common/Button";
import Input from "@components/common/Input";
import useForm from "@hooks/useForm";
import { storageManager } from "@src/App";
import React from "react";
import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Ionicons";
import authValidators from "@shared/validators/authValidators";
import FormRow from "@components/form/FormRow";
import FormEntry from "@components/form/FormEntry";
import FormError from "@components/form/FormError";

const Login = () => {
  const { send: login, isLoading, error } = useLogin();

  const { values, validation, onChange, onSubmit } = useForm(
    {
      email: "",
      password: "",
    },
    async () => {
      const { data: tokens } = await login(values);
      if (tokens) storageManager.set("session", tokens);
    },
    authValidators.login,
  );

  return (
    <SafeAreaView style={styles.container}>
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
            style={styles.inputs}
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
            style={styles.inputs}
          />
        </FormEntry>
      </FormRow>

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

      <FormError error={error?.error} />
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 16,

    height: "100%",

    padding: 24,
  },

  inputs: {
    width: "100%",
  },
});
