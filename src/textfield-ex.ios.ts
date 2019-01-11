import { TextFieldExBase, keyboardTypeProperty } from './textfield-ex.common';
import { keyboardTypeProperty as keyboardTypePropertyOriginal } from 'tns-core-modules/ui/editable-text-base';

export * from './textfield-ex.common';

export class TextFieldEx extends TextFieldExBase {
  private _delegate: any;

  createNativeView() {
    console.log('> > > > > > > > createNativeView');
    return super.createNativeView();
  }

  initNativeView() {
    console.log('> > > > > > > > initNativeView');

    super.initNativeView();
    console.log('> > > > > > > > > > > iOS :: _delegate?', this._delegate);

    this._delegate = TextFieldExDelegate.initWithOwnerAndDefaultImplementation(new WeakRef(this), this._delegate);
  }

  disposeNativeView() {
    console.log('> > > > > > > > disposeNativeView');
    super.disposeNativeView();
  }

  [keyboardTypeProperty.getDefault](): "datetime" | "phone" | "number" | "url" | "email" | "digits" | string {
    console.log('> > > > > > > > keyboardTypeProperty.getDefault');

    let keyboardType = this.nativeTextViewProtected.keyboardType;

    switch (keyboardType) {
      case UIKeyboardType.NumberPad:
        return "digits";

      default:
        return super[keyboardTypePropertyOriginal.getDefault]();
    }
  }

  [keyboardTypeProperty.setNative](value: "datetime" | "phone" | "number" | "url" | "email" | "digits" | string) {
    console.log('> > > > > > > > keyboardTypeProperty.setNative', value);
    let newKeyboardType: UIKeyboardType;

    switch (value) {
      case "digits":
        newKeyboardType = UIKeyboardType.NumberPad;
        break;

      default:
        super[keyboardTypePropertyOriginal.setNative](value);
        break;
    }

    if (newKeyboardType !== undefined) {
      this.nativeTextViewProtected.keyboardType = newKeyboardType;
    }
  }
}

@ObjCClass(UITextFieldDelegate)
class TextFieldExDelegate extends NSObject implements UITextFieldDelegate {
  public static initWithOwnerAndDefaultImplementation(owner: WeakRef<TextFieldEx>, defaultImplementation: UITextFieldDelegate): TextFieldExDelegate {
    const delegate = TextFieldExDelegate.new() as TextFieldExDelegate;
    delegate._owner = owner;
    delegate._defaultImplementation = defaultImplementation;
    return delegate;
  }

  private _owner: WeakRef<TextFieldEx>;
  private _defaultImplementation: UITextFieldDelegate;

  public textFieldShouldBeginEditing(textField: UITextField): boolean {
    return this._defaultImplementation.textFieldShouldBeginEditing(textField);
  }

  public textFieldDidBeginEditing(textField: UITextField) {
    this._defaultImplementation.textFieldDidBeginEditing(textField);
    textField.selectedTextRange = textField.textRangeFromPositionToPosition(textField.beginningOfDocument, textField.beginningOfDocument);
  }

  public textFieldDidEndEditing(textField: UITextField) {
    this._defaultImplementation.textFieldDidEndEditing(textField);
  }

  public textFieldShouldClear(textField: UITextField): boolean {
    return  this._defaultImplementation.textFieldShouldClear(textField);
  }

  public textFieldShouldReturn(textField: UITextField): boolean {
    return this._defaultImplementation.textFieldShouldReturn(textField);
  }

  public textFieldShouldChangeCharactersInRangeReplacementString(textField: UITextField, range: NSRange, replacementString: string): boolean {
    let shouldChange = true;

    if (this._defaultImplementation) {
      shouldChange = this._defaultImplementation.textFieldShouldChangeCharactersInRangeReplacementString(textField, range, replacementString);
    }

    console.log('>> replacementString', replacementString.length, replacementString);
    console.log('>> textField.keyboardType', textField.keyboardType);
    console.log('>> UIKeyboardType.NumberPad', UIKeyboardType.NumberPad);

    if (replacementString.length && textField.keyboardType === UIKeyboardType.NumberPad) {
      if (!/^[0-9]+$/g.test(replacementString)) {
        // log('replacementString', replacementString);
        shouldChange = false;
      }
    }

    // return false;
    return shouldChange;
  }
}
