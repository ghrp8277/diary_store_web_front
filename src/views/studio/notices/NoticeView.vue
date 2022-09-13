<template>
  <div>
    <div class="title-head">
      <div class="wrap-content">
        <span v-if="is_important" class="txt-tag">중요</span>
        <strong>{{ title }}</strong>
      </div>
      <span class="txt-date">{{ createAtToMoment }}</span>
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
} from '@vue/composition-api';
import stores from '@/stores';
import moment from 'moment';
import { storeToRefs } from 'pinia';
import noticesComposable from '@/composables/notices';

export default defineComponent({
  name: 'NoticeView',
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const { id } = toRefs(props);
    const { html } = storeToRefs(stores.store);

    const { isLoading } = storeToRefs(stores.main);

    const { is_important, createdAt, title } = noticesComposable(id.value);

    onMounted(async () => {
      isLoading.value = true;

      await stores.store.FETCH_STUDIO_NOTICE_INFO(id.value);

      isLoading.value = false;
    });

    return {
      htmlBind: computed(() => html.value),
      is_important,
      title,
      createAtToMoment: moment(createdAt.value).format('YYYY-MM-DD'),
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
