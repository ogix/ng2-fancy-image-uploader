# Fancy Image Uploader [![npm version](https://badge.fury.io/js/ng2-fancy-image-uploader.svg)](https://badge.fury.io/js/ng2-fancy-image-uploader) ![Dependencies](https://david-dm.org/ogix/ng2-fancy-image-uploader.svg)

Angular2 component that uploads selected or dropped image asynchronously with preview.

### Demo
See demo here: [demo](https://ogix.github.io/fancy-image-uploader-demo)

### Install
```
npm install ng2-fancy-image-uploader --save
```
### Usage

Add image uploader module to your module's ```imports```

```js
import { NgModule } from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';
import { AppComponent } from './app';

import { FancyImageUploaderModule } from 'ng2-fancy-image-uploader';

@NgModule({
  imports: [BrowserModule, FancyImageUploaderModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

Use it in your component

```js
import { Component } from '@angular/core';
import { FancyImageUploaderOptions, UploadedFile } from 'ng2-fancy-image-uploader';

@Component({
  selector: 'example-app',
  template: '<fancy-image-uploader [options]="options" (onUpload)="onUpload($event)"></fancy-image-uploader>'
})
export class AppComponent {
  options: FancyImageUploaderOptions = {
      thumbnailHeight: 150,
      thumbnailWidth: 150,
      uploadUrl: 'http://some-server.com/upload',
      allowedImageTypes: ['image/png', 'image/jpeg'],
      maxImageSize: 3
  };
  
  onUpload(file: UploadedFile) {
    console.log(file.response);
  }
}

```

### License

[MIT](https://tldrlegal.com/license/mit-license) © [Olegas Gončarovas](https://github.com/ogix)
