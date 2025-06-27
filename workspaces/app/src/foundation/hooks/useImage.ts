import { useAsync } from 'react-use';

import { getImageUrl } from '../../lib/image/getImageUrl';

// 最適な画像フォーマットを取得
const getOptimalImageFormat = (): 'avif' | 'webp' | 'jpg' => {
  // AVIF対応チェック
  const canvas = document.createElement('canvas');
  canvas.width = 1;
  canvas.height = 1;
  const supportsAVIF = canvas.toDataURL('image/avif').indexOf('data:image/avif') === 0;
  
  if (supportsAVIF) {
    return 'avif';
  }
  
  // WebP対応チェック
  const supportsWebP = canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
  
  if (supportsWebP) {
    return 'webp';
  }
  
  return 'jpg';
};

export const useImage = ({ height, imageId, width }: { height: number; imageId: string; width: number }) => {
  const { value } = useAsync(async () => {
    const dpr = window.devicePixelRatio;

    const img = new Image();
    img.src = getImageUrl({
      format: getOptimalImageFormat(),
      height: height * dpr,
      imageId,
      width: width * dpr,
    });

    await img.decode();

    const canvas = document.createElement('canvas');
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    const ctx = canvas.getContext('2d')!;

    // Draw image to canvas as object-fit: cover
    const imgAspect = img.naturalWidth / img.naturalHeight;
    const targetAspect = width / height;

    if (imgAspect > targetAspect) {
      const srcW = img.naturalHeight * targetAspect;
      const srcH = img.naturalHeight;
      const srcX = (img.naturalWidth - srcW) / 2;
      const srcY = 0;
      ctx.drawImage(img, srcX, srcY, srcW, srcH, 0, 0, width * dpr, height * dpr);
    } else {
      const srcW = img.naturalWidth;
      const srcH = img.naturalWidth / targetAspect;
      const srcX = 0;
      const srcY = (img.naturalHeight - srcH) / 2;
      ctx.drawImage(img, srcX, srcY, srcW, srcH, 0, 0, width * dpr, height * dpr);
    }

    return canvas.toDataURL('image/png');
  }, [height, imageId, width]);

  return value;
};
