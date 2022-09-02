import axios, { AxiosPromise } from 'axios';
import { getRequest } from '@/services/axios/axios.service';
import { EmojiFileInfo } from '@/types/emojiFilesInfo';
import { ProposalInfo } from '@/types/proposal';

interface Axois {
  fetchEmojiUpload(username: string, formData: FormData): AxiosPromise<any>;
  fetchEmojiFilesInfo(username: string): AxiosPromise<EmojiFileInfo[]>;
  fetchProposalInfo(username: string, id: number): AxiosPromise<ProposalInfo>;
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
    // 승인 정보들을 가져온다.
    fetchEmojiFilesInfo: async (username: string) => {
      const response = await getRequest<EmojiFileInfo[]>(
        `${url}/${username}/emoji/products/confirm`,
      );

      return response;
    },
    // 타겟 승인 정보를 가져온다.
    fetchProposalInfo: async (username: string, id: number) => {
      const response = await getRequest<ProposalInfo>(
        `${url}/${username}/emoji/products/${id}/confirm`,
      );

      return response;
    },
  };

  return {
    storeApiModule,
  };
};
