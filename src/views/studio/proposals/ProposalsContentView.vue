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
          <td>{{ matched(proposal.id).confirmMatched }}</td>
          <td>{{ proposal.product_name }}</td>
          <td>{{ matched(proposal.id).createAtToMoment }}</td>
        </tr>
      </tbody>
    </table>

    <div class="wrap-paging">
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
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from '@vue/composition-api';
import stores from '@/stores';
import router from '@/router';
import { storeToRefs } from 'pinia';
import { Proposal } from '@/types/proposal';
import proposalComposalble from '@/composables/proposal';
import moment from 'moment';

export default defineComponent({
  name: 'ProposalsContentView',
  setup() {
    const { proposalsInfo, proposalPage } = storeToRefs(stores.store);

    const proposals = computed(() => proposalsInfo.value);
    const copy_proposals = ref([...proposals.value]);

    const matched = (id: number) => {
      const { confirmMatched, createdAt } = proposalComposalble(id);

      const createAtToMoment = moment(createdAt.value).format('YYYY-MM-DD');

      return {
        confirmMatched: confirmMatched.value,

        createAtToMoment,
      };
    };

    const onChange = (e: Event) => {
      const target = e.target as HTMLInputElement;

      function copy(array: Proposal[]) {
        copy_proposals.value = [...array];
      }

      function matched(match_confirm: number) {
        return proposals.value.filter((proposal) => {
          const is_confirm = proposal.is_confirm;

          if (is_confirm == match_confirm) return proposal;
        });
      }

      switch (target.value) {
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

    function onArrowPage({ currentTarget }: Event) {
      const target = currentTarget as HTMLElement;
      const { nodeName } = target;

      if (nodeName == 'SPAN') {
        const title = target.title;

        switch (title) {
          case 'left':
            if (proposalPage.value.page > 1) {
              proposalPage.value.page = proposalPage.value.page - 1;
            }
            break;
          case 'right':
            if (proposalPage.value.page < proposalPage.value.totalPage) {
              proposalPage.value.page = proposalPage.value.page + 1;
            }
            break;
        }
      }
    }

    function onChangePage(e: Event, index: number) {
      proposalPage.value.page = index;
    }

    return {
      proposals: copy_proposals,
      matched,
      onChange,
      onClick,
      onChangePage,
      totalPage: proposalPage.value.totalPage,
      page: proposalPage.value.page,
      onArrowPage,
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

.table-view {
  height: 100%;
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

.wrap-paging {
  overflow: hidden;

  text-align: center;

  margin-top: 30px;
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
