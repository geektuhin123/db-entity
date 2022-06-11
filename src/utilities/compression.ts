import * as LZUTF8 from 'lzutf8';
import logger from '../config/logger';

const compress = (data: string, outputEncoding: any): string => {
  try {
    logger.log('info', `compressing data`);
    const compressedData = LZUTF8.compress(data, outputEncoding);
    logger.log('info', `data compressed`);
    return compressedData;
  } catch (error) {
    throw new Error(`Compress failed, ${error}`);
  }
};
const decompress = (data: string, inputEncoding: any): string => {
  try {
    logger.log('info', `decompressing data`);
    const decompressedDataString = LZUTF8.decompress(data, inputEncoding);
    logger.log('info', `decompressed data`);
    return decompressedDataString;
  } catch (error) {
    throw new Error(`decompression failed, ${error}`);
  }
};

export { compress, decompress };
