<template>
  <div class="table-view">
    <div class="box-dropdown">
      <select id="dropdown" name="dropdown" @change="onChange">
        <option value="ALL" selected>전체</option>
        <option value="SUBMISSION_COMPLETE">제출완료</option>
        <option value="UNDER_REVIEW">심사중</option>
        <option value="NOT_APPROVED">미승인</option>
        <option value="APPROVED">승인</option>
      </select>

      <span>{{ proposals.length }}건 </span>
    </div>

    <table @click="onClick">
      <thead>
        <tr>
          <th>번호</th>
          <th>제안상태</th>
          <th>이모티콘 상품명</th>
          <th>제안일</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(proposal, index) in proposals" :key="index">
          <td>{{ proposal.id }}</td>
          <td>{{ proposal.is_confirm }}</td>
          <td>{{ proposal.product_name }}</td>
          <td>{{ proposal.createdAt }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from '@vue/composition-api';
import { useStore } from '@/services/pinia/store';
import router from '@/router';
import { IsConfirm2, ProposalsMatchedInfo } from '@/types/proposals';

export default defineComponent({
  name: 'ProposalsTableView',
  setup() {
    const store = useStore();

    const proposals = computed(() => store.confirmTableMatched);
    const copy_proposals = ref([...proposals.value]);

    const onChange = (e: any) => {
      function copy(array: ProposalsMatchedInfo[]) {
        copy_proposals.value = [...array];
      }

      function matched(match_confirm: number) {
        return proposals.value.filter((proposal) => {
          const is_confirm = proposal.is_confirm as string;

          if (is_confirm == IsConfirm2[match_confirm]) return proposal;
        });
      }

      switch (e.target.value) {
        case 'ALL':
          copy(proposals.value);
          break;
        case 'SUBMISSION_COMPLETE':
          copy(matched(0));
          break;
        case 'UNDER_REVIEW':
          copy(matched(1));
          break;
        case 'NOT_APPROVED':
          copy(matched(2));
          break;
        case 'APPROVED':
          copy(matched(3));
          break;
      }
    };

    const onClick = (e: Event) => {
      const target = e.target as HTMLElement;

      function tdClick(td: HTMLTableCellElement) {
        const tr = td.parentNode;

        if (tr) {
          const id = (tr.children[0] as any).innerText;

          router.push({
            name: 'proposal',
            params: {
              id,
            },
          });
        }
      }

      const td = target.closest('td');

      if (!td) return;

      tdClick(td);
    };

    return {
      proposals: copy_proposals,
      onChange,
      onClick,
    };
  },
});
</script>

<style lang="scss" scoped>
.box-dropdown {
  text-align: left;

  font-size: 13px;

  font-weight: normal;

  color: #000;

  margin-top: 30px;
}

#dropdown {
  border: none;

  cursor: pointer;

  direction: rtl;
}
.table-view > table {
  width: 100%;
  margin-top: 50px;

  border-top: 2px solid #000;

  border-spacing: 0;

  border-bottom: 2px solid rgb(202, 202, 202);

  table-layout: fixed;
}

.table-view > table > thead {
  background-color: rgb(170, 170, 170, 0.3);
}

.table-view > table > thead > tr > th {
  font-size: 15px;

  font-weight: bold;

  padding: 10px;

  color: #000;

  border-bottom: 1px solid #000;
}

.table-view > table > tbody > tr {
  cursor: pointer;
}

.table-view > table > tbody > tr:hover {
  background-color: rgba(#666, 0.1);
}

.table-view > table > tbody > tr > td {
  font-size: 15px;

  padding: 10px;

  color: #000;
}
</style>
