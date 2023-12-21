/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
export declare type EscapeHatchProps = {
    [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
    [key: string]: string;
};
export declare type Variant = {
    variantValues: VariantValues;
    overrides: EscapeHatchProps;
};
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type TasksCreateFormInputValues = {
    job_id?: string;
    setup?: string;
    notes?: string;
    assigned?: string;
    endtime?: string;
    starttime?: string;
    customer?: string;
};
export declare type TasksCreateFormValidationValues = {
    job_id?: ValidationFunction<string>;
    setup?: ValidationFunction<string>;
    notes?: ValidationFunction<string>;
    assigned?: ValidationFunction<string>;
    endtime?: ValidationFunction<string>;
    starttime?: ValidationFunction<string>;
    customer?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type TasksCreateFormOverridesProps = {
    TasksCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    job_id?: PrimitiveOverrideProps<TextFieldProps>;
    setup?: PrimitiveOverrideProps<TextFieldProps>;
    notes?: PrimitiveOverrideProps<TextFieldProps>;
    assigned?: PrimitiveOverrideProps<TextFieldProps>;
    endtime?: PrimitiveOverrideProps<TextFieldProps>;
    starttime?: PrimitiveOverrideProps<TextFieldProps>;
    customer?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type TasksCreateFormProps = React.PropsWithChildren<{
    overrides?: TasksCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: TasksCreateFormInputValues) => TasksCreateFormInputValues;
    onSuccess?: (fields: TasksCreateFormInputValues) => void;
    onError?: (fields: TasksCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: TasksCreateFormInputValues) => TasksCreateFormInputValues;
    onValidate?: TasksCreateFormValidationValues;
} & React.CSSProperties>;
export default function TasksCreateForm(props: TasksCreateFormProps): React.ReactElement;
