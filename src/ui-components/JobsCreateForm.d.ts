/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SwitchFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
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
export declare type JobsCreateFormInputValues = {
    email?: string;
    status?: string;
    customer?: string;
    endtime?: string;
    starttime?: string;
    wo_number?: string;
    permit_number?: string;
    permit?: string;
    po_number?: string;
    map?: string;
    photo?: string;
    p_confirm?: string;
    phone_number?: string;
    npat?: boolean;
};
export declare type JobsCreateFormValidationValues = {
    email?: ValidationFunction<string>;
    status?: ValidationFunction<string>;
    customer?: ValidationFunction<string>;
    endtime?: ValidationFunction<string>;
    starttime?: ValidationFunction<string>;
    wo_number?: ValidationFunction<string>;
    permit_number?: ValidationFunction<string>;
    permit?: ValidationFunction<string>;
    po_number?: ValidationFunction<string>;
    map?: ValidationFunction<string>;
    photo?: ValidationFunction<string>;
    p_confirm?: ValidationFunction<string>;
    phone_number?: ValidationFunction<string>;
    npat?: ValidationFunction<boolean>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type JobsCreateFormOverridesProps = {
    JobsCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    email?: PrimitiveOverrideProps<TextFieldProps>;
    status?: PrimitiveOverrideProps<TextFieldProps>;
    customer?: PrimitiveOverrideProps<TextFieldProps>;
    endtime?: PrimitiveOverrideProps<TextFieldProps>;
    starttime?: PrimitiveOverrideProps<TextFieldProps>;
    wo_number?: PrimitiveOverrideProps<TextFieldProps>;
    permit_number?: PrimitiveOverrideProps<TextFieldProps>;
    permit?: PrimitiveOverrideProps<TextFieldProps>;
    po_number?: PrimitiveOverrideProps<TextFieldProps>;
    map?: PrimitiveOverrideProps<TextFieldProps>;
    photo?: PrimitiveOverrideProps<TextFieldProps>;
    p_confirm?: PrimitiveOverrideProps<TextFieldProps>;
    phone_number?: PrimitiveOverrideProps<TextFieldProps>;
    npat?: PrimitiveOverrideProps<SwitchFieldProps>;
} & EscapeHatchProps;
export declare type JobsCreateFormProps = React.PropsWithChildren<{
    overrides?: JobsCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: JobsCreateFormInputValues) => JobsCreateFormInputValues;
    onSuccess?: (fields: JobsCreateFormInputValues) => void;
    onError?: (fields: JobsCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: JobsCreateFormInputValues) => JobsCreateFormInputValues;
    onValidate?: JobsCreateFormValidationValues;
} & React.CSSProperties>;
export default function JobsCreateForm(props: JobsCreateFormProps): React.ReactElement;
