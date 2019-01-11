import { TextFieldExBase } from './textfield-ex.common';
import { Property } from 'tns-core-modules/ui/core/properties';

export declare class TextFieldEx extends TextFieldExBase {
  // define your typings manually
  // or..
  // take the ios or android .d.ts files and copy/paste them here
}

export type KeyboardType = "datetime" | "phone" | "number" | "url" | "email" | "digits";

export const keyboardTypeProperty: Property<TextFieldEx, KeyboardType>;
