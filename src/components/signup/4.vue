<template>
  <div class="container">
    <h2 class="title">
      다이어리 로그인에 사용할<br />
      비밀번호를 등록해 주세요.
    </h2>
    <label for="password">
      <strong>비밀번호</strong>
    </label>

    <div class="input-wrap">
      <input
        :class="[is_password_check ? 'input-error' : 'input-normal']"
        type="password"
        id="password"
        maxlength="32"
        placeholder="비밀번호 입력 (8~32자리)"
        v-model="password"
        @input="onPasswordCheck"
      />

      <span class="strength">
        <progress id="progress" :value="strength" min="0" max="100" />
      </span>
    </div>

    <div class="input-wrap">
      <input
        :class="[is_password2_check ? 'input-error' : 'input-normal']"
        type="password"
        id="password2"
        maxlength="32"
        placeholder="비밀번호 재입력"
        v-model="password2"
        @input="onSamePasswordCheck"
      />
    </div>

    <div class="message">{{ message }}</div>

    <ul class="exam">
      <li>
        비밀번호는 8~32자리의 영문 대소문자, 숫자, 특수문자를 조합하여 설정해
        주세요.
      </li>
      <li>
        다른 사이트에서 사용하는 것과 동일하거나 쉬운 비밀번호는 사용하지
        마세요.
      </li>
      <li>안전한 계정 사용을 위해 비밀번호는 주기적으로 변경해 주세요.</li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from '@vue/composition-api';

export default defineComponent({
  name: 'Step-4',
  props: {
    formData: {
      type: Object,
      required: true,
    },
  },
  emits: ['next'],
  setup(props, { emit }) {
    const password = ref('');
    const password2 = ref('');

    const message = ref('');

    const is_password_check = ref(false);

    const is_password2_check = ref(false);

    const strength = ref(0);

    // 최소 8 자 및 최대 10 자, 하나 이상의 대문자, 하나의 소문자,
    // 하나의 숫자 및 하나의 특수 문자 정규식
    function passwordCheck(text: string) {
      const reg =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,32}/;

      const isCheck = reg.test(text);

      return isCheck;
    }

    function passwordStrength() {
      const pwLength = password.value.length;

      if (pwLength >= 8 && pwLength < 10) {
        strength.value = 35;
      } else if (pwLength >= 10 && pwLength < 14) {
        strength.value = 70;
      } else if (pwLength >= 14) {
        strength.value = 100;
      } else {
        strength.value = 0;
      }
    }

    function onPasswordCheck() {
      if (passwordCheck(password.value)) {
        is_password_check.value = false;

        message.value = '';

        passwordStrength();
      } else {
        is_password_check.value = true;

        message.value =
          '최소 8 자 및 최대 10 자, 영문 대소문자, 숫자, 특수문자를 조합하여 설정해주세요';
      }
    }

    function onSamePasswordCheck() {
      if (password.value == password2.value) {
        is_password2_check.value = false;

        message.value = '';

        emit('next', true, { password: password2.value });
      } else {
        is_password2_check.value = true;

        message.value = '비밀번호가 맞지 않습니다. 다시 입력바랍니다.';
      }
    }

    return {
      message,
      password,
      password2,
      is_password_check,
      is_password2_check,
      onPasswordCheck,
      onSamePasswordCheck,
      strength,
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
  display: flex;
  flex-direction: row;

  flex-wrap: nowrap;

  margin-bottom: 15px;
  position: relative;

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

.exam {
  font-size: 11px;

  padding-inline-start: 13px;
  margin: 0;

  padding-top: 25px;

  color: rgb(142, 142, 142);

  text-align: left;

  li {
    padding-top: 5px;
  }
}

.strength {
  position: absolute;
  right: 10px;
  top: 35%;
  transform: translateY(-50%);

  font-size: 13px;

  color: rgb(75, 111, 31);

  display: flex;
  flex-wrap: nowrap;
  align-content: center;
  padding-top: 8px;

  #progress {
    width: 70px;

    margin-top: 0.15em;
    margin-left: 5px;

    color: red;
  }
}

.message {
  color: rgb(191, 89, 31);

  font-size: 12px;

  margin-top: 20px;
}

.input-error {
  border-color: red;
}

.input-normal {
  border-color: rgb(197, 197, 197);
}
</style>
