import { useRef } from 'react';
import { useAsync } from 'react-use';
import styled from 'styled-components';

import { decrypt } from '@wsh-2024/image-encrypt/src/decrypt';

import { getImageUrl } from '../../../lib/image/getImageUrl';

// 最適な画像フォーマットを取得（Viewer用）
const getOptimalViewerFormat = (): 'jxl' | 'avif' | 'webp' | 'jpg' => {
  const canvas = document.createElement('canvas');
  canvas.width = 1;
  canvas.height = 1;
  
  // JPEG-XL対応チェック
  const supportsJXL = canvas.toDataURL('image/jxl').indexOf('data:image/jxl') === 0;
  if (supportsJXL) {
    return 'jxl';
  }
  
  // AVIF対応チェック
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

const _Canvas = styled.canvas`
  height: 100%;
  width: auto;
  flex-grow: 0;
  flex-shrink: 0;
`;

type Props = {
  pageImageId: string;
};

export const ComicViewerPage = ({ pageImageId }: Props) => {
  const ref = useRef<HTMLCanvasElement>(null);

  useAsync(async () => {
    const image = new Image();
    image.src = getImageUrl({
      format: getOptimalViewerFormat(),
      imageId: pageImageId,
    });
    await image.decode();

    const canvas = ref.current!;
    canvas.width = image.naturalWidth;
    canvas.height = image.naturalHeight;
    const ctx = canvas.getContext('2d')!;

    decrypt({
      exportCanvasContext: ctx,
      sourceImage: image,
      sourceImageInfo: {
        height: image.naturalHeight,
        width: image.naturalWidth,
      },
    });

    canvas.setAttribute('role', 'img');
  }, [pageImageId]);

  return <_Canvas ref={ref} />;
};
