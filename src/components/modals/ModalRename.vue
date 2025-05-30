<template>
  <ModalLayout>
    <div>
      <ModalHeader :icon="RenameSVG" :title="t('Rename')"></ModalHeader>
      <div class="vuefinder__rename-modal__content">
        <div class="vuefinder__rename-modal__item">
          <p class="vuefinder__rename-modal__item-info">
            <svg
              v-if="item.type === 'dir'"
              class="vuefinder__rename-modal__icon vuefinder__rename-modal__icon--dir"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="1"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
              />
            </svg>
            <svg
              v-else
              class="vuefinder__rename-modal__icon"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="1"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
              />
            </svg>
            <span class="vuefinder__rename-modal__item-name">{{
              item.basename
            }}</span>
          </p>
          <input
            v-model="name"
            @keyup.enter="rename"
            class="vuefinder__rename-modal__input"
            placeholder="Name"
            type="text"
          />
          <message v-if="message.length" @hidden="message = ''" error>{{
            message
          }}</message>
        </div>
      </div>
    </div>

    <template v-slot:buttons>
      <button type="button" @click="rename" class="vf-btn vf-btn-primary">
        {{ t("Rename") }}
      </button>
      <button
        type="button"
        @click="app.modal.close()"
        class="vf-btn vf-btn-secondary"
      >
        {{ t("Cancel") }}
      </button>
    </template>
  </ModalLayout>
</template>

<script setup>
import ModalLayout from "./ModalLayout.vue";
import { inject, ref } from "vue";
import Message from "../Message.vue";
import ModalHeader from "./ModalHeader.vue";
import RenameSVG from "../icons/rename.svg";

const app = inject("ServiceContainer");
const { t } = app.i18n;

const item = ref(app.modal.data.items[0]);
const name = ref(app.modal.data.items[0].basename);
const message = ref("");

const rename = () => {
  if (name.value != "") {
    app.emitter.emit("vf-fetch", {
      params: {
        q: "rename",
        m: "post",
        adapter: app.fs.adapter,
        path: app.fs.data.dirname,
      },
      body: {
        item: item.value.path,
        name: name.value,
      },
      onSuccess: () => {
        app.emitter.emit("vf-toast-push", {
          label: t("%s is renamed.", name.value),
        });

        app.emitter.emit("vf-fetch", {
          params: {
            q: "index",
            adapter: app.fs.adapter,
            path: app.fs.data.dirname,
          },
        });
      },
      onError: (e) => {
        message.value = t(e.message);
      },
    });
  }
};
</script>
