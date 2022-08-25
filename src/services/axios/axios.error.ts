// import router from '@/router';
// import { AxiosError } from 'axios';
// import { ref } from '@vue/composition-api';

// export default class AxiosServiceError extends Error {
//   error: AxiosError;
//   status: number;
//   payload?: any;
//   MAXCOUNT = 10; // error max count

//   constructor(error: AxiosError, message?: string) {
//     super(message);
//     this.name = 'AxiosServiceError';

//     this.error = error;
//     const status = error.response?.status;
//     if (status) this.status = status;
//     else this.status = 0;
//   }

//   get MaxCount() {
//     return this.MAXCOUNT;
//   }

//   set MaxCount(MAXCOUNT: number) {
//     this.MAXCOUNT = MAXCOUNT;
//   }

//   handleException(count?: number) {
//     if (this.status >= 400) {
//       this.payload = this.requestError();
//     } else if (this.status >= 500) {
//       this.serverError(count);
//     }
//     return {
//       count: 1,
//       payload: this.payload,
//     };
//   }
//   // 4xx error
//   requestError() {
//     switch (this.status) {
//       case 401:
//         if (this.error.response?.config.url?.includes('login')) {
//           return this.loginError();
//         }
//         break;
//       case 403:
//         if (this.error.response?.config.url?.includes('weather')) {
//           return this.status;
//         }
//         break;
//       case 404:
//         console.log('404 Error!!!');
//         break;
//     }
//   }
//   // 5xx error
//   serverError(count?: number): void {
//     if (count && count == this.MAXCOUNT)
//       router.push({
//         name: 'message',
//         params: { status: String(this.status) },
//       });
//   }

//   loginError() {
//     const message = ref('');
//     if (this.status === 401)
//       message.value = '아이디와 비밀번호가 일치하지 않습니다.';
//     else if (this.status > 499)
//       message.value = `현재 부분 점검중입니다. 일부 기능이 제한될 수 있으니 잠시 후 다시 시도해주세요 (오류코드: -${this.status})`;
//     return {
//       detail: false,
//       message: message.value,
//     };
//   }
// }
