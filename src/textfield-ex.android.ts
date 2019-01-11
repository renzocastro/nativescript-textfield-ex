import { TextFieldExBase, keyboardTypeProperty } from './textfield-ex.common';
import { keyboardTypeProperty as keyboardTypePropertyOriginal } from 'tns-core-modules/ui/editable-text-base';

export * from './textfield-ex.common';
export class TextFieldEx extends TextFieldExBase {
  initNativeView() {
    super.initNativeView();
  }

  [keyboardTypeProperty.getDefault](): number {
    return super[keyboardTypePropertyOriginal.getDefault]();
  }

  [keyboardTypeProperty.setNative](value: 'datetime' | 'phone' | 'number' | 'url' | 'email' | 'digits' | number) {
    // https://github.com/NativeScript/NativeScript/blob/36f289b9a542307492ce32abd012c096fddc59e7/tns-core-modules/ui/editable-text-base/editable-text-base.android.ts#L250

    /*
      const InputType = android.text.InputType;

      default  = 540673
      datetime = 4      (InputType.TYPE_CLASS_DATETIME | InputType.TYPE_DATETIME_VARIATION_NORMAL)
      phone    = 3      (InputType.TYPE_CLASS_PHONE)
      number   = 12290  (InputType.TYPE_CLASS_NUMBER | InputType.TYPE_NUMBER_VARIATION_NORMAL | InputType.TYPE_NUMBER_FLAG_SIGNED | InputType.TYPE_NUMBER_FLAG_DECIMAL)
      url      = 17     (InputType.TYPE_CLASS_TEXT | InputType.TYPE_TEXT_VARIATION_URI)
      email    = 33     (InputType.TYPE_CLASS_TEXT | InputType.TYPE_TEXT_VARIATION_EMAIL_ADDRESS)

      digits   = 2      (RAW: Configuration.KEYBOARD_12KEY = 3)
    */
    switch (value) {
      case 'digits':
        super[keyboardTypePropertyOriginal.setNative]('number');

        const Configuration = android.content.res.Configuration;
        const DigitsKeyListener = android.text.method.DigitsKeyListener;
        const androidTextField = <android.widget.EditText>this.nativeViewProtected;

        androidTextField.setRawInputType(Configuration.KEYBOARD_12KEY);
        androidTextField.setKeyListener(DigitsKeyListener.getInstance('1234567890'));
        break;

      default:
        super[keyboardTypePropertyOriginal.setNative](value);
        break;
    }
  }
}
