<template>
  <div class="proposals-not-content">
    <div class="img_thumb_none"></div>
    <strong class="tit_emoticon">등록된 제안이 없습니다.</strong>
    <p class="desc_g">
      다이어리 이모티콘 스튜디오가 당신의 새로운 제안을 기다립니다.
    </p>
    <router-link
      :to="{ name: 'audition' }"
      tag="button"
      class="btn-new-audition"
    >
      신규 제안
    </router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'ProposalsNotContent',
  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
.proposals-not-content {
  padding-top: 135px;
  text-align: center;

  overflow: hidden;
  padding: 0 78px 35px;

  padding-top: 135px;
}

.img_thumb_none {
  width: 200px;
  height: 200px;
  background: url(@/assets/logo2.png) no-repeat;

  margin: 0 auto;
}

.desc_g {
  margin-bottom: 69px;
  font-size: 16px;
  font-weight: 400;
  color: #717274;
}

.btn-new-audition {
  margin-bottom: 189px;
  line-height: 53px;

  cursor: pointer;

  display: inline-block;
  width: 203px;
  height: 52px;
  font-size: 16px;
  text-align: center;
  line-height: 49px;
  font-weight: 400;
  background-color: #fddb45;
  border: 1px solid #fdc745;
  color: #644636;
}

.btn-new-audition:hover {
  background-color: rgba(#fddb45, 0.7);
}
</style>
