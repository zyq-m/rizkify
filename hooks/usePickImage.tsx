import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';

export type ImageT = {
  name?: string | null;
  uri?: string;
  type?: string;
};

export default function usePickImage() {
  const [images, setImages] = useState<ImageT[]>([]);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 3],
      quality: 1,
      selectionLimit: 5,
      allowsMultipleSelection: true,
    });

    if (!result.canceled) {
      setImages(
        result.assets.map((d) => ({
          name: d.fileName ?? d.uri.split('/').pop(),
          uri: d.uri,
          type: d.mimeType,
        })),
      );
    }
  };

  const clear = () => {
    setImages([]);
  };

  return { images, pickImage, clear };
}
