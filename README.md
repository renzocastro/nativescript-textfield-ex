# NativeScript TextField Extended

[![NPM version][npm-image]][npm-url]
[![Downloads][downloads-image]][npm-url]
[![Twitter Follow][twitter-image]][twitter-url]

[build-status]:https://travis-ci.org/renzocastro/nativescript-textfield-ex.svg?branch=master
[build-url]:https://travis-ci.org/renzocastro/nativescript-textfield-ex
[npm-image]:http://img.shields.io/npm/v/nativescript-textfield-ex.svg
[npm-url]:https://npmjs.org/package/nativescript-textfield-ex
[downloads-image]:http://img.shields.io/npm/dm/nativescript-textfield-ex.svg
[twitter-image]:https://img.shields.io/twitter/follow/renzocastrope.svg?style=social&label=Follow%20me
[twitter-url]:https://twitter.com/renzocastrope

TextField Extended for allow only numbers (1234567890).

Now you can use a new value for keyboardType property: digits.

```xml
<TextFieldEx keyboardType="digits"></TextFieldEx>
```

## Installation

```js
tns plugin add nativescript-textfield-ex
```

## Demo app (Core)

Check out the [demo](/demo) folder.


## Usage

```xml
<Page xmlns="http://schemas.nativescript.org/tns.xsd" loaded="pageLoaded" class="page"
  xmlns:ui="nativescript-textfield-ex">

  <StackLayout class="p-20">

    <!-- Plugin -->
    <ui:TextFieldEx hint="0000" class="tf-ex" keyboardType="digits"></ui:TextFieldEx>

    <!-- Original -->
    <TextField hint="0000" class="tf-ex" keyboardType="number"></TextField>

  </StackLayout>
</Page>
```

## License

Apache License Version 2.0, January 2004
