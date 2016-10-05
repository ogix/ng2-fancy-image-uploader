import {Component, OnInit, ViewChild, ElementRef, Renderer, Input, Output, EventEmitter, ChangeDetectorRef, forwardRef} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {FancyImageUploaderOptions, ImageResult, ResizeOptions} from './interfaces';
import {createImage, resizeImage} from './utils';
import {FileUploader} from './file-uploader';
import {UploadedFile} from './uploaded-file';
import 'rxjs/add/operator/filter';

export enum Status {
  NotSelected,
  Selected,
  Uploading,
  Loading,
  Error
}

@Component({
  selector: 'fancy-image-uploader',
  template: require('./fancy-image-uploader.component.html'),
  styles: [require('./fancy-image-uploader.component.css')],
  host: {
    '[style.width]': 'thumbnailWidth + "px"',
    '[style.height]': 'thumbnailHeight + "px"',
    '(drop)': 'drop($event)',
    '(dragenter)': 'dragenter($event)',
    '(dragover)': 'dragover($event)',
    '(dragleave)': 'dragleave($event)',
  },
  providers: [
    { 
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FancyImageUploaderComponent),
      multi: true
    }
  ]
})
export class FancyImageUploaderComponent implements OnInit, ControlValueAccessor {
  status = Status;
  statusValue: Status = Status.NotSelected;

  thumbnailWidth: number = 150;
  thumbnailHeight: number = 150;
  _imageThumbnail: any;
  _errorMessage: string;
  progress: number;
  propagateChange = (_: any) => {};

  @ViewChild('imageElement') imageElement: ElementRef;
  @ViewChild('fileInput') fileInputElement: ElementRef;
  @ViewChild('dragOverlay') dragOverlayElement: ElementRef;
  @Input() options: FancyImageUploaderOptions;
  @Output() onUpload: EventEmitter<UploadedFile> = new EventEmitter<UploadedFile>();

  constructor(
    private renderer: Renderer,
    private uploader: FileUploader,
    private changeDetector: ChangeDetectorRef) { }

  get imageThumbnail() {
    return this._imageThumbnail;
  }

  set imageThumbnail(value) {
    this._imageThumbnail = value;
    this.propagateChange(this._imageThumbnail);

    if (value !== undefined) {
      this.statusValue = Status.Selected
    } else {
      this.statusValue = Status.NotSelected;
    }
  }

  get errorMessage() {
    return this._errorMessage;
  }

  set errorMessage(value) {
    this._errorMessage = value;

    if (value) {
      this.statusValue = Status.Error;
    } else {
      this.statusValue = Status.NotSelected;
    }
  }

  writeValue(value: any) {
    if (value) {
      this.loadAndResize(value);
    } else {
      this._imageThumbnail = undefined;
      this.statusValue = Status.NotSelected;
    }
  }

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  registerOnTouched() {}

  ngOnInit() {
    if (this.options) {
      if (this.options.thumbnailWidth) {
        this.thumbnailWidth = this.options.thumbnailWidth;
      }
      if (this.options.thumbnailHeight) {
        this.thumbnailHeight = this.options.thumbnailHeight;
      }
      if (this.options.resizeOnLoad === undefined) {
        this.options.resizeOnLoad = true;
      }
    }
  }

  loadAndResize(url: string) {
    this.statusValue = Status.Loading;

    this.uploader.getFile(url, this.options).subscribe(file => {
      if (this.options.resizeOnLoad) {
        // thumbnail
        let result: ImageResult = {
          file: file,
          url: URL.createObjectURL(file)
        };

        this.resize(result).then(r => {
          this._imageThumbnail = r.resized.dataURL;
          this.statusValue = Status.Selected;
        });
      } else {
        let result: ImageResult = {
          file: null,
          url: null
        };

        this.fileToDataURL(file, result).then(r => {
          this._imageThumbnail = r.dataURL;
          this.statusValue = Status.Selected;
        });
      }
    }, error => {
      this.errorMessage = error || 'Error while getting an image';
    });
  }

  onImageClicked() {
    this.renderer.invokeElementMethod(this.fileInputElement.nativeElement, 'click');
  }

  onFileChanged() {
    let file = this.fileInputElement.nativeElement.files[0];
    if (!file) return;

    this.validateAndUpload(file);
  }

  validateAndUpload(file: File) {
    this.propagateChange(null);

    if (this.options && this.options.allowedImageTypes) {
      if (!this.options.allowedImageTypes.some(allowedType => file.type === allowedType)) {
        this.errorMessage = 'Only these image types are allowed: ' + this.options.allowedImageTypes.join(', ');
        return;
      }
    }

    if (this.options && this.options.maxImageSize) {
      if (file.size > this.options.maxImageSize * 1024 * 1024) {
        this.errorMessage = `Image must not be larger than ${this.options.maxImageSize} MB`;
        return;
      }
    }

    this.progress = 0;
    this.statusValue = Status.Uploading;
    let id = this.uploader.uploadFile(file, this.options);

    // file progress
    let sub = this.uploader.fileProgress$.filter(file => file.id === id).subscribe(file => {
      this.progress = file.progress;

      if (file.error) {
        if (file.status || file.statusText) {
          this.errorMessage = `${file.status}: ${file.statusText}`;
        } else {
          this.errorMessage = 'Error while uploading'
        }
        // on some upload errors change detection does not work, so we are forcing manually
        this.changeDetector.detectChanges();
      }

      if (file.done) {
        // notify that value was changed only when image was uploaded and no error
        if (!file.error) {
          this.propagateChange(this._imageThumbnail);
          this.statusValue = Status.Selected;
        }
        this.onUpload.emit(file);
        sub.unsubscribe();
      }
    });

    // thumbnail
    let result: ImageResult = {
      file: file,
      url: URL.createObjectURL(file)
    };

    this.resize(result).then(r => {
      this._imageThumbnail = r.resized.dataURL;
    });
  }

  removeImage() {
    this.fileInputElement.nativeElement.value = null;
    this.imageThumbnail = undefined;
  }

  dismissError() {
    this.errorMessage = undefined;
    this.removeImage();
  }

  drop(e) {
    e.preventDefault();
    e.stopPropagation();

    if (!e.dataTransfer || !e.dataTransfer.files.length) {
      return;
    }
    
    this.validateAndUpload(e.dataTransfer.files[0]);    
    this.updateDragOverlayStyles(false);
  }

  dragenter(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  dragover(e) {
    e.preventDefault();
    e.stopPropagation();
    this.updateDragOverlayStyles(true);
  }

  dragleave(e) {
    e.preventDefault();
    e.stopPropagation();
    this.updateDragOverlayStyles(false);
  }

  private updateDragOverlayStyles(isDragOver: boolean) {
    // TODO: find a way that does not trigger dragleave when displaying overlay
    // if (isDragOver) {
    //  this.renderer.setElementStyle(this.dragOverlayElement.nativeElement, 'display', 'block');
    // } else {
    //  this.renderer.setElementStyle(this.dragOverlayElement.nativeElement, 'display', 'none');
    // }
  }

  private resize(result: ImageResult): Promise<ImageResult> {
    let resizeOptions: ResizeOptions = {
      resizeHeight: this.thumbnailHeight,
      resizeWidth: this.thumbnailWidth,
      resizeType: result.file.type
    };

    return new Promise((resolve) => {
      createImage(result.url, image => {
        let dataUrl = resizeImage(image, resizeOptions);
        result.resized = {
          dataURL: dataUrl,
          type: this.getType(dataUrl)
        };
        resolve(result);
      });
    });
  }

  private getType(dataUrl: string) {
    return dataUrl.match(/:(.+\/.+;)/)[1];
  }

  private fileToDataURL(file: File, result: ImageResult): Promise<ImageResult> {
    return new Promise((resolve) => {
      let reader = new FileReader();
      reader.onload = function (e) {
        result.dataURL = reader.result;
        resolve(result);
      };
      reader.readAsDataURL(file);
    });
  }
}