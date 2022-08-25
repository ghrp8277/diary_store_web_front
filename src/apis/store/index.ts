import axios, { AxiosPromise } from 'axios';
import { postRequest } from '@/services/axios/axios.service';
import { FileCategoryDto } from '@/types/fileCategory';
// import { Login, Response, User } from "@/types/auth"

interface Axois {
  fetchEmojiUpload(username: string, formData: FormData): AxiosPromise<any>;
}

export default (url: string) => {
  const storeApiModule: Axois = {
    // 이모티콘 파일 업로드
    fetchEmojiUpload: async (username: string, formData: FormData) => {
      const response = await axios({
        method: 'post',
        url: `${url}/emoji/upload/${username}`,
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response;
    },
  };

  return {
    storeApiModule,
  };
};
