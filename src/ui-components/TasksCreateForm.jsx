/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { createTasks } from "../graphql/mutations";
const client = generateClient();
export default function TasksCreateForm(props) {
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
    job_id: "",
    setup: "",
    notes: "",
    assigned: "",
    endtime: "",
    starttime: "",
    customer: "",
  };
  const [job_id, setJob_id] = React.useState(initialValues.job_id);
  const [setup, setSetup] = React.useState(initialValues.setup);
  const [notes, setNotes] = React.useState(initialValues.notes);
  const [assigned, setAssigned] = React.useState(initialValues.assigned);
  const [endtime, setEndtime] = React.useState(initialValues.endtime);
  const [starttime, setStarttime] = React.useState(initialValues.starttime);
  const [customer, setCustomer] = React.useState(initialValues.customer);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setJob_id(initialValues.job_id);
    setSetup(initialValues.setup);
    setNotes(initialValues.notes);
    setAssigned(initialValues.assigned);
    setEndtime(initialValues.endtime);
    setStarttime(initialValues.starttime);
    setCustomer(initialValues.customer);
    setErrors({});
  };
  const validations = {
    job_id: [],
    setup: [],
    notes: [],
    assigned: [],
    endtime: [],
    starttime: [],
    customer: [],
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
          job_id,
          setup,
          notes,
          assigned,
          endtime,
          starttime,
          customer,
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
            query: createTasks.replaceAll("__typename", ""),
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
      {...getOverrideProps(overrides, "TasksCreateForm")}
      {...rest}
    >
      <TextField
        label="Job id"
        isRequired={false}
        isReadOnly={false}
        value={job_id}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              job_id: value,
              setup,
              notes,
              assigned,
              endtime,
              starttime,
              customer,
            };
            const result = onChange(modelFields);
            value = result?.job_id ?? value;
          }
          if (errors.job_id?.hasError) {
            runValidationTasks("job_id", value);
          }
          setJob_id(value);
        }}
        onBlur={() => runValidationTasks("job_id", job_id)}
        errorMessage={errors.job_id?.errorMessage}
        hasError={errors.job_id?.hasError}
        {...getOverrideProps(overrides, "job_id")}
      ></TextField>
      <TextField
        label="Setup"
        isRequired={false}
        isReadOnly={false}
        value={setup}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              job_id,
              setup: value,
              notes,
              assigned,
              endtime,
              starttime,
              customer,
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
      <TextField
        label="Notes"
        isRequired={false}
        isReadOnly={false}
        value={notes}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              job_id,
              setup,
              notes: value,
              assigned,
              endtime,
              starttime,
              customer,
            };
            const result = onChange(modelFields);
            value = result?.notes ?? value;
          }
          if (errors.notes?.hasError) {
            runValidationTasks("notes", value);
          }
          setNotes(value);
        }}
        onBlur={() => runValidationTasks("notes", notes)}
        errorMessage={errors.notes?.errorMessage}
        hasError={errors.notes?.hasError}
        {...getOverrideProps(overrides, "notes")}
      ></TextField>
      <TextField
        label="Assigned"
        isRequired={false}
        isReadOnly={false}
        value={assigned}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              job_id,
              setup,
              notes,
              assigned: value,
              endtime,
              starttime,
              customer,
            };
            const result = onChange(modelFields);
            value = result?.assigned ?? value;
          }
          if (errors.assigned?.hasError) {
            runValidationTasks("assigned", value);
          }
          setAssigned(value);
        }}
        onBlur={() => runValidationTasks("assigned", assigned)}
        errorMessage={errors.assigned?.errorMessage}
        hasError={errors.assigned?.hasError}
        {...getOverrideProps(overrides, "assigned")}
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
              job_id,
              setup,
              notes,
              assigned,
              endtime: value,
              starttime,
              customer,
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
              job_id,
              setup,
              notes,
              assigned,
              endtime,
              starttime: value,
              customer,
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
        label="Customer"
        isRequired={false}
        isReadOnly={false}
        value={customer}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              job_id,
              setup,
              notes,
              assigned,
              endtime,
              starttime,
              customer: value,
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
