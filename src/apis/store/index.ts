import axios, { AxiosPromise } from 'axios';
import { getRequest } from '@/services/axios/axios.service';
import { ProposalsInfo } from '@/types/proposals';
import { ProposalInfo } from '@/types/proposal';
import router from '@/router';
import { Notice } from '@/types/notice';

interface Axois {
  fetchEmojiUpload(username: string, formData: FormData): Promise<void>;
  fetchProposalsInfo(username: string): AxiosPromise<ProposalsInfo[]>;
  fetchProposalInfo(username: string, id: number): AxiosPromise<ProposalInfo>;
  fetchStudioNoticesInfo(username: string): AxiosPromise<Notice[]>;
  fetchStudioNoticeInfo(
    username: string,
    id: number,
    file_name: string,
  ): AxiosPromise<any>;
}

export default (url: string) => {
  const storeApiModule: Axois = {
    // 이모티콘 파일 업로드
    fetchEmojiUpload: async (username: string, formData: FormData) => {
      const { data, status } = await axios({
        method: 'post',
        url: `${url}/${username}/emoji/upload`,
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (status == 201) router.push({ name: 'success', query: data });
    },
    // 승인 정보들을 가져온다.
    fetchProposalsInfo: async (username: string) => {
      const response = await getRequest<ProposalsInfo[]>(
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
    /**
     * 공지사항 전체 정보를 가져온다.
     * @param { string } username - username of param.
     * @returns { string }
     */
    fetchStudioNoticesInfo: async (username: string) => {
      const response = await getRequest<Notice[]>(
        `${url}/${username}/studio/notices`,
      );

      return response;
    },
    /**
     * 특정 공지사항 내용을 가져온다.
     * @param { string } username - username of param.
     * @returns { string }
     */
    fetchStudioNoticeInfo: async (
      username: string,
      id: number,
      file_name: string,
    ) => {
      const params = {
        file_name,
      };

      const response = await getRequest<any>(
        `${url}/${username}/studio/notices/${id}`,
        { params },
      );

      return response;
    },
  };

  return {
    storeApiModule,
  };
};
