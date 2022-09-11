<template>
  <div class="table-view">
    <table>
      <colgroup>
        <col width="70%" />
        <col width="30%" />
      </colgroup>
      <tbody>
        <tr
          v-for="(notice, index) in notices"
          :key="index"
          @click="onClick($event, notice)"
        >
          <td scope="col" class="txt-title">
            <span v-if="notice.is_important" class="txt-tag">중요</span>
            {{ notice.title }}
          </td>
          <td scope="col" class="txt-date">
            {{ moment(notice.createdAt).format('YYYY-MM-DD') }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api';
import router from '@/router';
import { useStore } from '@/stores/store';
import moment from 'moment';
import { storeToRefs } from 'pinia';

export default defineComponent({
  name: 'NoticesTableView',
  setup() {
    const store = useStore();

    const { noticesInfo } = storeToRefs(store);

    function onClick(
      e: Event,
      notice: {
        id: number;
        is_important: boolean;
        title: string;
        createdAt: string;
        file_name: string;
      },
    ) {
      router.push({
        name: 'notice',
        params: {
          id: String(notice.id),
        },
      });
    }

    return {
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
}

.table-view > table > tbody > tr {
  cursor: pointer;

  border-color: inherit;

  background-color: #fafafa;
}

.table-view > table > tbody > tr:hover {
  background-color: rgba(#717274, 0.5);
}

.table-view > table > tbody > tr > td {
  padding: 15px;

  color: #717274;

  font-size: 13px;

  border-bottom: 1px solid #e0e0e0;
}

.txt-tag {
  float: left;
  padding: 0 8px;
  border-radius: 3px;
  font-size: 10px;
  line-height: 18px;
  background: #393a3e;
  color: #fff;
}

.txt-title {
  // text-align: left;
}
</style>
