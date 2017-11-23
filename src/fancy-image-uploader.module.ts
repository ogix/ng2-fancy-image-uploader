import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common';
import {FancyImageUploaderComponent} from './fancy-image-uploader.component';
import {FileUploader} from './file-uploader';

@NgModule({
  imports: [CommonModule],
  providers: [FileUploader],
  declarations: [FancyImageUploaderComponent],
  exports     : [FancyImageUploaderComponent]
})
export class FancyImageUploaderModule {}
