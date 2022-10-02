<template>
  <div class="container">
    <h2 class="title">
      다이어리 계정으로 사용할<br />
      아이디를 입력해 주세요.
    </h2>

    <label for="username">
      <strong>아이디</strong>
    </label>

    <div class="input-wrap">
      <input
        :class="[is_username_check ? 'input-error' : 'input-normal']"
        type="text"
        id="username"
        placeholder="아이디"
        v-model="username"
        @input="checkUserName"
        @focus="showClearBtn"
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
      <li>계정으로 사용할 아이디를 입력해주세요.</li>
      <li>영문, 숫자 또는 영문과 숫자 조합으로만 사용할 수 있습니다.</li>
      <li>최소 4글자 이상의 계정을 입력해주세요.</li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api';
import { fetchFindUsername } from '@/apis/user';

export default defineComponent({
  name: 'Step-3',
  props: {
    formData: {
      type: Object,
      required: true,
    },
  },
  emits: ['next'],
  setup(props, { emit }) {
    const is_username_check = ref(false);

    const username = ref('');

    const message = ref('');

    const isSuccess = ref(false);

    // 스페이스 정규식
    function checkSpace(text: string) {
      const reg = /\s/g;

      const isCheck = reg.test(text);

      return !isCheck;
    }

    // 특수문자 체크
    function checkSpecialWord(text: string) {
      const reg = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/g;

      const isCheck = reg.test(text);

      return !isCheck;
    }

    // 계정명 체크
    function checkUserName(e?: Event) {
      if (e) {
        const target = e.target as HTMLInputElement;

        username.value = target.value.replace(/[^A-Za-z0-9]/gi, '');
      }

      const isCheck =
        username.value.length >= 4 &&
        checkSpace(username.value) &&
        checkSpecialWord(username.value);

      if (!isCheck) {
        is_username_check.value = true;

        isSuccess.value = false;

        message.value = '입력하신 계정을 다시 확인 부탁드립니다.';
      } else {
        is_username_check.value = false;

        isSuccess.value = true;

        message.value = '';
      }

      return isCheck;
    }

    async function onSubmit() {
      if (checkUserName()) {
        const data = await fetchFindUsername(username.value);

        if (data) {
          is_username_check.value = true;

          message.value = '동일한 계정이 있습니다! 새 계정을 입력바랍니다.';

          isSuccess.value = false;
        } else {
          is_username_check.value = false;

          message.value = '해당 계정을 사용할 수 있습니다.';

          isSuccess.value = true;
        }

        emit('next', isSuccess.value, { username: username.value });
      }
    }

    function clear(e: Event) {
      const target = e.target as HTMLElement;

      const parent = target.parentNode as Node;

      const inputTarget = parent.childNodes[0] as HTMLInputElement;

      if (inputTarget.id == 'username') username.value = '';
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

    return {
      message,
      username,
      onSubmit,
      clear,
      isLeave,
      hideClearBtn,
      showClearBtn,
      isSuccess,
      is_username_check,
      checkUserName,
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

.btn-clear {
  position: absolute;
  right: 120px;
  top: 10px;

  color: #fff;
  background: rgb(232, 232, 232);
  border-radius: 100%;

  display: none;
  width: 20px;
  height: 20px;

  text-indent: 4px;
  line-height: 22px;
  font-weight: 100;

  cursor: pointer;

  &:hover {
    opacity: 0.8;
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
</style>
