<template>
  <div class="container">
    <h2 class="title">
      인증번호 요청할<br />
      이메일 주소를 입력해 주세요.
    </h2>
    <label for="email">
      <strong>이메일</strong>
    </label>

    <div class="input-wrap">
      <input
        type="text"
        id="email"
        placeholder="이메일"
        v-model="email"
        disabled
      />
      <button @click="onAuthNumberSubmit">인증번호 요청</button>
    </div>

    <div class="input-wrap">
      <input
        type="number"
        id="author"
        placeholder="인증번호 입력"
        maxlength="6"
        :class="[is_author_check ? 'input-error' : 'input-normal']"
        v-model="author"
      />
      <span class="counter">{{ counter }}</span>
      <button @click="onAuthSubmit">인증하기</button>
    </div>

    <div class="message" :class="{ success: isSuccess }">{{ message }}</div>

    <ul class="exam">
      <li>3분안에 요청한 인증번호를 입력해주세요.</li>
      <li>인증번호는 작성한 이메일 주소로 인증메일이 발송됩니다.</li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from '@vue/composition-api';
import { fetchAuthEmail, fetchAuthNumber } from '@/apis/user';

export default defineComponent({
  name: 'Step-2',
  emits: ['next'],
  props: {
    formData: {
      type: Object,
      required: true,
    },
  },
  setup(props, { emit }) {
    const is_author_check = ref(false);
    const timer = ref(0);
    const counter = ref('');

    const email = computed(() => props.formData.email);
    const author = ref('');

    const message = ref('');

    const second = ref(0);
    const minute = ref(0);

    const isSuccess = ref(false);

    function countDownTimer() {
      if (second.value == 0) {
        if (minute.value == 0) {
          window.clearTimeout(timer.value);

          timer.value = 0;
        } else {
          second.value = 59;

          minute.value -= 1;
        }
      } else second.value -= 1;

      if (second.value < 10) {
        counter.value = `${minute.value}:0${second.value}`;
      } else {
        counter.value = `${minute.value}:${second.value}`;
      }
    }

    async function onAuthNumberSubmit() {
      function start() {
        counter.value = '3:00';
        second.value = 60;
        minute.value = 2;

        timer.value = window.setInterval(countDownTimer, 1000);
      }

      function end() {
        window.clearTimeout(timer.value);

        timer.value = 0;
      }

      if (timer.value == 0) {
        start();
      } else {
        end();

        start();
      }

      await fetchAuthEmail(email.value);
    }

    // 인증번호 입력
    async function onAuthSubmit() {
      // 인증번호 입력 확인
      if (author.value.length > 0) {
        const data = await fetchAuthNumber(email.value, String(author.value));
        // 인증성공시?
        if (data) {
          window.clearTimeout(timer.value);

          timer.value = 0;

          message.value = '인증이 완료 되었습니다.';

          isSuccess.value = true;

          is_author_check.value = false;
        } else {
          message.value = '인증 실패! 다시 입력바랍니다.';

          isSuccess.value = false;
        }

        emit('next', isSuccess.value, {
          email: email.value,
        });
      } else {
        message.value = '인증번호가 입력되지 않았습니다.';

        is_author_check.value = true;
      }
    }

    function maxLength(e: Event) {
      const target = e.target as HTMLInputElement;

      if (target.value.length > target.maxLength) {
        author.value = target.value.slice(0, target.maxLength) as any;
      }
    }

    return {
      message,
      email,
      maxLength,
      onAuthNumberSubmit,
      onAuthSubmit,
      counter,
      author,
      isSuccess,
      is_author_check,
    };
  },
});
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;

  text-align: left;

  display: block;
}

.title {
  font-weight: normal;
}

label {
  display: inline-block;
  margin-bottom: 16px;
}

.input-wrap {
  position: relative;
  display: flex;
  flex-direction: row;

  flex-wrap: nowrap;

  margin-bottom: 15px;

  input[type='number']::-webkit-outer-spin-button,
  input[type='number']::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input {
    flex: 1;

    text-indent: 10px;
    border-width: 1px;
    border-style: solid;
    border-radius: 5px;

    height: 34px;
    width: 290px;

    &:focus {
      outline: none;

      box-shadow: 0 0 1px;
    }
  }

  button {
    background: rgb(83, 83, 83);
    width: 100px;

    margin-left: 10px;
    color: white;
    font-weight: bold;

    padding: 8px;
    border: none;
    border-radius: 5px;

    cursor: pointer;
  }
}

.counter {
  color: rgb(191, 89, 31);

  font-size: 12px;

  z-index: 1;

  position: absolute;
  right: 120px;
  top: 12px;
}

.message {
  color: rgb(191, 89, 31);

  font-size: 12px;

  margin-top: 25px;
}

.exam {
  font-size: 11px;

  padding-inline-start: 13px;
  margin: 0;

  padding-top: 20px;

  color: rgb(142, 142, 142);

  text-align: left;

  li {
    padding-top: 5px;
  }
}

.input-error {
  border-color: red;
}

.input-normal {
  border-color: rgb(197, 197, 197);
}

.success {
  color: blue;
}

.btn-clear {
  display: none;
  position: absolute;
  right: 120px;
  top: 50%;
  transform: translateY(-50%);

  color: #fff;
  background: rgb(232, 232, 232);
  border-radius: 100%;

  width: 15px;
  height: 15px;

  text-indent: 3.5px;
  line-height: 15.5px;
  font-weight: 100;
  font-size: 12px;

  transition: all 0.2s;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
}
</style>
