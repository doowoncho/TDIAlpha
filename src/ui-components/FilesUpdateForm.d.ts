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
export declare type FilesUpdateFormInputValues = {
    photo_name?: string;
    photo_file?: string;
    permit_name?: string;
    permit_file?: string;
    permit_confirmation_name?: string;
    permit_confirmation_file?: string;
    map_drawing_name?: string;
    map_file?: string;
};
export declare type FilesUpdateFormValidationValues = {
    photo_name?: ValidationFunction<string>;
    photo_file?: ValidationFunction<string>;
    permit_name?: ValidationFunction<string>;
    permit_file?: ValidationFunction<string>;
    permit_confirmation_name?: ValidationFunction<string>;
    permit_confirmation_file?: ValidationFunction<string>;
    map_drawing_name?: ValidationFunction<string>;
    map_file?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type FilesUpdateFormOverridesProps = {
    FilesUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    photo_name?: PrimitiveOverrideProps<TextFieldProps>;
    photo_file?: PrimitiveOverrideProps<TextFieldProps>;
    permit_name?: PrimitiveOverrideProps<TextFieldProps>;
    permit_file?: PrimitiveOverrideProps<TextFieldProps>;
    permit_confirmation_name?: PrimitiveOverrideProps<TextFieldProps>;
    permit_confirmation_file?: PrimitiveOverrideProps<TextFieldProps>;
    map_drawing_name?: PrimitiveOverrideProps<TextFieldProps>;
    map_file?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type FilesUpdateFormProps = React.PropsWithChildren<{
    overrides?: FilesUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    files?: any;
    onSubmit?: (fields: FilesUpdateFormInputValues) => FilesUpdateFormInputValues;
    onSuccess?: (fields: FilesUpdateFormInputValues) => void;
    onError?: (fields: FilesUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: FilesUpdateFormInputValues) => FilesUpdateFormInputValues;
    onValidate?: FilesUpdateFormValidationValues;
} & React.CSSProperties>;
export default function FilesUpdateForm(props: FilesUpdateFormProps): React.ReactElement;
