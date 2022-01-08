import React from 'react';
import { AudioUrlInput, FileInput, ImageInput, MediaUrlInput } from '../../../shared/inputs';
import { Example, useSharedComponentsLibrary } from '../SharedComponentsLibrary';
import { useFormState } from '../../../hooks';

export function FileExample() {
  const { globalProps } = useSharedComponentsLibrary();
  const { bind } = useFormState({ filePath: '', image: '', galleryImage: '', galleryAudio: '' });

  return (
    <>
      <Example title="File Input">
        <FileInput label="Save As" save={true} {...globalProps} {...bind.filePath} />
      </Example>

      <Example title="Image Input">
        <ImageInput label="Select Image" maxFileSize={3000000} {...globalProps} {...bind.image} />
      </Example>

      <Example title="Media Gallery">
        <MediaUrlInput label="Image" {...globalProps} {...bind.galleryImage} />
        <AudioUrlInput label="Audio" {...globalProps} {...bind.galleryAudio} />
      </Example>
    </>
  );
}
