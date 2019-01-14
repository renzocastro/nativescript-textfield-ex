import { TextFieldExBase, keyboardTypeProperty } from './textfield-ex.common';
import { keyboardTypeProperty as keyboardTypePropertyOriginal } from 'tns-core-modules/ui/editable-text-base';

export * from './textfield-ex.common';

export class TextFieldEx extends TextFieldExBase {
  private _delegate: any;

  initNativeView() {
    super.initNativeView();
    this._delegate = TextFieldExDelegate.initWithOwnerAndDefaultImplementation(new WeakRef(this), this._delegate);
  }

  [keyboardTypeProperty.getDefault](): 'datetime' | 'phone' | 'number' | 'url' | 'email' | 'digits' | string {
    let keyboardType = this.nativeTextViewProtected.keyboardType;

    switch (keyboardType) {
      case UIKeyboardType.NumberPad:
        return 'digits';

      default:
        return super[keyboardTypePropertyOriginal.getDefault]();
    }
  }

  [keyboardTypeProperty.setNative](value: 'datetime' | 'phone' | 'number' | 'url' | 'email' | 'digits' | string) {
    switch (value) {
      case 'digits':
        this.nativeTextViewProtected.keyboardType = UIKeyboardType.NumberPad;
        break;

      default:
        super[keyboardTypePropertyOriginal.setNative](value);
    }
  }
}

@ObjCClass(UITextFieldDelegate)
class TextFieldExDelegate extends NSObject implements UITextFieldDelegate {
  private _owner: WeakRef<TextFieldEx>;
  private _defaultImplementation: UITextFieldDelegate;

  public static initWithOwnerAndDefaultImplementation(owner: WeakRef<TextFieldEx>, defaultImplementation: UITextFieldDelegate): TextFieldExDelegate {
    const delegate = TextFieldExDelegate.new() as TextFieldExDelegate;
    delegate._owner = owner;
    delegate._defaultImplementation = defaultImplementation;
    return delegate;
  }

  public textFieldShouldBeginEditing(textField: UITextField): boolean {
    return this._defaultImplementation.textFieldShouldBeginEditing(textField);
  }

  public textFieldDidBeginEditing(textField: UITextField) {
    this._defaultImplementation.textFieldDidBeginEditing(textField);
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

    if (replacementString.length && textField.keyboardType === UIKeyboardType.NumberPad) {
      if (!/^[0-9]+$/g.test(replacementString)) {
        shouldChange = false;
      }
    }

    return shouldChange;
  }
}
