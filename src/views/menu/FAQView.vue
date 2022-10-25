<template>
  <div class="home-container">
    <h2 class="tit_g">FAQ</h2>
    <span class="txt_info"
      >궁금한 점 및 자세한 내용은 아래 FAQ를 참고해주세요.</span
    >
    <ul class="list_navi" :class="{ navi_fixed: is_fixed }">
      <!-- active시 .on 추가 -->
      <li
        @click="item.click"
        :class="item.class"
        v-for="(item, index) in list_navi"
        :key="index"
      >
        <a class="link_navi" :href="item.href">{{ item.title }}</a>
      </li>
    </ul>

    <!-- 가입 계정 -->
    <div class="box_faq">
      <div class="faq_empty" id="Join"></div>
      <h3 class="tit_faq">가입/계정</h3>
      <dl class="list_faq">
        <dt>
          <span class="ico_emoticon question">Q</span>
          다이어리 이모티콘 스튜디오는 어떻게 가입하나요?
        </dt>
        <dd>
          <span class="ico_emoticon answer">A</span>
          다이어리 이모티콘 스튜디오를 이용하려면 반드시 다이어리 계정이
          필요합니다.
          <br />
          개인인 경우 반드시 본인의 다이어리 계정을 사용해주세요. <br />
          스튜디오 가입 시 사용한 다이어리 계정으로 '다이어리 이모티콘
          스튜디오'에서 제안, 계약, 상품화, 정산 등을 진행하게 됩니다. <br />
          가입 이후 다이어리 계정의 변경은 불가하니 유의해주세요.<br /><br />
          1. 다이어리 이모티콘 스튜디오 우측 상단 '마이스튜디오'를 눌러 다이어리
          계정을 입력하여 로그인하세요. <br />
          2. 각 항목의 내용을 확인하고 기본 정보를 입력하세요.<br />
          3. ‘가입하기’를 눌러주세요.
        </dd>

        <dt>
          <span class="ico_emoticon question">Q</span>
          다이어리 계정 및 비밀번호를 분실했어요.
        </dt>
        <dd>
          <span class="ico_emoticon answer">A</span>
          로그인 화면 우측 하단의 ‘다이어리 계정’ 및 ‘비밀번호 찾기’를 눌러
          계정을 확인하거나 비밀번호를 변경할 수 있습니다.
        </dd>
        <dt>
          <span class="ico_emoticon question">Q</span>
          다이어리 이모티콘 스튜디오 가입 시 계정 정보는 어떻게 입력하나요?
        </dt>
        <dd>
          <span class="ico_emoticon answer">A</span>
          올바른 계정을 사용하여 로그인 하신 뒤 계정 정보를 입력할 때, 이모티콘
          제안이 처음인 경우 '제안자' 유형을 선택해주세요. <br />
          기본 정보의 이름은 개인인 경우 본명으로, 사업자의 경우 사업자명으로
          기재해주셔야 합니다. <br />
          기본 정보에 입력해주신 휴대폰 번호와 이메일 주소로 안내 사항이
          발송되니 반드시 정확하게 기재해주세요. <br />
          국내 휴대폰 번호가 없을 경우 임의로 작성해주시되 해외 거주자는 계약
          진행이 불가한 점 참고 부탁드립니다.
        </dd>
        <dt>
          <span class="ico_emoticon question">Q</span>
          다이어리 이모티콘 스튜디오 가입 시 사용한 다이어리 계정을 변경할 수
          있나요?
        </dt>
        <dd>
          <span class="ico_emoticon answer">A</span>
          다이어리 이모티콘 스튜디오에 가입한 다이어리 계정을 다른 다이어리
          계정으로 변경하거나 여러 개의 다이어리 계정을 하나로 통합할 수
          없습니다. <br />
          처음 다이어리 이모티콘 스튜디오에 가입할 때 반드시 올바른 계정을
          사용하여 가입해주세요.
        </dd>
      </dl>
    </div>
    <!-- 제안 -->
    <div class="box_faq">
      <div class="faq_empty" id="Suggest"></div>
      <h3 class="tit_faq">제안</h3>
      <dl class="list_faq">
        <dt>
          <span class="ico_emoticon question">Q</span>
          이모티콘 제안을 위한 상세 조건을 알고 싶습니다.
        </dt>
        <dd>
          <span class="ico_emoticon answer">A</span>
          국내 거주자이면서 국내 계좌를 보유중이라면 누구나 이모티콘을 제안할 수
          있습니다.
          <span class="faq_detail">
            ※ 단, 다른 사람이 보유한 콘텐츠에 대한 이모티콘을 제안할 수 없으며,
            본인이 제작하거나 저작권을 보유한 콘텐츠로만 제안가능합니다. <br />
            ※ 제안을 위해서는 다이어리 계정이 필요합니다. 다이어리 계정으로
            로그인 후 제안해주세요.</span
          >
        </dd>
        <dt>
          <span class="ico_emoticon question">Q</span>이모티콘을 제안하면 바로
          판매할 수 있나요?
        </dt>
        <dd>
          <span class="ico_emoticon answer">A</span>
          모든 이모티콘은 제안&gt; 심사&gt; 상품화&gt; 출시 단계를 거쳐야만 최종
          판매가 가능합니다. <br />
          심사 완료 후, ‘승인된’ 제안에 한해 상품화 작업 후 판매할 수 있습니다.
        </dd>
        <dt>
          <span class="ico_emoticon question">Q</span>
          이모티콘 제안 시 정해진 크기와 개수가 있나요?
        </dt>
        <dd>
          <span class="ico_emoticon answer">A</span>
          제안 스펙에 해당하는 정해진 크기와 개수는 제안하는 스튜디오 및
          이모티콘의 상품 유형(움직이는 이모티콘, 멈춰있는 이모티콘,
          큰이모티콘)에 따라 <br />
          달라집니다. 제안 전 제작 가이드를 반드시 확인하고 제안해주세요.
        </dd>
        <dt>
          <span class="ico_emoticon question">Q</span>
          이모티콘 시안 제출 시 주의사항이 있을까요?
        </dt>
        <dd>
          <span class="ico_emoticon answer">A</span>
          미풍양속을 해치는 콘텐츠 및 불쾌감을 유발할 수 있는 이모티콘은 출시를
          제한하고 있습니다. 비즈니스 및 광고 목적의 이모티콘도 입점이
          제한됩니다. <br />
          또한 다른 사람이 보유한 콘텐츠에 대한 이모티콘을 제안할 수 없으며,
          본인이 제작하거나 저작권을 보유한 콘텐츠로만 제안 가능합니다.
        </dd>
        <dt>
          <span class="ico_emoticon question">Q</span>
          제출한 이모티콘을 수정하거나 삭제하고 싶습니다.
        </dt>
        <dd>
          <span class="ico_emoticon answer">A</span>
          제안하신 이모티콘은 제출 후 수정 및 삭제가 불가합니다.<br />
          잘못 제출한 경우 다시 제안하시면 가장 최근에 제출된 제안으로 심사가
          진행됩니다. <br />
          다만, 가능한 한 제안을 제출하기 전 잘못된 부분이 있는지 확인 후
          제출하시기를 권장합니다.
        </dd>
        <dt>
          <span class="ico_emoticon question">Q</span>
          이모티콘 제안 시 이모티콘 정보는 반드시 기재해야 하나요?
        </dt>
        <dd>
          <span class="ico_emoticon answer">A</span>
          상품명, 시리즈명, 작가명, 이모티콘 설명은 필수기재 사항입니다. <br />
          아래 메뉴에서 안내 드리고 있는 상세 설명을 확인해 작성해주세요.
          <br /><br />
          - 이모티콘 제안 &gt; 제안하기 &gt; 신규 제안 &gt; 이모티콘 정보
        </dd>
      </dl>
    </div>
    <!-- 저작권 -->
    <div class="box_faq">
      <div class="faq_empty" id="Copyright"></div>
      <h3 class="tit_faq">저작권</h3>
      <dl class="list_faq">
        <dt>
          <span class="ico_emoticon question">Q</span>
          저작권 및 상표권을 침해하는 경우 어떻게 되나요?
        </dt>
        <dd>
          <span class="ico_emoticon answer">A</span>
          저작권 및 상표권 등 타인의 권리를 침해할 수 있는 이모티콘 제안의 경우
          입점이 불가하며, 입점된 이후라도 판매가 중단될 수 있습니다.
        </dd>
        <dt>
          <span class="ico_emoticon question">Q</span>
          제안 전 저작권 등록을 해야 하나요?
        </dt>
        <dd>
          <span class="ico_emoticon answer">A</span>
          저작권 등록이 필수 요건은 아닙니다. 저작권은 저작물(인간의 사상 또는
          감정을 표현한 창작물)이 창작되는 즉시 권리가 발생하기 때문입니다.
        </dd>
        <dt>
          <span class="ico_emoticon question">Q</span>
          이모티콘 출시 시 저작권은 다이어리가 소유하나요?
        </dt>
        <dd>
          <span class="ico_emoticon answer">A</span>
          다이어리는 출시된 이모티콘의 콘텐츠를 활용하여 디지털 아이템을
          사용/판매할 수 있는 권한만을 보유합니다. <br />
          다이어리는 콘텐츠 저작권을 보유하지 않으며 모든 콘텐츠는 기존 저작권을
          보유한 개인 또는 사업자에게 있습니다.
        </dd>
      </dl>
    </div>
    <!-- 심사 -->
    <div class="box_faq">
      <div class="faq_empty" id="Evaluate"></div>
      <h3 class="tit_faq">심사</h3>
      <dl class="list_faq">
        <dt>
          <span class="ico_emoticon question">Q</span>
          심사 기간은 얼마나 소요되나요?
        </dt>
        <dd>
          <span class="ico_emoticon answer">A</span>
          심사 기간은 보통 2 ~ 4주 정도 소요되며, 제휴 및 이모티콘 제안이
          폭증하는 기간에는 답변이 다소 지연될 수 있습니다.<br />
          모든 제안을 꼼꼼히 검토하는 과정이 필요하므로, 다소 시간이 걸리더라도
          조금만 기다려주시면 심사 결과에 대한 답변을 받아보실 수 있습니다.
        </dd>
        <dt>
          <span class="ico_emoticon question">Q</span>
          이모티콘 제안 미승인 사유에 대해 알고 싶습니다.
        </dt>
        <dd>
          <span class="ico_emoticon answer">A</span>
          제안해주신 이모티콘은 다이어리 이모티콘의 세분화된 매뉴얼에 따라
          심사가 진행됩니다.<br />
          매뉴얼에 대한 부분은 크리에이티브를 제한하거나, 시장 편항적으로 제안을
          한정시킬 가능성이 있어 대외비로 진행하며, <br />
          개별 미승인 사유에 대한 세부 내용 또한 공개하지 않습니다. 양해
          부탁드립니다.&nbsp;
        </dd>
        <dt>
          <span class="ico_emoticon question">Q</span>
          이모티콘 제안 미승인 시, 다시 제안할 수 있나요?
        </dt>
        <dd>
          <span class="ico_emoticon answer">A</span>
          기존 이모티콘 시안을 변형 또는 개선하거나 새로운 이모티콘 시안으로
          언제든지 자유롭게 다시 제안하실 수 있습니다.<br />
          단, 기존 이모티콘 시안의 경우 변경된 부분이 적거나 동일한 시안으로
          재제안할 경우 심사 대상에서 제외될 수 있습니다.
        </dd>
      </dl>
    </div>
    <!-- 상품화 -->
    <div class="box_faq">
      <div class="faq_empty" id="Commercialize"></div>
      <h3 class="tit_faq">상품화</h3>
      <dl class="list_faq">
        <dt>
          <span class="ico_emoticon question">Q</span>
          이모티콘 상품화 과정에서는 어떤 것들이 진행되나요?
        </dt>
        <dd>
          <span class="ico_emoticon answer">A</span>
          이모티콘 상품화는 제안된 이모티콘 시안을 개발하고, 정해진 완전한
          이모티콘 상품(움직이는 이모티콘 24종, 멈춰있는 이모티콘 32종,
          큰이모티콘 16종)으로 만드는 과정입니다. 이모티콘 유형별 추가 작업은
          아래와 같습니다. <br /><br />
          - 움직이는 이모티콘: 24개 이미지에 대한 애니메이션 작업 <br />
          - 멈춰있는 이모티콘: 32개 이미지에 대한 상품화 작업 <br />
          - 큰이모티콘: 16개 이미지에 대한 애니메이션 작업<br /><br />
          그 외 상품화 작업 시 추가 수정이 필요한 부분은 아래와 같습니다.
          <br /><br />
          - 이모티콘으로써 적합하지 않은 메시지 수정 <br />
          - 디바이스 테스트: 모바일 화면에서 잘 보이지 않거나 부자연스러운 부분
          수정 <br /><br />
          위 내용에 대하여 이모티콘 상품화 담당자가 승인된 제안자에 안내드릴
          예정입니다.
        </dd>
        <dt>
          <span class="ico_emoticon question">Q</span>
          이모티콘 상품화 기간은 얼마나 소요되나요?
        </dt>
        <dd>
          <span class="ico_emoticon answer">A</span>
          상품화 과정은 평균적으로 1 ~ 3개월 정도 소요되며, 상품 유형 및
          제안자분들의 상품화 작업 대응 속도에 따라 달라지게 됩니다. <br />
          상품화 과정에서 제안자분들의 빠른 대응은 상품 출시까지의 일정을 줄일
          수 있습니다.
        </dd>
      </dl>
    </div>
    <!-- 출시 -->
    <div class="box_faq">
      <div class="faq_empty" id="Release"></div>
      <h3 class="tit_faq">출시</h3>
      <dl class="list_faq">
        <dt>
          <span class="ico_emoticon question">Q</span>
          다이어리 이모티콘으로 출시 후 판매되면, 제작자에게는 판매 수익이
          지급되나요?
        </dt>
        <dd>
          <span class="ico_emoticon answer">A</span>
          제작자에게는 판매된 이모티콘의 수익을 일정 비율로 지급합니다. <br />
          자세한 내용 및 정산 방법에 대해서는 승인된 제안자에 한해 계약 진행 시
          상세히 안내됩니다.
        </dd>
        <dt>
          <span class="ico_emoticon question">Q</span>
          이모티콘 스토어 출시를 위해 필요한 별도 비용이 있나요?
        </dt>
        <dd>
          <span class="ico_emoticon answer">A</span>
          이모티콘 출시에는 비용이 들지 않습니다.
        </dd>
      </dl>
    </div>
    <!-- 계약/정산 -->
    <div class="box_faq">
      <div class="faq_empty" id="Contract"></div>
      <h3 class="tit_faq">계약/정산</h3>
      <dl class="list_faq">
        <dt>
          <span class="ico_emoticon question">Q</span>
          이모티콘 출시 및 판매를 위한 계약은 언제 체결하나요?
        </dt>
        <dd>
          <span class="ico_emoticon answer">A</span>
          다이어리 이모티콘 스튜디오에 등록하신 제안이 최초로 승인된 시점에
          다이어리와 계약을 체결하게 됩니다.
        </dd>
        <dt>
          <span class="ico_emoticon question">Q</span>
          계약을 체결하려면 반드시 사업자등록증이 필요한가요?
        </dt>
        <dd>
          <span class="ico_emoticon answer">A</span>
          사업자 등록이 계약 체결의 필수 요건은 아닙니다. <br />
          개인, 사업자(개인/법인) 중 제안자의 상황에 맞춰 계약을 체결할 수
          있습니다.
        </dd>
        <dt>
          <span class="ico_emoticon question">Q</span>
          해외 거주자도 계약할 수 있나요?
        </dt>
        <dd>
          <span class="ico_emoticon answer">A</span>
          이모티콘 판매 정산을 위해서는 국내에 주소를 두거나 183일 이상의 거소를
          둔 '거주자'이면서 한국 계좌를 보유하고 있어야 합니다. <br />
          비거주자 또는 해외 사업자의 경우 계약을 진행할 수 없는 점 양해
          부탁드립니다.
        </dd>
        <dt>
          <span class="ico_emoticon question">Q</span>
          이모티콘의 판매 수익은 어떻게 확인할 수 있나요?
        </dt>
        <dd>
          <span class="ico_emoticon answer">A</span>
          이모티콘이 출시되면 ‘상품 통계’ 메뉴에서 판매 익일부터 판매 현황 및
          이모티콘 플러스 발신 현황을 확인하실 수 있으며, <br />
          최종 판매 수익은 익월 5영업일 기준 '정산 관리'에서 확인하실 수
          있습니다. <br />
          <span class="faq_detail"
            >※ ‘상품 통계’ 및 ‘정산 관리’ 메뉴는 계약자에 한해 이용할 수
            있습니다.</span
          >
        </dd>
      </dl>
    </div>
    <!-- 기타 -->
    <div class="box_faq">
      <div class="faq_empty" id="Others"></div>
      <h3 class="tit_faq">기타</h3>
      <dl class="list_faq">
        <dt>
          <span class="ico_emoticon question">Q</span>
          다이어리 이모티콘 스튜디오의 권장 사용 환경을 알려주세요.
        </dt>
        <dd>
          <span class="ico_emoticon answer">A</span>
          쾌적한 사용을 위해 Windows/Mac의 크롬(Chrome) 최신 버전을
          사용해주세요.<br />
          PC만 지원하며, 태블릿PC, 스마트폰 등의 기타 기기는 지원하지 않습니다.
        </dd>
        <dt>
          <span class="ico_emoticon question">Q</span>
          무료로 이모티콘을 배포할 수 있나요?
        </dt>
        <dd>
          <span class="ico_emoticon answer">A</span>
          다이어리 이모티콘 스튜디오에서는 무료 이모티콘 제안을 받지
          않습니다.<br />
        </dd>
      </dl>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  onUnmounted,
  ref,
} from '@vue/composition-api';

export default defineComponent({
  name: 'FAQView',
  components: {},
  setup() {
    function onClick(e: Event) {
      const target = e.target as HTMLElement;

      const parent = target.parentElement as HTMLElement;

      const grand = parent.parentElement as HTMLElement;

      for (let element of grand.children) {
        if (element.nodeName == 'LI') {
          element.className = '';
        }
      }

      parent.className = 'on';
    }

    const list_navi = [
      {
        href: '#Join',
        title: '가입/계정',
        class: 'on',
        click: onClick,
      },
      {
        href: '#Suggest',
        title: '제안',
        class: '',
        click: onClick,
      },
      {
        href: '#Copyright',
        title: '저작권',
        class: '',
        click: onClick,
      },
      {
        href: '#Evaluate',
        title: '심사',
        class: '',
        click: onClick,
      },
      {
        href: '#Commercialize',
        title: '상품화',
        class: '',
        click: onClick,
      },
      {
        href: '#Release',
        title: '출시',
        class: '',
        click: onClick,
      },
      {
        href: '#Contract',
        title: '계약/정산',
        class: '',
        click: onClick,
      },
      {
        href: '#Others',
        title: '기타',
        class: '',
        click: onClick,
      },
    ];

    const is_fixed = ref(false);

    function onHandleScroll(e: Event) {
      const scrollY = window.scrollY;

      if (scrollY > 129) {
        is_fixed.value = true;
      } else {
        is_fixed.value = false;
      }
    }

    onMounted(() => {
      document.addEventListener('scroll', onHandleScroll);
    });

    onUnmounted(() => {
      document.removeEventListener('scroll', onHandleScroll);
    });

    return {
      list_navi,
      is_fixed,
    };
  },
});
</script>

<style lang="scss" scoped>
.home-container {
  width: 100%;
  height: 100%;

  padding: 0 30px;

  box-sizing: border-box;
}

.tit_g {
  display: block;
  color: #2d2e32;
  font-weight: 400;

  margin: 7px 0 10px;
  font-size: 46px;
  line-height: 1.5;

  text-align: left;
}

.txt_info {
  display: block;
  margin-bottom: 32px;
  font-size: 16px;

  text-align: left;
  color: #2d2e32;
  font-weight: 500;
}

.navi_fixed {
  position: fixed;
  width: 1040px;
  top: 60px;

  margin: 0 auto;
  background-color: #fcfcfc;
  z-index: 1;
  border-bottom: 1px solid #dfdfe0;
}

.list_navi {
  display: flex;
  justify-content: space-between;
  overflow: hidden;
  padding: 18px 0 14px;

  li {
    position: relative;
    list-style: none;
    margin: 0;
    padding: 0;

    .link_navi {
      display: inline-block;
      padding: 6px 18px 9px;
      color: #6c6d70;
      font-size: 20px;
      line-height: 29px;
    }
  }
}

a {
  cursor: pointer;
  text-decoration: none;
}

.list_navi li.on .link_navi {
  background-color: #e6e6e6;
  border-radius: 22px;
  color: #2d2e32;
  font-family: NotoSans-medium, sans-serif;
  font-weight: bold;
}

.box_faq {
  position: relative;
  overflow: hidden;
  padding-top: 53px;
  padding-bottom: 60px;
  border-color: #e4e4e4;
  border-top: 1px solid #dfdfe0;

  .faq_empty {
    position: absolute;
    height: 0;
    width: 100%;
    top: -142px;
  }

  .tit_faq {
    float: left;
    text-align: left;
    width: 195px;
    font-size: 38px;
    line-height: 50px;
    font-family: 'NotoSans-Thin';
    font-weight: normal;

    margin: 0;
  }

  .list_faq {
    overflow: hidden;
    padding: 4px 0 0 0;
    list-style: none;
    margin: 0;

    font-size: 13px;
    line-height: 1.5;
    font-family: 'NotoSans-DemiLight', sans-serif;
    color: #2d2e32;

    text-align: left;

    dt {
      margin: 54px 0 13px 0;
      font-size: 18px;
      font-family: 'NotoSans-Medium';
      font-weight: bold;
      padding: 0 20px 0 39px;

      &:first-child {
        margin-top: 0;
      }
    }
  }

  dd,
  dt {
    display: block;
    position: relative;
    word-break: break-all;

    padding-block-start: 0;
    min-height: 27px;
  }

  .ico_emoticon {
    position: absolute;
    top: 2px;
    left: 0;
    width: 25px;
    height: 25px;

    font-size: 16px;

    text-indent: 6px;

    border-radius: 50%;

    color: #fff;
  }

  .question {
    background: #fcd209;
  }

  .answer {
    background: #2d2e32;

    left: -39px;
    text-indent: 7px;
  }
}
</style>
