import { CSSType, makeParser, makeValidator, Property } from 'tns-core-modules/ui/core/view/view';
import { TextField } from 'tns-core-modules/ui/text-field/text-field';
import { KeyboardType } from '.';

// import { TextFieldEx as TextFieldExDefinition } from '.';

export * from 'tns-core-modules/ui/text-field';

@CSSType("TextFieldEx")
export abstract class TextFieldExBase extends TextField {
  // public keyboardType: KeyboardType;
  get nativeTextViewProtected() {
    return this.nativeView;
  }
}

const keyboardTypeConverter = makeParser<KeyboardType>(makeValidator<KeyboardType>("datetime", "phone", "number", "url", "email", "digits"));

export const keyboardTypeProperty = new Property<TextFieldExBase, KeyboardType>({ name: "keyboardType", valueConverter: keyboardTypeConverter });
keyboardTypeProperty.register(TextFieldExBase);
