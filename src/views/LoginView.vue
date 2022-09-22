<template>
  <div class="login-container">
    <div class="login-card">
      <div class="login-form">
        <form @submit.prevent="onSubmit">
          <h2 class="form-title">
            <span><b>Diary Studio</b></span>
          </h2>
          <div class="form-item">
            <input
              type="text"
              id="username"
              name="username"
              autocomplete="off"
              placeholder="아이디"
            />
          </div>
          <div class="form-item">
            <input
              type="password"
              id="password"
              name="password"
              autocomplete="off"
              placeholder="비밀번호"
            />
          </div>

          <div class="login-message">
            <transition name="slide-fade">
              <span>{{ message }}</span>
            </transition>
          </div>

          <div class="item-check">
            <input type="checkbox" class="inp_g" />

            <label class="lab_g" for="staySignedIn">
              <span style="outline: none" class="login-check"
                >로그인 상태 유지</span
              >
            </label>
          </div>

          <button type="submit" id="connect" class="btn-signin">
            <span>로그인</span>
          </button>
        </form>

        <hr class="line" />

        <button class="btn-signup">
          <span>회원가입</span>
        </button>
      </div>
      <div class="login-img"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from '@vue/composition-api';
import { fetchLogin } from '@/apis/user';
import router from '@/router';
import {
  saveAccessTokenToCookie,
  saveRefreshTokenToCookie,
  saveUserToCookie,
} from '@/services/cookies';
import { useStore } from '@/stores/main';
import { storeToRefs } from 'pinia';

export default defineComponent({
  setup() {
    const store = useStore();
    const message = ref('');

    const { username, token, refreshToken, isLoading } = storeToRefs(store);

    async function onSubmit(e: Event) {
      const target = e.target as HTMLFormElement;

      const name = target.username.value as string;
      const password = target.password.value as string;

      if (name.length == 0) {
        message.value = '아이디를 입력해 주세요.';
      } else if (password.length == 0) {
        message.value = '비밀번호를 입력해 주세요.';
      } else {
        try {
          isLoading.value = true;

          const data = await fetchLogin(name, password);

          // pinia에 저장
          username.value = name;
          token.value = data.accessToken;
          refreshToken.value = data.refreshToken;

          // 쿠키에 토큰 및 유저명 저장
          saveAccessTokenToCookie(data.accessToken);
          saveRefreshTokenToCookie(data.refreshToken);
          saveUserToCookie(name);

          // 메인으로 이동
          router.push({
            name: 'home',
          });
        } catch (error: any) {
          if (error.status == 401) {
            message.value =
              '등록되지 않은 아이디이거나 아이디 또는 비밀번호를 잘못 입력했습니다.';
          }
        } finally {
          isLoading.value = false;
        }
      }
    }

    return { onSubmit, message };
  },
});
</script>

<style lang="scss" scoped>
.login-container {
  background-color: rgb(233, 233, 233);
  height: 100%;
  min-height: 700px;

  display: flex;

  justify-content: center;
  align-items: center;
}

.login-card {
  text-align: center;

  height: 500px;
  width: 80vw;
  max-width: 1000px;

  background: #e4e4e4;
  border: 1px solid rgba(0, 0, 0, 0.75);
  border-radius: 5px;
  box-shadow: -1px 4px 28px 0px rgba(0, 0, 0, 0.75);

  display: flex;

  justify-content: center;
  align-items: center;
  flex-direction: row;
  flex-wrap: nowrap;
}

.login-form {
  flex: 1;
}

@media screen and (max-width: 800px) {
  .login-img {
    display: none;
  }

  .login-card {
    width: 500px;
    height: 600px;
  }
}

@media screen and (max-width: 500px) {
  .login-card {
    width: 100%;
    height: 100%;

    border-radius: 0;
    border: none;
  }
}

.login-img {
  flex: 1;

  background: url('@/assets/logo2.png') no-repeat;

  background-color: #393a3e;

  background-position: center;

  height: 100%;
}

.login-form > form {
  position: relative;

  margin: 0 20px;
}

form > .form-title {
  display: block;
  width: 100%;

  text-align: left;
}

.form-item {
  display: flex;
  margin-bottom: 10px;
}

.form-item > input {
  width: 100%;
  height: 35px;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  outline: none;
  border-radius: 5px;

  background-color: rgb(233, 233, 233);

  padding-left: 15px;

  border-width: 1px;
}

input:focus {
  outline: none;
}

.btn-signin {
  background: #717274;

  color: white;
}

.btn-signin:hover {
  background-color: rgba(#717274, 0.9);
}

.btn-signup {
  background: #fff;

  color: black;

  margin: 0 20px;

  box-sizing: border-box;

  width: calc(100% - 40px);
}

.btn-signup:hover {
  background-color: rgba(#fff, 0.9);
}

button {
  font-size: 15px;
  font-weight: bold;
  height: 45px;
  width: 100%;

  border-radius: 5px;

  border: 0;
  cursor: pointer;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  transition: all 0.5s;
}

.login-message {
  color: red;

  text-align: center;

  font-size: 13px;

  margin: 10px;
}

.item-check {
  text-align: left;

  margin-bottom: 10px;
}

.inp_g {
  width: 20px;
  height: 20px;
  color: #717274;
  vertical-align: middle;
  -webkit-appearance: none;
  background: none;
  border: 0;
  outline: 0;
  flex-grow: 0;
  border-radius: 5px;
  background-color: #ffffff;
  transition: background 300ms;
  cursor: pointer;
}

.inp_g::before {
  content: '';
  color: transparent;
  display: block;
  width: inherit;
  height: inherit;
  border-radius: inherit;
  border: 0;
  // background-color: #ccd3d8;
  background-size: contain;
  box-shadow: inset 0 0 0 1px #ccd3d8;
}

/* Checked */
.inp_g:checked {
  background: currentColor;
}

.inp_g:checked::before {
  box-shadow: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E %3Cpath d='M15.88 8.29L10 14.17l-1.88-1.88a.996.996 0 1 0-1.41 1.41l2.59 2.59c.39.39 1.02.39 1.41 0L17.3 9.7a.996.996 0 0 0 0-1.41c-.39-.39-1.03-.39-1.42 0z' fill='%23fff'/%3E %3C/svg%3E");
}

.login-check {
  font-size: 13px;

  padding-left: 3px;

  font-weight: bold;
}

.line {
  width: calc(100% - 40px);

  height: 1px;

  margin: 20px;

  background: #717274;
}

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
