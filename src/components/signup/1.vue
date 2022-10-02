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
        :class="[is_email_check ? 'input-error' : 'input-normal']"
        v-model="email"
        @focus="showClearBtn"
        @input="emailCheck"
        @blur="hideClearBtn"
      />
      <span
        class="btn-clear"
        @click="clear"
        @mouseleave="isLeave = true"
        @mouseover="isLeave = false"
        >X</span
      >
      <button @click="onSubmit">중복 확인</button>
    </div>

    <div class="message" :class="{ success: isSuccess }">{{ message }}</div>

    <ul class="exam">
      <li>입력한 이메일 주소로 인증번호가 발송됩니다.</li>
      <li>인증메일을 받을 수 있도록 자주 쓰는 이메일 주소를 입력해 주세요.</li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api';
import { fetchEmailCheck } from '@/apis/user';

export default defineComponent({
  name: 'Step-1',
  emits: ['next'],
  setup(props, { emit }) {
    const email = ref('');

    const message = ref('');

    const is_email_check = ref(false);

    const isSuccess = ref(false);

    function emailSizeCheck() {
      if (email.value.length == 0) {
        is_email_check.value = true;

        message.value = '다이어리계정 이메일을 입력해 주세요.';
      }
    }

    function emailCheck() {
      const reg =
        /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

      const is_check = reg.test(email.value);

      if (!is_check) {
        isSuccess.value = false;

        is_email_check.value = true;

        message.value = '입력하신 이메일을 다시 확인 부탁드립니다.';
      } else {
        is_email_check.value = false;

        message.value = '';
      }

      emailSizeCheck();

      return is_check;
    }

    function clear(e: Event) {
      const target = e.target as HTMLElement;

      const parent = target.parentNode as Node;

      const inputTarget = parent.childNodes[0] as HTMLInputElement;

      if (inputTarget.id == 'email') email.value = '';
    }

    const isLeave = ref(false);

    function hideClearBtn(e: Event) {
      const target = e.target as HTMLElement;

      const parent = target.parentNode as Node;

      for (let node of parent.childNodes) {
        if (node.nodeName == 'SPAN' && isLeave.value) {
          const target = node as HTMLElement;

          target.style.display = 'none';
        }
      }
    }

    function showClearBtn(e: Event) {
      const target = e.target as HTMLElement;

      const parent = target.parentNode as Node;

      for (let node of parent.childNodes) {
        if (node.nodeName == 'SPAN') {
          const target = node as HTMLElement;

          target.style.display = 'inline-block';
        }
      }
    }

    async function onSubmit() {
      const data = await fetchEmailCheck(email.value);

      if (data) {
        message.value = '해당 이메일을 사용할 수 있습니다.';

        isSuccess.value = true;

        emit('next', isSuccess.value, {
          email: email.value,
        });
      } else {
        message.value = '동일한 이메일이 있습니다! 새 이메일을 입력바랍니다.';

        isSuccess.value = false;
      }
    }

    return {
      message,
      email,
      clear,
      hideClearBtn,
      showClearBtn,
      isLeave,
      emailCheck,
      is_email_check,
      onSubmit,
      isSuccess,
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
