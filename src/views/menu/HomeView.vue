<template>
  <div class="home">
    <section class="studio-section">
      <h3 class="screen_out">새로운 이모티콘이 만들어지는 곳</h3>
      <h1>다이어리 <strong>이모티콘 스튜디오</strong></h1>

      <img :src="require(`@/assets/logo2.png`)" />
    </section>
    <section class="content">
      <div class="top-proposal">
        <div class="inner-proposal">
          <span class="line-boxtop"></span>
          <span class="open-studio">OPEN STUDIO</span>
          <span class="txt_proposal"
            >여러분이 직접 제작한
            <span class="txt-emph">이모티콘을 제안</span>해보세요!</span
          >

          <router-link to="/studio" custom v-slot="{ navigate, href }">
            <h3>
              <a
                :href="href"
                class="link_proposal"
                id="m_start_proposal"
                @click="navigate"
                >제안 시작하기
                <span class="ico_emoticon ico_arrow"></span>
              </a>
            </h3>
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'HomeView',
  components: {},
});
</script>

<style lang="scss" scoped>
.home {
  height: 100%;
  background-color: white;
}

.studio-section {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 0;
  width: 100%;
  min-width: 1100px;
  height: 538px;
  padding-top: 130px;
  background-color: #393a3e;

  h3 {
    font-weight: 400;
  }

  h1 {
    color: #fff;

    font-weight: 400;

    font-size: 40px;

    strong {
      text-shadow: 2px 2px orange, 5px 5px black;

      -webkit-text-fill-color: transparent;
      -webkit-text-stroke-width: 2px;
      -webkit-text-stroke-color: white;
    }
  }

  .screen_out {
    font-size: 20px;
    line-height: 0;

    text-align: center;

    color: white;
  }
}

.content {
  position: absolute;
  width: 100%;
  left: 0;
  top: 544px;
  z-index: 1;
  min-height: 100%;
  background-color: white;

  .top-proposal {
    position: absolute;
    left: 0;
    right: 0;
    top: -10px;

    .inner-proposal {
      width: 1100px;
      height: 259px;
      margin: 0 auto;
      background-color: #fff;
      border: 1px solid #d9d9d9;
      border-top: 0 none;

      .line-boxtop {
        display: block;
        margin: 0 -1px;
        height: 8px;
        background-color: #fcd209;
      }

      .open-studio {
        display: block;
        width: 167px;
        height: 33px;
        margin: 31px auto 0;

        text-align: center;

        font-size: 20px;
        font-weight: bold;

        line-height: 34px;

        border: 3px solid black;
        border-radius: 20px;
      }

      .txt_proposal {
        display: block;
        margin-top: 17px;
        text-align: center;
        font-size: 22px;
        color: #090909;

        .txt-emph {
          color: #ffbc1a;
          font-weight: bold;
        }
      }

      .link_proposal {
        display: block;
        position: relative;
        width: 271px;
        height: 57px;
        margin: 31px auto 0;
        background-color: #fcd209;
        border: 1px solid #ffbc1a;
        text-align: center;
        font-size: 18px;
        color: #000;
        line-height: 55px;
        font-weight: bold;
        text-decoration: none;
      }
    }
  }
}
</style>
