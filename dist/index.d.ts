import { FormKitClasses } from '@formkit/core';
import { FormKitNode } from '@formkit/core';
import { PluginOutput } from 'windicss/types/interfaces';

/**
 * A function that returns a class list string
 * @internal
 */
declare type ClassFunction = (node: FormKitNode, sectionKey: string, sectionClassList: FormKitClasses | string | Record<string, boolean>) => string;

/**
 * An object of ClassFunctions
 * @internal
 */
declare interface FormKitClassFunctions {
    [index: string]: ClassFunction;
}

/**
 * The FormKit plugin for Tailwind
 * @public
 */
declare const formKitVariants: PluginOutput;
export default formKitVariants;

/**
 * A function to generate FormKit class functions from a javascript object
 * @param classes - An object of input types with nested objects of sectionKeys and class lists
 * @returns FormKitClassFunctions
 * @public
 */
export declare function generateClasses(classes: Record<string, Record<string, string>>): FormKitClassFunctions;

export { }
