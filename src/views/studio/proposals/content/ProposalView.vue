<template>
  <div class="proposal">
    <div class="create-at">{{ createAtToMoment }}</div>
    <strong class="status-title"
      >제안상태 : <em class="confirm">{{ confirmMatched }}</em></strong
    >
    <h6>이모티콘 심사는 2주에서 최대 1개월까지 소요될 수 있습니다.</h6>

    <div class="confirm-step">
      <ul class="progressbar">
        <li>제출완료</li>
        <li>심사중</li>
        <li>심사완료</li>
        <li>상품화</li>
      </ul>
    </div>

    <hr class="line" />

    <div class="emoji-info">
      <h2 class="emoji-info-title">이모티콘 정보</h2>

      <dl>
        <dt>스튜디오 유형</dt>
        <dd class="emoji-category">
          <font-awesome-icon class="icon" icon="fa-smile" />멈춰있는 이모티콘
          <span class="open-studio">OPEN STUDIO</span>
        </dd>
      </dl>

      <dl>
        <dt>이모티콘 상품명</dt>
        <dd>{{ proposalInfo.product_name }}</dd>
      </dl>

      <dl>
        <dt>이모티콘 카테고리</dt>
        <dd>{{ proposalInfo.category }}</dd>
      </dl>

      <dl>
        <dt>이모티콘 태그</dt>
        <dd>{{ proposalInfo.tag }}</dd>
      </dl>

      <dl>
        <dt>이모티콘 설명</dt>
        <dd>
          {{ proposalInfo.comment }}
        </dd>
      </dl>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, computed } from '@vue/composition-api';
import { useStore } from '@/services/pinia/store';

export default defineComponent({
  name: 'ProposalView',
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const store = useStore();

    const proposalInfo = computed(() => store.proposalInfo);

    onMounted(async () => {
      await store.FETCH_PROPOSAL_INFO('test', Number(props.id));

      const progressbarTag = document.getElementsByClassName('progressbar')[0];

      for (let [index, node] of progressbarTag.childNodes.entries()) {
        const is_confirm = Number(proposalInfo.value.is_confirm);

        if (index <= is_confirm) {
          const tag = node as any;

          tag.className = 'active';
        }
      }
    });

    return {
      proposalInfo,
      confirmMatched: computed(() => store.confirmMathed),
      createAtToMoment: computed(() => store.createAtToMoment),
    };
  },
});
</script>

<style lang="scss" scoped>
.create-at {
  width: 100%;
  text-align: left;
  color: #6d6d6d;

  font-weight: bold;
  font-size: 14px;

  margin: 30px 0;
}
.status-title {
  font-weight: bold;
}

.status-title > .confirm {
  font-size: 14px;
  font-weight: 600;
  line-height: 10px;
  color: #6d6d6d;

  font-style: normal;
  font-weight: bold;
}

.confirm-step {
  width: 100%;
}

.proposal > .confirm-step > ul {
  width: 100%;
  padding: 0;
}

.progressbar-wrapper {
  background: #fff;
  width: 100%;
  padding-top: 10px;
  padding-bottom: 5px;
}

.progressbar li {
  list-style-type: none;
  width: 20%;
  display: inline-block;
  font-size: 13px;
  position: relative;
  text-align: center;
  text-transform: uppercase;
  color: #7d7d7d;
}

.progressbar li:before {
  width: 60px;
  height: 60px;
  content: '';
  line-height: 60px;
  border: 2px solid #7d7d7d;
  display: block;
  text-align: center;
  margin: 0 auto 3px auto;
  border-radius: 50%;
  position: relative;
  font-size: 20px;
  font-weight: bold;
  color: #fff;
  z-index: 2;
  background-color: #e9e9e9;
}

.progressbar li:after {
  width: 100%;
  height: 2px;
  content: '';
  position: absolute;
  background-color: #7d7d7d;
  top: 30px;
  left: -50%;
  z-index: 0;
}

.progressbar li:first-child:after {
  content: none;
}

// active inside circle text set
.progressbar li.active {
  color: #6d6d6d;
  font-weight: bold;
  font-size: 13px;
}

// active inside circle color set
.progressbar li.active:before {
  border-color: #ffbb1b;
  background: #efc706;
}

// active outside line color set
.progressbar li.active + li:after {
  background-color: #efc706;
}

.progressbar {
  counter-reset: step;
}

.progressbar li:before {
  content: counter(step);
  counter-increment: step;
}

.line {
  margin: 60px 0;
}

.emoji-info {
  text-align: left;
}
.emoji-info > .emoji-info-title {
  color: #9f9f9f;

  font-weight: normal;
}

.emoji-info .emoji-category {
  background-color: #efc706;
  padding: 15px 20px;
  color: #000;

  font-weight: bold;
  font-size: 15px;
}

.emoji-info .emoji-category > .icon {
  margin-right: 10px;

  font-size: 20px;
}

.emoji-info > dl > dt {
  // text-align: left;
  font-weight: bold;
  color: #000;
  font-size: 14px;

  float: left;
}

.emoji-info > dl > dd {
  color: #9f9f9f;

  font-size: 13px;

  margin-inline-start: 150px;

  font-weight: 600;
}
.open-studio {
  border: 2px solid black;
  border-radius: 20px;

  padding: 2px;

  margin: 0 auto;

  font-weight: bold;
  font-size: 15px;
  float: right;
}
</style>
