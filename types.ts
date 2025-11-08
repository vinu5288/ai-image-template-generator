
export interface Template {
  id: string;
  name: string;
  prompt: string;
  previewImage: string;
}

export interface UploadedImage {
  base64: string;
  mimeType: string;
  name: string;
}
