import * as observable from 'tns-core-modules/data/observable';
import * as pages from 'tns-core-modules/ui/page';
import {HelloWorldModel} from './main-view-model';

// import { TextfieldEx } from 'nativescript-textfield-ex';
// import { registerElement } from "nativescript-angular";

// registerElement('TextFieldEx', () => TextfieldEx);

// Event handler for Page 'loaded' event attached in main-page.xml
export function pageLoaded(args: observable.EventData) {
    // Get the event sender
    let page = <pages.Page>args.object;
    page.bindingContext = new HelloWorldModel();
}
