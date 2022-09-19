<template>
  <div class="table-view">
    <table>
      <colgroup>
        <col width="70%" />
        <col width="30%" />
      </colgroup>
      <tbody>
        <tr
          :class="{ 'tr-import': notice.is_important }"
          v-for="(notice, index) in notices"
          :key="index"
          @click="onClick($event, notice.id)"
        >
          <td scope="col" :class="{ 'txt-title': notice.is_important }">
            <span v-if="notice.is_important" class="txt-tag">중요</span>
            {{ notice.title }}
          </td>
          <td scope="col" class="txt-date">
            {{ moment(notice.createdAt).format('YYYY-MM-DD') }}
          </td>
        </tr>
      </tbody>
    </table>

    <div class="wrap-paging">
      <!-- <span class="link-paging" disabled>
        <font-awesome-icon class="icon" icon="fa-arrow-left" />
      </span> -->
      <span class="link-paging" @click="onArrowPage" title="left"
        ><font-awesome-icon class="icon" icon="fa-chevron-left"
      /></span>
      <!-- 넘버링 페이지 -->
      <span
        class="link-paging"
        :class="{ 'click-page': page === index }"
        @click="onChangePage($event, index)"
        v-for="index in totalPage"
        :key="index"
      >
        {{ index }}
      </span>
      <span class="link-paging" @click="onArrowPage" title="right"
        ><font-awesome-icon class="icon" icon="fa-chevron-right"
      /></span>
      <!-- <span class="link-paging"
        ><font-awesome-icon class="icon" icon="fa-arrow-right"
      /></span> -->
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from '@vue/composition-api';
import router from '@/router';
import { useStore } from '@/stores/store';
import moment from 'moment';
import { storeToRefs } from 'pinia';

export default defineComponent({
  name: 'NoticesTableView',
  setup() {
    const store = useStore();

    const { noticesInfo, noticePage } = storeToRefs(store);

    function onClick(e: Event, id: number) {
      router.push({
        name: 'notice',
        params: {
          id: String(id),
        },
      });
    }

    function onChangePage(e: Event, index: number) {
      noticePage.value.page = index;
    }

    function onArrowPage({ currentTarget }: Event) {
      const target = currentTarget as HTMLElement;
      const { nodeName } = target;

      if (nodeName == 'SPAN') {
        const title = target.title;

        switch (title) {
          case 'left':
            if (noticePage.value.page > 1) {
              noticePage.value.page = noticePage.value.page - 1;
            }
            break;
          case 'right':
            if (noticePage.value.page < noticePage.value.totalPage) {
              noticePage.value.page = noticePage.value.page + 1;
            }
            break;
        }
      }
    }

    return {
      totalPage: noticePage.value.totalPage,
      onChangePage,
      onArrowPage,
      page: noticePage.value.page,
      notices: computed(() => noticesInfo.value),
      moment,
      onClick,
    };
  },
});
</script>

<style lang="scss" scoped>
.table-view > table {
  width: 100%;

  border-spacing: 2px;

  border: 1px solid #e6e6e6;

  border-collapse: collapse;

  margin: 42px 0 40px;

  text-align: left;
}

.table-view > table > tbody > tr {
  cursor: pointer;

  border-color: inherit;
}

.tr-import {
  background-color: #fafafa;
}

.table-view > table > tbody > tr:hover {
  background-color: rgba(#717274, 0.5);
}

.table-view > table > tbody > tr > td {
  padding: 15px 30px;

  color: #717274;

  font-size: 13px;

  border-bottom: 1px solid #e0e0e0;
}

.txt-tag {
  display: inline-block;

  padding: 0 8px;
  margin: 0 5px;

  border-radius: 3px;
  font-size: 10px;
  line-height: 18px;
  background: #393a3e;
  color: #fff;
}

.txt-title {
  font-weight: bold;
}

.txt-date {
  text-align: center;
}

.wrap-paging {
  overflow: hidden;

  text-align: center;
}

.link-paging {
  display: inline-block;

  width: 38px;
  height: 18px;
  margin: 0 2px;

  padding: 9px 0;

  cursor: pointer;

  border: 1px solid #e0e0e0;
}

.link-paging > svg {
  font-size: 15px;
}

.click-page {
  border: 1px solid #f79700;
  color: #f79700;
}
</style>
