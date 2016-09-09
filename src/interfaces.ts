export interface FileUploaderOptions {
  uploadUrl: string;
  httpMethod?: string;
  withCredentials?: boolean;
  customHeaders?: any;
  fieldName?: string;
  authToken?: string;
  authTokenPrefix?: string;
}

export interface FancyImageUploaderOptions extends FileUploaderOptions {
  thumbnailHeight?: number;
  thumbnailWidth?: number;
  allowedImageTypes?: string[];
  maxImageSize?: number;
}

export interface ImageResult {
  file: File;
  url: string;
  dataURL?: string;
  resized?: {
    dataURL: string;
    type: string;
  }
}

export interface ResizeOptions {
  resizeHeight?: number;
  resizeWidth?: number;
  resizeQuality?: number;
  resizeType?: string;
}
