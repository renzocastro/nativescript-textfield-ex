import { TextFieldExBase, keyboardTypeProperty } from './textfield-ex.common';

export * from './textfield-ex.common';
export class TextFieldEx extends TextFieldExBase {
  // public initNativeView(): void {
  //   super.initNativeView();
  // }

  // public disposeNativeView(): void {
  //   super.disposeNativeView();
  // }

  // public resetNativeView(): void {
  //   super.resetNativeView();
  // }

  // [keyboardTypeProperty.getDefault](): number {
  //   return this.nativeTextViewProtected.getInputType();
  // }

  [keyboardTypeProperty.setNative](value: "datetime" | "phone" | "number" | "url" | "email" | "digits" | number) {
    let newInputType;

    switch (value) {
      case "digits":
          newInputType = android.text.InputType.TYPE_CLASS_NUMBER | android.text.InputType.TYPE_NUMBER_VARIATION_NORMAL;
          break;

      default:
        newInputType = value;
        break;
    }

    super[keyboardTypeProperty.setNative](newInputType);
  }
}
