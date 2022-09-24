import { Proposal } from '@/types/proposal';
import router from '@/router';
import { StudioNotice } from '@/types/studioNotice';
import { instance } from '@/apis';

// 이모티콘 파일 업로드
export async function fetchEmojiUpload(
  username: string,
  formData: FormData,
): Promise<void> {
  const { data, status } = await instance.store({
    method: 'post',
    url: `${username}/emoji/upload`,
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
  page: number,
): Promise<{ proposals: Proposal[]; totalPage: number }> {
  console.log(page, username);
  const { data } = await instance.store.get(
    `${username}/emoji/${page}/products/confirm`,
  );

  return data;
}

// 공지사항 전체 정보를 가져온다.
export async function fetchStudioNoticesInfo(
  page: number,
): Promise<{ notices: StudioNotice[]; totalPage: number }> {
  const { data } = await instance.store.get(`studio/${page}/notices`);

  return data;
}

// 특정 공지사항 내용을 가져온다.
export async function fetchStudioNoticeInfo(id: number): Promise<string> {
  const { data } = await instance.store.get(`studio/notices/${id}`);

  return data;
}
