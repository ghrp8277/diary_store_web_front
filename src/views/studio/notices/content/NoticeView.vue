<template>
  <div v-if="notice">
    <div class="title-head">
      <div class="wrap-content">
        <span v-if="notice.is_important" class="txt-tag">중요</span>
        <strong>{{ notice.title }}</strong>
      </div>
      <span class="txt-date">{{
        moment(notice.createdAt).format('YYYY-MM-DD')
      }}</span>
    </div>
    <div class="content" v-html="htmlBind"></div>

    <router-link :to="{ name: 'notices' }" tag="div" class="paging-recent">
      <span>목록</span>
    </router-link>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  toRefs,
  computed,
  watch,
} from '@vue/composition-api';
import { useStore } from '@/services/pinia/store';
import moment from 'moment';
import { Notice } from '@/types/notice';

export default defineComponent({
  name: 'NoticeView',
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const store = useStore();
    const { id } = toRefs(props);

    onMounted(async () => {
      await store.FETCH_STUDIO_NOTICE_INFO('test', id.value);
    });

    return {
      htmlBind: computed(() => store.noticeInfo.html),
      notice: computed(() => store.noticeInfo.notice as Notice),
      moment,
    };
  },
});
</script>

<style lang="scss" scoped>
.title-head {
  height: 52px;
  margin-bottom: 20px;
  border: 1px solid #e6e6e6;
  line-height: 54px;
}

.wrap-content {
  float: left;
  width: 500px;
  height: 100%;
  padding: 0 40px;
}

.wrap-content > strong {
  font-size: 13px;
  color: #717274;

  display: inline-block;
  overflow: hidden;
  max-width: 80%;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.txt-tag {
  float: left;
  margin: 18px 13px 0 0;
  padding: 0 8px;
  border-radius: 3px;
  font-size: 10px;
  line-height: 18px;
  background: #393a3e;
  color: #fff;
}

.txt-date {
  display: block;
  overflow: hidden;

  font-size: 11px;
}

.content {
  margin: 30px 0;

  border-bottom: 1px solid #e6e6e6;
}

.paging-recent {
  text-align: center;

  cursor: pointer;
}

.paging-recent > span:hover {
  color: #ffbb1b;
}

.paging-recent > span {
  margin: 0 40px;
  color: #2d2e32;

  font-size: 13px;
}
</style>
