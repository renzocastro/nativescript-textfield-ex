import { Observable } from 'tns-core-modules/data/observable';
import { TextfieldEx } from 'nativescript-textfield-ex';

export class HelloWorldModel extends Observable {
  public message: string;
  private textfieldEx: TextfieldEx;

  constructor() {
    super();

    this.textfieldEx = new TextfieldEx();
    this.message = this.textfieldEx.message;
  }
}
