import {NgModule} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser';
import {FancyImageUploaderComponent} from './fancy-image-uploader.component';
import {FileUploader} from './file-uploader';

@NgModule({
  imports: [BrowserModule],
  providers: [FileUploader],
  declarations: [FancyImageUploaderComponent],
  exports     : [FancyImageUploaderComponent]
})
export class FancyImageUploaderModule {}
