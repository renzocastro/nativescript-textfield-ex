var TextfieldEx = require("nativescript-textfield-ex").TextfieldEx;
var textfieldEx = new TextfieldEx();

describe("greet function", function() {
    it("exists", function() {
        expect(textfieldEx.greet).toBeDefined();
    });

    it("returns a string", function() {
        expect(textfieldEx.greet()).toEqual("Hello, NS");
    });
});