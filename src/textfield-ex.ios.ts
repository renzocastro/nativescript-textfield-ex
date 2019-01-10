import { Common, TextFieldExBase } from './textfield-ex.common';
import { TextField } from 'tns-core-modules/ui/text-field';

export * from './textfield-ex.common';

export class TextFieldEx extends TextFieldExBase {
  private _delegate: any;

  public initNativeView() {
    super.initNativeView();
    this._delegate = TextFieldExDelegate.initWithOwnerAndDefaultImplementation(new WeakMap(this), this._delegate);
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