import axios, { AxiosPromise } from 'axios';
import { getRequest } from '@/services/axios/axios.service';
import { EmojiFileInfo } from '@/types/emojiFilesInfo';

interface Axois {
  fetchEmojiUpload(username: string, formData: FormData): AxiosPromise<any>;
  fetchEmojiFilesInfo(username: string): AxiosPromise<EmojiFileInfo[]>;
}

export default (url: string) => {
  const storeApiModule: Axois = {
    // 이모티콘 파일 업로드
    fetchEmojiUpload: async (username: string, formData: FormData) => {
      const response = await axios({
        method: 'post',
        url: `${url}/${username}/emoji/upload`,
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response;
    },
    // 이미지 파일 (승인 정보) 가져온다.
    fetchEmojiFilesInfo: async (username: string) => {
      const response = await getRequest<EmojiFileInfo[]>(
        `${url}/${username}/emoji/info`,
      );

      return response;
    },
  };

  return {
    storeApiModule,
  };
};
