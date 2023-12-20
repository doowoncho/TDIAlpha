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
import { getFiles } from "../graphql/queries";
import { updateFiles } from "../graphql/mutations";
const client = generateClient();
export default function FilesUpdateForm(props) {
  const {
    id: idProp,
    files: filesModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    photo_name: "",
    photo_file: "",
    permit_name: "",
    permit_file: "",
    permit_confirmation_name: "",
    permit_confirmation_file: "",
    map_drawing_name: "",
    map_file: "",
  };
  const [photo_name, setPhoto_name] = React.useState(initialValues.photo_name);
  const [photo_file, setPhoto_file] = React.useState(initialValues.photo_file);
  const [permit_name, setPermit_name] = React.useState(
    initialValues.permit_name
  );
  const [permit_file, setPermit_file] = React.useState(
    initialValues.permit_file
  );
  const [permit_confirmation_name, setPermit_confirmation_name] =
    React.useState(initialValues.permit_confirmation_name);
  const [permit_confirmation_file, setPermit_confirmation_file] =
    React.useState(initialValues.permit_confirmation_file);
  const [map_drawing_name, setMap_drawing_name] = React.useState(
    initialValues.map_drawing_name
  );
  const [map_file, setMap_file] = React.useState(initialValues.map_file);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = filesRecord
      ? { ...initialValues, ...filesRecord }
      : initialValues;
    setPhoto_name(cleanValues.photo_name);
    setPhoto_file(cleanValues.photo_file);
    setPermit_name(cleanValues.permit_name);
    setPermit_file(cleanValues.permit_file);
    setPermit_confirmation_name(cleanValues.permit_confirmation_name);
    setPermit_confirmation_file(cleanValues.permit_confirmation_file);
    setMap_drawing_name(cleanValues.map_drawing_name);
    setMap_file(cleanValues.map_file);
    setErrors({});
  };
  const [filesRecord, setFilesRecord] = React.useState(filesModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getFiles.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getFiles
        : filesModelProp;
      setFilesRecord(record);
    };
    queryData();
  }, [idProp, filesModelProp]);
  React.useEffect(resetStateValues, [filesRecord]);
  const validations = {
    photo_name: [],
    photo_file: [],
    permit_name: [],
    permit_file: [],
    permit_confirmation_name: [],
    permit_confirmation_file: [],
    map_drawing_name: [],
    map_file: [],
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
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          photo_name: photo_name ?? null,
          photo_file: photo_file ?? null,
          permit_name: permit_name ?? null,
          permit_file: permit_file ?? null,
          permit_confirmation_name: permit_confirmation_name ?? null,
          permit_confirmation_file: permit_confirmation_file ?? null,
          map_drawing_name: map_drawing_name ?? null,
          map_file: map_file ?? null,
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
            query: updateFiles.replaceAll("__typename", ""),
            variables: {
              input: {
                id: filesRecord.id,
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "FilesUpdateForm")}
      {...rest}
    >
      <TextField
        label="Photo name"
        isRequired={false}
        isReadOnly={false}
        value={photo_name}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              photo_name: value,
              photo_file,
              permit_name,
              permit_file,
              permit_confirmation_name,
              permit_confirmation_file,
              map_drawing_name,
              map_file,
            };
            const result = onChange(modelFields);
            value = result?.photo_name ?? value;
          }
          if (errors.photo_name?.hasError) {
            runValidationTasks("photo_name", value);
          }
          setPhoto_name(value);
        }}
        onBlur={() => runValidationTasks("photo_name", photo_name)}
        errorMessage={errors.photo_name?.errorMessage}
        hasError={errors.photo_name?.hasError}
        {...getOverrideProps(overrides, "photo_name")}
      ></TextField>
      <TextField
        label="Photo file"
        isRequired={false}
        isReadOnly={false}
        value={photo_file}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              photo_name,
              photo_file: value,
              permit_name,
              permit_file,
              permit_confirmation_name,
              permit_confirmation_file,
              map_drawing_name,
              map_file,
            };
            const result = onChange(modelFields);
            value = result?.photo_file ?? value;
          }
          if (errors.photo_file?.hasError) {
            runValidationTasks("photo_file", value);
          }
          setPhoto_file(value);
        }}
        onBlur={() => runValidationTasks("photo_file", photo_file)}
        errorMessage={errors.photo_file?.errorMessage}
        hasError={errors.photo_file?.hasError}
        {...getOverrideProps(overrides, "photo_file")}
      ></TextField>
      <TextField
        label="Permit name"
        isRequired={false}
        isReadOnly={false}
        value={permit_name}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              photo_name,
              photo_file,
              permit_name: value,
              permit_file,
              permit_confirmation_name,
              permit_confirmation_file,
              map_drawing_name,
              map_file,
            };
            const result = onChange(modelFields);
            value = result?.permit_name ?? value;
          }
          if (errors.permit_name?.hasError) {
            runValidationTasks("permit_name", value);
          }
          setPermit_name(value);
        }}
        onBlur={() => runValidationTasks("permit_name", permit_name)}
        errorMessage={errors.permit_name?.errorMessage}
        hasError={errors.permit_name?.hasError}
        {...getOverrideProps(overrides, "permit_name")}
      ></TextField>
      <TextField
        label="Permit file"
        isRequired={false}
        isReadOnly={false}
        value={permit_file}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              photo_name,
              photo_file,
              permit_name,
              permit_file: value,
              permit_confirmation_name,
              permit_confirmation_file,
              map_drawing_name,
              map_file,
            };
            const result = onChange(modelFields);
            value = result?.permit_file ?? value;
          }
          if (errors.permit_file?.hasError) {
            runValidationTasks("permit_file", value);
          }
          setPermit_file(value);
        }}
        onBlur={() => runValidationTasks("permit_file", permit_file)}
        errorMessage={errors.permit_file?.errorMessage}
        hasError={errors.permit_file?.hasError}
        {...getOverrideProps(overrides, "permit_file")}
      ></TextField>
      <TextField
        label="Permit confirmation name"
        isRequired={false}
        isReadOnly={false}
        value={permit_confirmation_name}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              photo_name,
              photo_file,
              permit_name,
              permit_file,
              permit_confirmation_name: value,
              permit_confirmation_file,
              map_drawing_name,
              map_file,
            };
            const result = onChange(modelFields);
            value = result?.permit_confirmation_name ?? value;
          }
          if (errors.permit_confirmation_name?.hasError) {
            runValidationTasks("permit_confirmation_name", value);
          }
          setPermit_confirmation_name(value);
        }}
        onBlur={() =>
          runValidationTasks(
            "permit_confirmation_name",
            permit_confirmation_name
          )
        }
        errorMessage={errors.permit_confirmation_name?.errorMessage}
        hasError={errors.permit_confirmation_name?.hasError}
        {...getOverrideProps(overrides, "permit_confirmation_name")}
      ></TextField>
      <TextField
        label="Permit confirmation file"
        isRequired={false}
        isReadOnly={false}
        value={permit_confirmation_file}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              photo_name,
              photo_file,
              permit_name,
              permit_file,
              permit_confirmation_name,
              permit_confirmation_file: value,
              map_drawing_name,
              map_file,
            };
            const result = onChange(modelFields);
            value = result?.permit_confirmation_file ?? value;
          }
          if (errors.permit_confirmation_file?.hasError) {
            runValidationTasks("permit_confirmation_file", value);
          }
          setPermit_confirmation_file(value);
        }}
        onBlur={() =>
          runValidationTasks(
            "permit_confirmation_file",
            permit_confirmation_file
          )
        }
        errorMessage={errors.permit_confirmation_file?.errorMessage}
        hasError={errors.permit_confirmation_file?.hasError}
        {...getOverrideProps(overrides, "permit_confirmation_file")}
      ></TextField>
      <TextField
        label="Map drawing name"
        isRequired={false}
        isReadOnly={false}
        value={map_drawing_name}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              photo_name,
              photo_file,
              permit_name,
              permit_file,
              permit_confirmation_name,
              permit_confirmation_file,
              map_drawing_name: value,
              map_file,
            };
            const result = onChange(modelFields);
            value = result?.map_drawing_name ?? value;
          }
          if (errors.map_drawing_name?.hasError) {
            runValidationTasks("map_drawing_name", value);
          }
          setMap_drawing_name(value);
        }}
        onBlur={() => runValidationTasks("map_drawing_name", map_drawing_name)}
        errorMessage={errors.map_drawing_name?.errorMessage}
        hasError={errors.map_drawing_name?.hasError}
        {...getOverrideProps(overrides, "map_drawing_name")}
      ></TextField>
      <TextField
        label="Map file"
        isRequired={false}
        isReadOnly={false}
        value={map_file}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              photo_name,
              photo_file,
              permit_name,
              permit_file,
              permit_confirmation_name,
              permit_confirmation_file,
              map_drawing_name,
              map_file: value,
            };
            const result = onChange(modelFields);
            value = result?.map_file ?? value;
          }
          if (errors.map_file?.hasError) {
            runValidationTasks("map_file", value);
          }
          setMap_file(value);
        }}
        onBlur={() => runValidationTasks("map_file", map_file)}
        errorMessage={errors.map_file?.errorMessage}
        hasError={errors.map_file?.hasError}
        {...getOverrideProps(overrides, "map_file")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || filesModelProp)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(idProp || filesModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
