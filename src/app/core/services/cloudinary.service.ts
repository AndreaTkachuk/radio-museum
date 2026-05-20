import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CloudinaryService {

  private cloudName = 'diihd6ncv';

  private uploadPreset = 'radio_unsigned';

  async uploadImage(file: File): Promise<string> {

    const formData = new FormData();

    formData.append('file', file);

    formData.append(
      'upload_preset',
      this.uploadPreset
    );

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${this.cloudName}/image/upload`,
      {
        method: 'POST',
        body: formData
      }
    );

    if (!response.ok) {
      throw new Error('Upload failed');
    }

    const data = await response.json();

    return data.secure_url;
  }
}