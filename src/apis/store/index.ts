import { ProposalsInfo } from '@/types/proposals';
import { ProposalInfo } from '@/types/proposal';
import router from '@/router';
import { Notice } from '@/types/notice';
import { instance } from '@/apis';

// 이모티콘 파일 업로드
export async function fetchEmojiUpload(
  username: string,
  formData: FormData,
): Promise<void> {
  const { data, status } = await instance({
    method: 'post',
    url: `store/${username}/emoji/upload`,
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  if (status == 201) router.push({ name: 'success', query: data });
}

// 승인 정보들을 가져온다.
export async function fetchProposalsInfo(
  username: string,
): Promise<ProposalsInfo[]> {
  const { data } = await instance.get(
    `store/${username}/emoji/products/confirm`,
  );
  return data;
}

// 타겟 승인 정보를 가져온다.
export async function fetchProposalInfo(
  username: string,
  id: number,
): Promise<ProposalInfo> {
  const { data } = await instance.get(
    `store/${username}/emoji/products/${id}/confirm`,
  );

  return data;
}

// 공지사항 전체 정보를 가져온다.
export async function fetchStudioNoticesInfo(
  username: string,
): Promise<Notice[]> {
  const { data } = await instance.get(`store/${username}/studio/notices`);

  return data;
}

// 특정 공지사항 내용을 가져온다.
export async function fetchStudioNoticeInfo(
  username: string,
  id: number,
): Promise<any> {
  const { data } = await instance.get(`store/${username}/studio/notices/${id}`);

  return data;
}
