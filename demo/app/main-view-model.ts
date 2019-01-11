import { Observable } from 'tns-core-modules/data/observable';
import { TextFieldEx } from 'nativescript-textfield-ex';

export class HelloWorldModel extends Observable {
  public message: string;
  private textfieldEx: TextFieldEx;

  constructor() {
    super();

    // this.textfieldEx = new TextfieldEx();
    // this.message = this.textfieldEx.message;
  }
}
