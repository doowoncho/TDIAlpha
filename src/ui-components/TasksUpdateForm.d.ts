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
export declare type TasksUpdateFormInputValues = {
    job_id?: number;
    setup?: string;
    notes?: string;
    assigned?: string;
    endtime?: string;
    starttime?: string;
};
export declare type TasksUpdateFormValidationValues = {
    job_id?: ValidationFunction<number>;
    setup?: ValidationFunction<string>;
    notes?: ValidationFunction<string>;
    assigned?: ValidationFunction<string>;
    endtime?: ValidationFunction<string>;
    starttime?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type TasksUpdateFormOverridesProps = {
    TasksUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    job_id?: PrimitiveOverrideProps<TextFieldProps>;
    setup?: PrimitiveOverrideProps<TextFieldProps>;
    notes?: PrimitiveOverrideProps<TextFieldProps>;
    assigned?: PrimitiveOverrideProps<TextFieldProps>;
    endtime?: PrimitiveOverrideProps<TextFieldProps>;
    starttime?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type TasksUpdateFormProps = React.PropsWithChildren<{
    overrides?: TasksUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    tasks?: any;
    onSubmit?: (fields: TasksUpdateFormInputValues) => TasksUpdateFormInputValues;
    onSuccess?: (fields: TasksUpdateFormInputValues) => void;
    onError?: (fields: TasksUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: TasksUpdateFormInputValues) => TasksUpdateFormInputValues;
    onValidate?: TasksUpdateFormValidationValues;
} & React.CSSProperties>;
export default function TasksUpdateForm(props: TasksUpdateFormProps): React.ReactElement;
