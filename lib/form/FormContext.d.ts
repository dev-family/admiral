import React from 'react';
import { OptionType } from '../dataProvider/index.js';
import { Locale } from './interfaces.js';
import { FormRulesMap } from './rules.js';
export type FormErrorsType = Record<string, string[]>;
export type FieldValues = Record<string, any>;
/** A single field-change event carried on the {@link FieldChangeBus}. */
export type FieldChangeEvent = {
    path: string;
    value: unknown;
};
/**
 * Event bus for field changes. `notify` fires synchronously inside a field's
 * onChange (before the matching `setValues` is applied); `subscribe` registers a
 * listener for a full field path and returns an unsubscribe. Cascade selects
 * (U6) subscribe to their parents' paths; the field HOC (U5) notifies on change.
 */
export type FieldChangeBus = {
    notify: (event: FieldChangeEvent) => void;
    subscribe: (path: string, listener: (event: FieldChangeEvent) => void) => () => void;
};
export type FormContextValue<TFieldValues extends FieldValues> = {
    values: TFieldValues;
    options: Record<string, OptionType[]>;
    errors: Record<string, string[]>;
    setErrors: React.Dispatch<React.SetStateAction<FormErrorsType>>;
    setValues: React.Dispatch<React.SetStateAction<any>>;
    setOptions: React.Dispatch<React.SetStateAction<any>>;
    isSubmitting: boolean;
    isFetching: boolean;
    locale: Locale;
    /** Escape-hatch / future server-driven rules map (root scope, v1). */
    rules?: FormRulesMap;
    /** Full paths currently hidden by rules (stable empty Set when no rules). */
    hiddenFields?: Set<string>;
    /** Every full path the structural scan discovered. */
    scannedFields?: Set<string>;
    /** Path prefix of the current scope: '' at root, `name.idx` inside a row. */
    scopePath?: string;
    /** Cascade bus (stable identity); consumed by the field HOC and AjaxSelect. */
    fieldChange?: FieldChangeBus;
};
export type FormProviderProps<TFieldValues extends FieldValues> = {
    value: FormContextValue<TFieldValues>;
};
export declare function FormProvider<TFieldValues extends FieldValues>({ children, value, }: React.PropsWithChildren<FormProviderProps<TFieldValues>>): import("react/jsx-runtime").JSX.Element;
export declare function useForm<TFieldValues extends FieldValues>(): FormContextValue<TFieldValues>;
