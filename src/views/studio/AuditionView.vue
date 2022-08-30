<template>
  <div class="audition">
    <div class="studio-manual">
      <div class="open-studio">OPEN STUDIO</div>
      <h4>
        누구든지 직접 제작한 이모티콘을 자유롭게 제안해보세요!
        <p>모집기간: 상시</p>
      </h4>
    </div>
    <!-- 이모티콘 제안 -->
    <div class="emoji-proposal-cards">
      <div class="emoji-proposal-card">
        <h2>
          <font-awesome-icon icon="fa-smile" style="height: 60px" />
          <p>
            <strong>멈춰있는 이모티콘</strong>
          </p>
        </h2>
        <button class="submit" @click="submit">제안하기</button>

        <div class="guide">
          <h5>멈춰있는 이모티콘 제안가이드</h5>

          <dl class="list-guide">
            <dt>총 15종</dt>
            <dd>
              <span class="txt-guide"
                >PNG <em class="emph-guide">15종</em> (투명배경)</span
              >
            </dd>
          </dl>

          <ol class="ol-guide">
            <li>제작 사이즈는 360 x 360 (px) 입니다.</li>
            <li>시안은 1개당 150KB 이하로 제작해 주세요.</li>
            <li>해상도는 72dpi, 컬러모드는 RGB를 권장합니다.</li>
          </ol>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import router from '@/router';

export default defineComponent({
  name: 'AuditionView',
  setup() {
    const submit = () => {
      router.push({
        name: 'emotion',
      });
    };
    return {
      submit,
    };
  },
});
</script>

<style lang="scss" scoped>
.studio-manual {
  margin: 0 auto;

  padding-top: 100px;
}

.open-studio {
  border: 3px solid black;
  border-radius: 20px;

  width: 200px;
  margin: 0 auto;

  font-weight: bold;
  font-size: 25px;
}

.emoji-proposal-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);

  padding: 30px 10px;
}

.emoji-proposal-card {
  padding: 20px;

  border-right: 1px solid rgba(224, 224, 244, 0.4);

  color: #2d2e32;
}

.submit {
  background-color: #fcd207;

  border: 1px solid #ffbb1b;

  font-size: 15px;

  padding: 10px 25px;

  cursor: pointer;
}

.submit:hover {
  background-color: rgba(#fcd207, 0.7);
}

.guide {
  text-align: left;
}

dt {
  float: left;
  width: 78px;
  height: 61px;
  line-height: 61px;
  border-right: 1px solid #e3e3e3;
  font-size: 14px;
  color: #ee565a;
  text-align: center;
  background-color: #f7f7f7;
}

dd {
  overflow: hidden;
  color: #000;
  line-height: 61px;
}

.list-guide {
  overflow: hidden;
  border: 1px solid #e0e0e0;
  font-family: 'NotoSans-DemiLight';
}

.txt-guide {
  display: block;
  padding-left: 18px;
  font-size: 12px;
  text-align: left;
}

.emph-guide {
  color: #ee565a;

  font-style: normal;
  font-weight: normal;
}

ol {
  padding-inline-start: 0;
}
.ol-guide > li {
  font-size: 12px;
  color: #717274;
  text-align: left;
}
</style>
