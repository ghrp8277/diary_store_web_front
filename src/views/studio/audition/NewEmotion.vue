<template>
  <div class="new-emotion">
    <h1 class="new-title">
      신규 제안
      <span>
        <em class="em-info">필수 입력 항목입니다.</em>
      </span>
    </h1>

    <form
      class="new-form"
      @submit.prevent="submit"
      enctype="multipart/form-data"
    >
      <div class="form-1">
        <strong class="form-title">이모티콘 정보</strong>

        <div class="form-item">
          <label for="product-name">이모티콘 상품명 <span>●</span></label>
          <input
            id="product-name"
            name="product_name"
            type="text"
            placeholder="상품명을 2~22자 내로 입력해 주세요."
          />
        </div>

        <div class="form-item">
          <label for="category">이모티콘 카테고리 <span>●</span></label>

          <select
            v-model="select_category"
            id="category"
            name="category"
            @change="onChange"
          >
            <option value="" disabled selected>카테고리 선택</option>
            <option
              v-for="(category, index) in categories"
              :key="index"
              :value="category.category_value"
            >
              {{ category.category_name }}
            </option>
          </select>
        </div>

        <div class="form-item" style="position: relative">
          <label for="tag">이모티콘 태그<span>●</span></label>
          <input
            id="tag"
            name="tag"
            type="text"
            v-model="select_tags"
            placeholder="제시된 태그 중 1개의 태그를 선택해 주세요."
            @focus="isTagFocus = true"
            :disabled="isTagDisabled"
            readonly
          />

          <tag-box
            v-if="isTagFocus"
            @onSelectTag="onSelectTag"
            @onTagMessage="onTagMessage"
            @onClear="onClear"
            :category_value="select_category"
          />
        </div>

        <div
          class="form-item"
          :style="[isTagFocus ? { 'margin-top': '40px' } : {}]"
        >
          <label for="author-name">작가명<span>●</span></label>
          <input
            id="author-name"
            name="author_name"
            type="text"
            placeholder="작가명을 한글 1~15자 내로 입력해 주세요."
          />
        </div>

        <div class="form-item">
          <label for="comment">이모티콘 설명<span>●</span></label>
          <textarea
            id="comment"
            name="comment"
            cols="50"
            rows="5"
            placeholder="이모티콘 제작 컨셉 혹은 캐릭터에 대한 설명을 작성해 주세요."
            @keyup="typing"
          ></textarea>
        </div>
        <div class="text-count">
          <span>{{ commentCnt }}</span
          >/200자
        </div>
      </div>

      <!-- 이모티콘 시안 -->
      <div class="form-2">
        <strong class="form-title"
          >이모티콘 시안<em class="em-info" style="font-size: 20px"
            >(필수)</em
          ></strong
        >

        <div class="info-design">
          <span class="txt-guide" style="margin-left: -23px"
            >이미지 형식 :
            <em class="emph-guide first-emph">PNG(배경투명, 18종)</em></span
          >
          <span class="txt-guide"
            >이미지 개수 : <em class="emph-guide">총 18종 필수</em></span
          >
          <span class="txt-guide"
            >이미지 사이즈 : <em class="emph-guide">360X360(px)</em></span
          >
        </div>

        <ul class="image-files">
          <li
            class="file-box"
            v-for="(file, index) in files"
            :key="index"
            @click="void 0"
          >
            <div class="file-count">
              {{ index + 1 }}

              <span class="btn-file-del" @click="onFileInit($event, index)"
                >X</span
              >
            </div>
            <font-awesome-icon
              v-if="!file.src"
              class="file-icon"
              icon="fa-image"
            />
            <img v-else class="upload-img" :src="file.src" />
            <label class="btn-file"
              >찾아보기
              <input
                type="file"
                :id="`file_${index}`"
                :name="index"
                accept="image/*"
                @change="uploadImage"
            /></label>
            <span class="file-bg-hover"></span>
          </li>
        </ul>
      </div>

      <button class="btn-submit">제출하기</button>
    </form>

    <message-box v-if="isShow" @closeBox="closeBox">
      <message-box-content
        slot="content"
        :message="message"
        @closeBox="closeBox"
      />
    </message-box>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  reactive,
  ref,
  watch,
} from '@vue/composition-api';
import { fetchEmojiUpload } from '@/apis/store';
import MessageBox from '@/components/MessageBox.vue';
import TagBox from '@/components//TagBox.vue';
import MessageBoxContent from '@/components/message/MessageContent.vue';
import stores from '@/stores';
import { storeToRefs } from 'pinia';
import { EmojiTag } from '@/types/emojiTag';
import { EmojiCategory } from '@/types/emojiCategory';
import { fetchCategoriesInfo } from '@/apis/store';

export default defineComponent({
  name: 'NewEmotionView',
  components: {
    MessageBox,
    MessageBoxContent,
    TagBox,
  },
  setup() {
    const { username } = storeToRefs(stores.main);

    const isShow = ref(false);
    const message = ref('');
    const files = reactive<{ src: string; file: any }[]>([]);
    const commentCnt = ref(0);
    const isTagDisabled = ref(true);

    const categories = ref<EmojiCategory[]>([]);
    const select_category = ref('');
    const select_tags = ref('');
    const tags = ref<EmojiTag[]>([]);
    const isTagFocus = ref(false);

    // 이미지 사이즈 체크
    async function imageSizeCheck(result: string) {
      let img = new Image();
      img.src = result;

      function sizeCheck() {
        const width = img.width;
        const height = img.height;

        if (width == 360 && height == 360) return true;
        else return false;
      }

      function onloadPromise() {
        return new Promise((resolve) => {
          img.onload = () => resolve(sizeCheck());
        });
      }

      return await onloadPromise();
    }

    // 이미지 미리보기
    function readImage(file: File, index: number, target: HTMLInputElement) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        if (e.target && e.target.DONE) {
          const result = e.target.result as string;

          // 파일 사이즈 체크
          imageSizeCheck(result).then((isCheck) => {
            if (isCheck) {
              files[index].src = result;
              files[index].file = file;
            } else {
              target.value = '';

              isShow.value = true;
              message.value = '이미지 사이즈를 확인해주세요.';
            }
          });
        }
      };
    }

    // 이미지 업로드
    function uploadImage(e: InputEvent) {
      e.preventDefault();
      const target = e.target as HTMLInputElement;

      if (target.files) {
        const index = parseInt(target.name);
        const file = target.files[0];

        // 파일 크기 체크
        if (1024 * 150 < file.size) {
          isShow.value = true;
          message.value = `${file.name} 이미지 크기가 너무 큽니다. 최대 이미지 크기는 150kb 입니다.`;
          // file reset
          target.value = '';
        } else {
          // 이미지 미리보기 설정
          readImage(file, index, target);
        }
      }
    }

    function inputValueSizeCheck(
      size1 = 1,
      size2: number,
      cnt: number,
      label: string,
    ): boolean {
      if (size1 <= cnt && size2 >= cnt) return true;

      isShow.value = true;
      message.value = `${label}을(를) ${size1} ~ ${size2}자 내로 입력해 주세요.`;

      return false;
    }

    async function submit(e: Event) {
      const target = e.target as HTMLFormElement;

      const form_data = {
        product_name: target.product_name.value,
        author_name: target.author_name.value,
        category: target.category.value,
        tag: target.tag.value,
        comment: target.comment.value,
      };

      if (
        inputValueSizeCheck(2, 22, form_data.product_name.length, '상품명') &&
        inputValueSizeCheck(1, 15, form_data.tag.length, '이모티콘 태그') &&
        inputValueSizeCheck(1, 15, form_data.author_name.length, '작가명') &&
        inputValueSizeCheck(1, 200, form_data.comment.length, '이모티콘 설명')
      ) {
        const formdata = new FormData();
        formdata.append('form-data', JSON.stringify(form_data));
        files.forEach((file) => {
          if (file.file) formdata.append('files', file.file);
        });

        // 이미지 파일 개수 체크
        if (formdata.getAll('files').length >= 18) {
          // 이미지 파일명 중복 체크
          if (overlapFileNameCheck()) {
            await fetchEmojiUpload(username.value, formdata);
          } else {
            isShow.value = true;
            message.value =
              '동일한 파일명을 가진 파일들은 업로드가 되지 않습니다.\n파일명을 수정하여 다시 업로드 해주세요.';
          }
        } else {
          isShow.value = true;
          message.value = `이미지 파일을 추가해 주세요 \n현재 선택된 이미지 파일 갯수: ${
            formdata.getAll('files').length
          }`;
        }
      }
    }

    function closeBox(isClose: boolean) {
      isShow.value = isClose;
    }

    function onFileInit(e: InputEvent, index: number) {
      const target = e.target as HTMLElement;

      const grf_target = target.parentNode?.parentNode;

      if (grf_target) {
        const imgTarget = grf_target.querySelector(
          '.upload-img',
        ) as HTMLImageElement;
        const fileTarget = grf_target.childNodes[2]
          .childNodes[1] as HTMLInputElement;

        if (imgTarget) {
          files[index].src = '';
          files[index].file = null;

          fileTarget.value = '';
        }
      }
    }

    function overlapFileNameCheck() {
      const jsonArr = files.map((element) => {
        if (element.file) return element.file.name;
      });

      const setCollection = new Set(jsonArr);

      const isDuplicate =
        setCollection.size - 1 == jsonArr.filter((item) => item).length;

      return isDuplicate;
    }

    function onSelectTag(tag: EmojiTag) {
      select_tags.value = select_tags.value.concat(`#${tag.tag_name}`);

      tags.value.push(tag);
    }

    function onTagMessage(result: string) {
      isShow.value = true;
      message.value = result;
    }

    function onClear(isAllClear: boolean) {
      if (isAllClear) {
        select_tags.value = '';

        tags.value.length = 0;

        tags.value = [];
      }
    }

    async function init() {
      const data = await fetchCategoriesInfo();

      categories.value = data;

      //  files 데이터 초기화
      for (let i = 0; i < 18; i++) {
        files.push({
          src: '',
          file: null,
        });
      }
    }

    onMounted(() => {
      init();
    });

    return {
      isShow,
      commentCnt,
      typing: (e: Event) => {
        const maxCnt = 200;
        const target = e.target as HTMLInputElement;
        const count = target.value.length;

        if (count > maxCnt) {
          const oldValue = target.value.substr(0, maxCnt);
          target.value = oldValue;
        } else {
          commentCnt.value = count;
        }
      },
      isTagDisabled,
      onChange: () => {
        isTagDisabled.value = false;
      },
      files,
      uploadImage,
      submit,
      message,
      closeBox,
      onFileInit,

      categories,
      select_category,
      isTagFocus,
      onSelectTag,
      select_tags,
      onTagMessage,
      onClear,
    };
  },
});
</script>

<style lang="scss" scoped>
.new-emotion {
  margin: 10px auto;

  padding: 15px 0;

  width: 700px;
}

.new-title {
  text-align: left;
  border-bottom: 1px solid black;

  padding: 0 0 10px;
}

.new-title > span {
  float: right;
}

.em-info {
  color: #ee565a;

  font-size: 13px;

  font-style: normal;
  font-weight: normal;
}

.new-form {
  text-align: center;
}

.new-form > .form-1,
.form-2 {
  margin-top: 60px;

  text-align: left;
}

.form-title {
  font-size: 23px;

  font-weight: normal;
}

// form item
.form-item {
  margin: 20px 0;

  display: flex;

  align-items: center;
}
.form-item > label {
  font-size: 13px;
  font-weight: bold;

  margin-right: 40px;
  display: inline-block;

  width: 130px;
}
.form-item > label > span {
  color: red;

  padding-inline-start: 5px;
}

.form-item > input,
select,
textarea {
  width: calc(100% - 200px);

  height: 40px;

  border: 1px solid #e4e4e4;
  background: #fcfcfc;

  color: #717274;

  padding: 0 20px;
  line-height: 17px;
}

textarea {
  height: 80px;
  resize: none;

  padding-top: 10px;
}

.text-count {
  color: #666;
  font-family: 'ht_r';
  font-size: 11px;

  position: relative;
  bottom: 15px;
  float: right;

  padding-inline-end: 20px;
}

.btn-file-del {
  display: none;
  font-size: 14px;

  float: right;

  padding-inline-end: 13px;

  transition: all 0.2s;
}

.btn-file-del:hover {
  color: #ee565a;
}

select {
  width: calc(100% - 160px);

  white-space: nowrap;

  background-image: linear-gradient(45deg, transparent 50%, gray 50%),
    linear-gradient(135deg, gray 50%, transparent 50%),
    linear-gradient(to right, #ccc, #ccc);
  background-position: calc(100% - 20px) calc(1em + 2px),
    calc(100% - 15px) calc(1em + 2px), calc(100% - 2.5em) 0.5em;
  background-size: 5px 5px, 5px 5px, 1px 1.5em;
  background-repeat: no-repeat;

  margin: 0;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-appearance: none;
  -moz-appearance: none;
}

.txt-guide {
  float: left;
  position: relative;

  color: #717274;
  letter-spacing: -0.025em;

  font-size: 13px;
}

.txt-guide {
  padding: 0 23px;
}

.info-design {
  overflow: hidden;

  margin: 32px 0;
}

.emph-guide {
  color: #2d2e32;
}

.emph-guide:not(.first-emph)::after {
  content: '';
  position: absolute;
  top: 4px;
  left: 0;
  width: 1px;
  height: 12px;
  background-color: #e4e4e4;
}

em {
  font-style: normal;
  font-weight: normal;
}

// 이미지 파일들
input[type='file'] {
  display: none;
  cursor: pointer;

  opacity: 0;

  filter: alpha(opacity=0);

  background: white;
}

.image-files {
  display: grid;

  grid-template-columns: repeat(6, 1fr);

  padding-inline-start: 0;

  margin: 0;
}

.file-box {
  width: 100%;
  height: 160px;

  border-bottom: 1px solid #e4e4e4;

  background-color: rgba(#edeff4, 0.1);

  text-align: center;

  display: flex;

  flex-direction: column;

  position: relative;
}

.file-box:nth-child(-n + 6) {
  border-top: 1px solid #e4e4e4;
}

.file-box:hover,
.file-box:focus .file-box:active {
  .btn-file {
    visibility: visible;

    z-index: 10;
  }

  .file-count {
    z-index: 10;
  }

  .btn-file-del {
    display: block;
  }

  .file-bg-hover {
    display: block;
  }
}

.file-bg-hover {
  display: none;

  background: #2d2e32;

  width: 100%;
  height: 100%;

  opacity: 0.6;

  position: absolute;
}

.file-icon {
  position: absolute;
  font-size: 30px;

  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  color: gainsboro;
}

.upload-img {
  width: 100%;
  height: calc(100% - 35px);

  top: 35px;

  position: absolute;
}

.file-count {
  display: block;
  font-size: 14px;
  text-indent: 15px;
  line-height: 35px;
  font-weight: normal;

  color: #000;
  text-align: left;
}

.btn-file {
  background-color: #fcd207;

  border: 1px solid #ffbb1b;

  font-size: 12px;
  text-align: center;

  padding: 5px 20px;

  cursor: pointer;

  position: absolute;
  left: 50%;
  top: 85%;
  transform: translate(-50%, -50%);

  height: 15px;
  width: 50px;

  visibility: hidden;
}

.btn-submit {
  background-color: #fcd207;

  border: 1px solid #ffbb1b;

  font-size: 18px;

  padding: 20px 80px;

  cursor: pointer;

  margin-top: 20px;
}
</style>
