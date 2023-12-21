/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  Button,
  Flex,
  Grid,
  SwitchField,
  TextField,
} from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { createJobs } from "../graphql/mutations";
const client = generateClient();
export default function JobsCreateForm(props) {
  const {
    clearOnSuccess = true,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    email: "",
    status: "",
    customer: "",
    endtime: "",
    starttime: "",
    wo_number: "",
    permit_number: "",
    permit: "",
    po_number: "",
    map: "",
    photo: "",
    p_confirm: "",
    phone_number: "",
    npat: false,
    setup: "",
  };
  const [email, setEmail] = React.useState(initialValues.email);
  const [status, setStatus] = React.useState(initialValues.status);
  const [customer, setCustomer] = React.useState(initialValues.customer);
  const [endtime, setEndtime] = React.useState(initialValues.endtime);
  const [starttime, setStarttime] = React.useState(initialValues.starttime);
  const [wo_number, setWo_number] = React.useState(initialValues.wo_number);
  const [permit_number, setPermit_number] = React.useState(
    initialValues.permit_number
  );
  const [permit, setPermit] = React.useState(initialValues.permit);
  const [po_number, setPo_number] = React.useState(initialValues.po_number);
  const [map, setMap] = React.useState(initialValues.map);
  const [photo, setPhoto] = React.useState(initialValues.photo);
  const [p_confirm, setP_confirm] = React.useState(initialValues.p_confirm);
  const [phone_number, setPhone_number] = React.useState(
    initialValues.phone_number
  );
  const [npat, setNpat] = React.useState(initialValues.npat);
  const [setup, setSetup] = React.useState(initialValues.setup);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setEmail(initialValues.email);
    setStatus(initialValues.status);
    setCustomer(initialValues.customer);
    setEndtime(initialValues.endtime);
    setStarttime(initialValues.starttime);
    setWo_number(initialValues.wo_number);
    setPermit_number(initialValues.permit_number);
    setPermit(initialValues.permit);
    setPo_number(initialValues.po_number);
    setMap(initialValues.map);
    setPhoto(initialValues.photo);
    setP_confirm(initialValues.p_confirm);
    setPhone_number(initialValues.phone_number);
    setNpat(initialValues.npat);
    setSetup(initialValues.setup);
    setErrors({});
  };
  const validations = {
    email: [],
    status: [],
    customer: [],
    endtime: [],
    starttime: [],
    wo_number: [],
    permit_number: [],
    permit: [],
    po_number: [],
    map: [],
    photo: [],
    p_confirm: [],
    phone_number: [],
    npat: [],
    setup: [],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  const convertToLocal = (date) => {
    const df = new Intl.DateTimeFormat("default", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      calendar: "iso8601",
      numberingSystem: "latn",
      hourCycle: "h23",
    });
    const parts = df.formatToParts(date).reduce((acc, part) => {
      acc[part.type] = part.value;
      return acc;
    }, {});
    return `${parts.year}-${parts.month}-${parts.day}T${parts.hour}:${parts.minute}`;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          email,
          status,
          customer,
          endtime,
          starttime,
          wo_number,
          permit_number,
          permit,
          po_number,
          map,
          photo,
          p_confirm,
          phone_number,
          npat,
          setup,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value === "") {
              modelFields[key] = null;
            }
          });
          await client.graphql({
            query: createJobs.replaceAll("__typename", ""),
            variables: {
              input: {
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
          if (clearOnSuccess) {
            resetStateValues();
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "JobsCreateForm")}
      {...rest}
    >
      <TextField
        label="Email"
        isRequired={false}
        isReadOnly={false}
        value={email}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              email: value,
              status,
              customer,
              endtime,
              starttime,
              wo_number,
              permit_number,
              permit,
              po_number,
              map,
              photo,
              p_confirm,
              phone_number,
              npat,
              setup,
            };
            const result = onChange(modelFields);
            value = result?.email ?? value;
          }
          if (errors.email?.hasError) {
            runValidationTasks("email", value);
          }
          setEmail(value);
        }}
        onBlur={() => runValidationTasks("email", email)}
        errorMessage={errors.email?.errorMessage}
        hasError={errors.email?.hasError}
        {...getOverrideProps(overrides, "email")}
      ></TextField>
      <TextField
        label="Status"
        isRequired={false}
        isReadOnly={false}
        value={status}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              email,
              status: value,
              customer,
              endtime,
              starttime,
              wo_number,
              permit_number,
              permit,
              po_number,
              map,
              photo,
              p_confirm,
              phone_number,
              npat,
              setup,
            };
            const result = onChange(modelFields);
            value = result?.status ?? value;
          }
          if (errors.status?.hasError) {
            runValidationTasks("status", value);
          }
          setStatus(value);
        }}
        onBlur={() => runValidationTasks("status", status)}
        errorMessage={errors.status?.errorMessage}
        hasError={errors.status?.hasError}
        {...getOverrideProps(overrides, "status")}
      ></TextField>
      <TextField
        label="Customer"
        isRequired={false}
        isReadOnly={false}
        value={customer}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              email,
              status,
              customer: value,
              endtime,
              starttime,
              wo_number,
              permit_number,
              permit,
              po_number,
              map,
              photo,
              p_confirm,
              phone_number,
              npat,
              setup,
            };
            const result = onChange(modelFields);
            value = result?.customer ?? value;
          }
          if (errors.customer?.hasError) {
            runValidationTasks("customer", value);
          }
          setCustomer(value);
        }}
        onBlur={() => runValidationTasks("customer", customer)}
        errorMessage={errors.customer?.errorMessage}
        hasError={errors.customer?.hasError}
        {...getOverrideProps(overrides, "customer")}
      ></TextField>
      <TextField
        label="Endtime"
        isRequired={false}
        isReadOnly={false}
        type="datetime-local"
        value={endtime && convertToLocal(new Date(endtime))}
        onChange={(e) => {
          let value =
            e.target.value === "" ? "" : new Date(e.target.value).toISOString();
          if (onChange) {
            const modelFields = {
              email,
              status,
              customer,
              endtime: value,
              starttime,
              wo_number,
              permit_number,
              permit,
              po_number,
              map,
              photo,
              p_confirm,
              phone_number,
              npat,
              setup,
            };
            const result = onChange(modelFields);
            value = result?.endtime ?? value;
          }
          if (errors.endtime?.hasError) {
            runValidationTasks("endtime", value);
          }
          setEndtime(value);
        }}
        onBlur={() => runValidationTasks("endtime", endtime)}
        errorMessage={errors.endtime?.errorMessage}
        hasError={errors.endtime?.hasError}
        {...getOverrideProps(overrides, "endtime")}
      ></TextField>
      <TextField
        label="Starttime"
        isRequired={false}
        isReadOnly={false}
        type="datetime-local"
        value={starttime && convertToLocal(new Date(starttime))}
        onChange={(e) => {
          let value =
            e.target.value === "" ? "" : new Date(e.target.value).toISOString();
          if (onChange) {
            const modelFields = {
              email,
              status,
              customer,
              endtime,
              starttime: value,
              wo_number,
              permit_number,
              permit,
              po_number,
              map,
              photo,
              p_confirm,
              phone_number,
              npat,
              setup,
            };
            const result = onChange(modelFields);
            value = result?.starttime ?? value;
          }
          if (errors.starttime?.hasError) {
            runValidationTasks("starttime", value);
          }
          setStarttime(value);
        }}
        onBlur={() => runValidationTasks("starttime", starttime)}
        errorMessage={errors.starttime?.errorMessage}
        hasError={errors.starttime?.hasError}
        {...getOverrideProps(overrides, "starttime")}
      ></TextField>
      <TextField
        label="Wo number"
        isRequired={false}
        isReadOnly={false}
        value={wo_number}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              email,
              status,
              customer,
              endtime,
              starttime,
              wo_number: value,
              permit_number,
              permit,
              po_number,
              map,
              photo,
              p_confirm,
              phone_number,
              npat,
              setup,
            };
            const result = onChange(modelFields);
            value = result?.wo_number ?? value;
          }
          if (errors.wo_number?.hasError) {
            runValidationTasks("wo_number", value);
          }
          setWo_number(value);
        }}
        onBlur={() => runValidationTasks("wo_number", wo_number)}
        errorMessage={errors.wo_number?.errorMessage}
        hasError={errors.wo_number?.hasError}
        {...getOverrideProps(overrides, "wo_number")}
      ></TextField>
      <TextField
        label="Permit number"
        isRequired={false}
        isReadOnly={false}
        value={permit_number}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              email,
              status,
              customer,
              endtime,
              starttime,
              wo_number,
              permit_number: value,
              permit,
              po_number,
              map,
              photo,
              p_confirm,
              phone_number,
              npat,
              setup,
            };
            const result = onChange(modelFields);
            value = result?.permit_number ?? value;
          }
          if (errors.permit_number?.hasError) {
            runValidationTasks("permit_number", value);
          }
          setPermit_number(value);
        }}
        onBlur={() => runValidationTasks("permit_number", permit_number)}
        errorMessage={errors.permit_number?.errorMessage}
        hasError={errors.permit_number?.hasError}
        {...getOverrideProps(overrides, "permit_number")}
      ></TextField>
      <TextField
        label="Permit"
        isRequired={false}
        isReadOnly={false}
        value={permit}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              email,
              status,
              customer,
              endtime,
              starttime,
              wo_number,
              permit_number,
              permit: value,
              po_number,
              map,
              photo,
              p_confirm,
              phone_number,
              npat,
              setup,
            };
            const result = onChange(modelFields);
            value = result?.permit ?? value;
          }
          if (errors.permit?.hasError) {
            runValidationTasks("permit", value);
          }
          setPermit(value);
        }}
        onBlur={() => runValidationTasks("permit", permit)}
        errorMessage={errors.permit?.errorMessage}
        hasError={errors.permit?.hasError}
        {...getOverrideProps(overrides, "permit")}
      ></TextField>
      <TextField
        label="Po number"
        isRequired={false}
        isReadOnly={false}
        value={po_number}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              email,
              status,
              customer,
              endtime,
              starttime,
              wo_number,
              permit_number,
              permit,
              po_number: value,
              map,
              photo,
              p_confirm,
              phone_number,
              npat,
              setup,
            };
            const result = onChange(modelFields);
            value = result?.po_number ?? value;
          }
          if (errors.po_number?.hasError) {
            runValidationTasks("po_number", value);
          }
          setPo_number(value);
        }}
        onBlur={() => runValidationTasks("po_number", po_number)}
        errorMessage={errors.po_number?.errorMessage}
        hasError={errors.po_number?.hasError}
        {...getOverrideProps(overrides, "po_number")}
      ></TextField>
      <TextField
        label="Map"
        isRequired={false}
        isReadOnly={false}
        value={map}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              email,
              status,
              customer,
              endtime,
              starttime,
              wo_number,
              permit_number,
              permit,
              po_number,
              map: value,
              photo,
              p_confirm,
              phone_number,
              npat,
              setup,
            };
            const result = onChange(modelFields);
            value = result?.map ?? value;
          }
          if (errors.map?.hasError) {
            runValidationTasks("map", value);
          }
          setMap(value);
        }}
        onBlur={() => runValidationTasks("map", map)}
        errorMessage={errors.map?.errorMessage}
        hasError={errors.map?.hasError}
        {...getOverrideProps(overrides, "map")}
      ></TextField>
      <TextField
        label="Photo"
        isRequired={false}
        isReadOnly={false}
        value={photo}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              email,
              status,
              customer,
              endtime,
              starttime,
              wo_number,
              permit_number,
              permit,
              po_number,
              map,
              photo: value,
              p_confirm,
              phone_number,
              npat,
              setup,
            };
            const result = onChange(modelFields);
            value = result?.photo ?? value;
          }
          if (errors.photo?.hasError) {
            runValidationTasks("photo", value);
          }
          setPhoto(value);
        }}
        onBlur={() => runValidationTasks("photo", photo)}
        errorMessage={errors.photo?.errorMessage}
        hasError={errors.photo?.hasError}
        {...getOverrideProps(overrides, "photo")}
      ></TextField>
      <TextField
        label="P confirm"
        isRequired={false}
        isReadOnly={false}
        value={p_confirm}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              email,
              status,
              customer,
              endtime,
              starttime,
              wo_number,
              permit_number,
              permit,
              po_number,
              map,
              photo,
              p_confirm: value,
              phone_number,
              npat,
              setup,
            };
            const result = onChange(modelFields);
            value = result?.p_confirm ?? value;
          }
          if (errors.p_confirm?.hasError) {
            runValidationTasks("p_confirm", value);
          }
          setP_confirm(value);
        }}
        onBlur={() => runValidationTasks("p_confirm", p_confirm)}
        errorMessage={errors.p_confirm?.errorMessage}
        hasError={errors.p_confirm?.hasError}
        {...getOverrideProps(overrides, "p_confirm")}
      ></TextField>
      <TextField
        label="Phone number"
        isRequired={false}
        isReadOnly={false}
        value={phone_number}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              email,
              status,
              customer,
              endtime,
              starttime,
              wo_number,
              permit_number,
              permit,
              po_number,
              map,
              photo,
              p_confirm,
              phone_number: value,
              npat,
              setup,
            };
            const result = onChange(modelFields);
            value = result?.phone_number ?? value;
          }
          if (errors.phone_number?.hasError) {
            runValidationTasks("phone_number", value);
          }
          setPhone_number(value);
        }}
        onBlur={() => runValidationTasks("phone_number", phone_number)}
        errorMessage={errors.phone_number?.errorMessage}
        hasError={errors.phone_number?.hasError}
        {...getOverrideProps(overrides, "phone_number")}
      ></TextField>
      <SwitchField
        label="Npat"
        defaultChecked={false}
        isDisabled={false}
        isChecked={npat}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              email,
              status,
              customer,
              endtime,
              starttime,
              wo_number,
              permit_number,
              permit,
              po_number,
              map,
              photo,
              p_confirm,
              phone_number,
              npat: value,
              setup,
            };
            const result = onChange(modelFields);
            value = result?.npat ?? value;
          }
          if (errors.npat?.hasError) {
            runValidationTasks("npat", value);
          }
          setNpat(value);
        }}
        onBlur={() => runValidationTasks("npat", npat)}
        errorMessage={errors.npat?.errorMessage}
        hasError={errors.npat?.hasError}
        {...getOverrideProps(overrides, "npat")}
      ></SwitchField>
      <TextField
        label="Setup"
        isRequired={false}
        isReadOnly={false}
        value={setup}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              email,
              status,
              customer,
              endtime,
              starttime,
              wo_number,
              permit_number,
              permit,
              po_number,
              map,
              photo,
              p_confirm,
              phone_number,
              npat,
              setup: value,
            };
            const result = onChange(modelFields);
            value = result?.setup ?? value;
          }
          if (errors.setup?.hasError) {
            runValidationTasks("setup", value);
          }
          setSetup(value);
        }}
        onBlur={() => runValidationTasks("setup", setup)}
        errorMessage={errors.setup?.errorMessage}
        hasError={errors.setup?.hasError}
        {...getOverrideProps(overrides, "setup")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Clear"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          {...getOverrideProps(overrides, "ClearButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
