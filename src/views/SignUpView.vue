<template>
  <div class="signup-container">
    <div class="signup-card">
      <div class="inner-wrap">
        <strong class="card-title">회원가입</strong>

        <ul class="step">
          <li :class="[step === 1 ? 'active-step' : 'non-step']"></li>
          <li :class="[step === 2 ? 'active-step' : 'non-step']"></li>
          <li :class="[step === 3 ? 'active-step' : 'non-step']"></li>
          <li :class="[step === 4 ? 'active-step' : 'non-step']"></li>
          <li :class="[step === 5 ? 'active-step' : 'non-step']"></li>
        </ul>

        <div v-if="dynamicComponent" style="margin-top: 50px">
          <transition name="slide-fade" mode="out-in">
            <keep-alive>
              <component
                :is="dynamicComponent"
                @next="next"
                :formData="formData"
              ></component>
            </keep-alive>
          </transition>
        </div>

        <button class="submit" @click="onSubmit" :disabled="!isNext">
          {{ button_name }}
        </button>
      </div>

      <h3 class="logo">Diary Application</h3>
    </div>
  </div>
</template>

<script lang="ts">
import router from '@/router';
import {
  defineComponent,
  computed,
  ref,
  defineAsyncComponent,
} from '@vue/composition-api';
import { fetchSignUp } from '@/apis/user';

export default defineComponent({
  name: 'SignUpView',
  setup() {
    const button_name = computed(() => {
      if (step.value == 5) {
        return '로그인';
      } else if (step.value == 4) {
        return '회원가입';
      } else {
        return '다음';
      }
    });
    const step = ref(1);

    const isNext = ref(false);

    const formData: Record<string, string> = {};

    const dynamicComponent = computed(() => {
      const stepComponent = `${step.value}`;

      return defineAsyncComponent({
        loader: () => import(`@/components/signup/${stepComponent}.vue`),
        delay: 500,
        timeout: 3000,
      });
    });

    async function onSubmit() {
      if (step.value == 5) {
        router.push({
          name: 'login',
        });
      }

      if (isNext.value) {
        if (step.value == 4) {
          await fetchSignUp({
            username: formData.username,
            password: formData.password,
            email: formData.email,
          });
        }

        isNext.value = false;

        step.value += 1;
      }
    }

    function next(is: boolean, obj: Record<string, string>) {
      const key = Object.keys(obj)[0];
      const value = Object.values(obj)[0];

      formData[key] = value;

      isNext.value = is;
    }

    return {
      step,
      button_name,
      dynamicComponent,
      onSubmit,
      next,
      isNext,
      formData,
    };
  },
});
</script>

<style lang="scss" scoped>
.signup-container {
  position: relative;
  width: 100%;
  height: 100%;
}

.signup-card {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid rgb(224, 224, 224);
  width: 600px;
  height: 700px;
  border-radius: 5px;

  box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.2);

  .inner-wrap {
    overflow: hidden;
    padding: 80px 90px;
    text-align: left;

    box-sizing: border-box;
    height: 100%;
    position: relative;

    .card-title {
      font-weight: 600;

      font-size: 21px;
    }

    .step {
      list-style: none;

      padding-inline-start: 0;
      margin-top: 20px;

      li {
        width: 38px;
        height: 3px;

        border-radius: 20px;

        margin-right: 7px;

        float: left;
      }
    }

    .submit {
      width: 420px;
      padding: 8px 0;

      font-weight: bold;
      color: white;

      background: rgb(141, 154, 156);

      border: none;
      border-radius: 5px;

      cursor: pointer;
      position: absolute;
      bottom: 130px;
      left: 50%;
      transform: translateX(-50%);

      &:hover {
        background: rgba(141, 154, 156, 0.8);
      }
    }
  }

  .logo {
    position: absolute;

    bottom: 5px;
    left: 50%;

    transform: translateX(-50%);

    font-weight: normal;
  }
}

.active-step {
  background: #000;
}

.non-step {
  background: rgb(220, 220, 220);
}

.slide-fade-enter {
  transform: translateX(10px);
  opacity: 0;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.2s ease-in-out;
}

.slide-fade-leave-to {
  transform: translateX(-10px);
  opacity: 0;
}
</style>
