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

        <div class="info-proposal">
          <h1>스튜디오에서 제안하고, 스토어에서 판매해보세요.</h1>
          <h4>
            새롭고 다양한 이모티콘이 더 많은 사용자를 만날 수 있도록 아래와 같은
            과정을 거칩니다.
          </h4>

          <div class="info-wrap">
            <div class="step">
              <strong>이모티콘 제안하기</strong>
              <h4>
                이모티콘 시안을 제작하여 <br />상품 유형에 맞게 제안하세요.
              </h4>
            </div>
            <div class="arrow-pointer"></div>
            <div class="step">
              <strong>이모티콘 심사</strong>
              <h4>
                제안을 심사하는 동안 기다려주세요. <br />(약 2주 내외 소요)
              </h4>
              <!-- <p>(약 2주 내외 소요)</p> -->
            </div>
            <div class="arrow-pointer"></div>
            <div class="step">
              <strong>상품화</strong>
              <h4>심사 통과된 제안을 <br />실제 상품으로 준비합니다.</h4>
            </div>
            <div class="arrow-pointer"></div>
            <div class="step">
              <strong>출시 후 판매</strong>
              <h4>이모티콘을 출시하고 <br />스토어에서 판매해보세요.</h4>
            </div>
          </div>
        </div>

        <div class="carton-box">
          <h1>여러분의 <u>크리에이티브를</u> 펼쳐보세요</h1>

          <h4>다양한 이모티콘을 자유롭게 제안할 수 있어요.</h4>

          <div class="outer">
            <div class="box">
              <span style="--i: 1"
                ><img :src="require(`@/assets/logo2.png`)"
              /></span>
              <span style="--i: 2"
                ><img :src="require(`@/assets/logo2.png`)"
              /></span>
              <span style="--i: 3"
                ><img :src="require(`@/assets/logo2.png`)"
              /></span>
              <span style="--i: 4"
                ><img :src="require(`@/assets/logo2.png`)"
              /></span>
              <span style="--i: 5"
                ><img :src="require(`@/assets/logo2.png`)"
              /></span>
              <span style="--i: 6"
                ><img :src="require(`@/assets/logo2.png`)"
              /></span>
              <span style="--i: 7"
                ><img :src="require(`@/assets/logo2.png`)"
              /></span>
              <span style="--i: 8"
                ><img :src="require(`@/assets/logo2.png`)"
              /></span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'HomeView',
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
  min-height: calc(100% + 544px);
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

    .info-proposal {
      width: 1100px;
      margin: 100px auto;

      .info-wrap {
        width: 100%;

        display: flex;
        flex-wrap: nowrap;
        align-content: space-around;
        justify-content: center;

        .step {
          border-radius: 100%;

          border: 1px solid black;

          width: 150px;
          height: 150px;

          margin: 0 20px 0 30px;

          position: relative;

          strong {
            position: absolute;

            bottom: -40px;

            text-align: center;

            left: 0;
            width: 100%;
          }

          h4 {
            position: absolute;
            font-weight: 400;
            font-size: 15px;
            top: 195px;
            left: -30px;
            width: calc(100% + 70px);

            margin: 0;
          }
        }
      }
    }

    .arrow-pointer {
      width: 50px;
      height: 20px;
      background: #d9d9d9;
      position: relative;
      top: 65px;

      border-top-left-radius: 5px;
      border-bottom-left-radius: 5px;

      &:before {
        content: '';
        position: absolute;
        right: -15px;
        top: -10px;
        width: 0;
        height: 0;
        border-left: 25px solid #d9d9d9;
        border-top: 20px solid transparent;
        border-bottom: 20px solid transparent;
      }
    }

    .carton-box {
      margin: 200px auto;
      width: 1100px;

      h1,
      h4 {
        font-weight: 400;

        font-size: 26px;
      }

      h4 {
        color: #393a3e;

        font-size: 17px;
      }

      .outer {
        width: 100%;
        height: 200px;
        display: flex;
        justify-content: center;
        align-items: center;

        margin: 0 auto;
      }

      .box {
        display: flex;
        width: 100px;
        height: 100px;
        transform-style: preserve-3d;
        animation: animate 50s linear infinite;
      }

      .box span {
        border: 1px solid gray;
        border-radius: 5%;
        background: #f5f5f5;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        transform-origin: center;
        transform-style: preserve-3d;
        transform: rotateY(calc(var(--i) * 45deg)) translateZ(300px);
        -webkit-box-reflect: below 5px
          linear-gradient(transparent, transparent, #0004);
      }

      .box span img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      @keyframes animate {
        0% {
          transform: perspective(1000px) rotateY(0deg);
        }
        100% {
          transform: perspective(1000px) rotateY(360deg);
        }
      }
    }
  }
}
</style>
