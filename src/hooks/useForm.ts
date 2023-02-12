import type { ChangeData } from "@ts/form";
import type Validator from "@shared/utils/Validator";
import type { ValidationErrors } from "@shared/ts/api/generic";
import { isBoolean } from "@shared/utils/generic";
import { useState } from "react";
import { RequestRes } from "@api/hooks/useRequest";
import { GenericErrorCode } from "@shared/enums/api/generic";

export default <IS extends object>(
  initialValues: IS,
  handle: (values: IS) => Promise<RequestRes<any, any> | void>,
  getValidators?: (values: IS) => {
    [N in keyof IS]?: Validator;
  },
) => {
  const [values, setValues] = useState(initialValues);
  const [validation, setValidation] = useState({ failed: false } as ValidationErrors<keyof IS>);

  const updateValidation = <N extends keyof IS>(name: N, errors: string[]) => {
    setValidation(validation => {
      const newValidation = { ...validation, [name]: errors };
      if (errors.length === 0) delete newValidation[name];
      const failed = Object.values(newValidation).some(err => !isBoolean(err) && err);

      return { ...newValidation, failed };
    });
  };

  const onChange = <N extends keyof IS>({ name, value }: ChangeData<N, IS[N]>) => {
    if (name == null) return;

    setValues(values => ({ ...values, [name]: value }));

    validate(name, value);
  };

  const validate = <N extends keyof IS>(name: N, value?: any) => {
    if (!getValidators) return { failed: false } as ValidationErrors<keyof IS>;

    const currentValues = value ? { ...values, [name]: value } : values;
    const validator = getValidators(currentValues)[name];
    if (!validator) return { failed: false } as ValidationErrors<keyof IS>;

    updateValidation(name, validator.getErrors());
  };

  const validateAll = () => {
    let failed = false;
    for (const name of Object.keys(values) as Array<keyof IS>) {
      const { failed: validateFailed } = validate(name) ?? {};
      if (validateFailed) failed = true;
    }
    return failed;
  };

  const onSubmit = async () => {
    const failed = validateAll();
    if (!failed) {
      const res = await handle(values);
      const { error } = res ?? {};
      if (error?.errorCode === GenericErrorCode.ValidationError) setValidation(error.validation);
    }
    return !failed;
  };

  const resetValues = () => {
    setValues(initialValues);
    setValidation({ failed: false } as ValidationErrors<keyof IS>);
  };

  return { values, validation, onChange, onSubmit, setValues, resetValues };
};
