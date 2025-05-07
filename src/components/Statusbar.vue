<template>
  <div class="vuefinder__status-bar__wrapper">
    <!-- <div class="vuefinder__status-bar__storage">
      <div class="vuefinder__status-bar__storage-container" :title="t('Storage')">
        <div class="vuefinder__status-bar__storage-icon">
          <StorageSVG/>
        </div>
        <select v-model="app.fs.adapter" @change="handleStorageSelect"
                class="vuefinder__status-bar__storage-select" tabindex="-1">
          <option v-for="storage in app.fs.data.storages" :value="storage">
            {{ storage }}
          </option>
        </select>
      </div>
      <div class="vuefinder__status-bar__info">
        <span v-if="searchQuery.length">{{ app.fs.data.files.length }} items found. </span>
        <span class="vuefinder__status-bar__selected-count">{{ app.dragSelect.getCount() > 0 ? t('%s item(s) selected.', app.dragSelect.getCount()) : '' }}</span>
      </div>
    </div> -->
    <div class="vuefinder__status-bar__space">
      <div class="vuefinder__status-bar__space-container">
        <span class="vuefinder__status-bar__space-icon">
          <StorageSVG />
        </span>
        <span class="vuefinder__status-bar__space-text">
          {{ formatedUsedSpaceText }}
        </span>
      </div>
    </div>
    <div class="vuefinder__status-bar__actions">
      <button
        class="vf-btn py-0 vf-btn-primary"
        :class="{ disabled: !isSelectButtonActive }"
        :disabled="!isSelectButtonActive"
        v-if="app.selectButton.active"
        @click="app.selectButton.click(ds.getSelected(), $event)"
      >
        {{ t("Select") }}
      </button>
      <span
        class="vuefinder__status-bar__about"
        :title="t('About')"
        @click="app.modal.open(ModalAbout)"
      >
        <AboutSVG />
      </span>
    </div>
  </div>
</template>

<script setup>
import { computed, inject, ref } from "vue";
import ModalAbout from "./modals/ModalAbout.vue";
import StorageSVG from "./icons/storage.svg";
import AboutSVG from "./icons/about.svg";

const app = inject("ServiceContainer");
const { t } = app.i18n;
const { setStore } = app.storage;
const ds = app.dragSelect;

const handleStorageSelect = () => {
  app.emitter.emit("vf-search-exit");
  app.emitter.emit("vf-fetch", {
    params: { q: "index", adapter: app.fs.adapter },
  });
  setStore("adapter", app.fs.adapter);
};

const searchQuery = ref("");

app.emitter.on("vf-search-query", ({ newQuery }) => {
  searchQuery.value = newQuery;
});

const isSelectButtonActive = computed(() => {
  const selectionAllowed = app.selectButton.multiple
    ? ds.getSelected().length > 0
    : ds.getSelected().length === 1;
  return app.selectButton.active && selectionAllowed;
});

const formatedUsedSpace = computed(() => {
  const value = app.fs?.data?.used_space;
  return typeof value === 'number' ? value.toFixed(2) : '0.00';
});
const formatedTotalSpace = computed(() => {
  const value = app.fs?.data?.total_space;
  return typeof value === 'number' ? value.toFixed(2) : '0.00';
});
const formatedUsedSpacePercentage = computed(() => {
  const used = app.fs?.data?.used_space;
  const total = app.fs?.data?.total_space;

  if (typeof used === 'number' && typeof total === 'number' && total !== 0) {
    return ((used / total) * 100).toFixed(2);
  } else {
    return '0.00';
  }
});
const formatedUsedSpaceText = computed(() => {
  return `Used ${formatedUsedSpace.value}Mb out of ${formatedTotalSpace.value}Mb (${formatedUsedSpacePercentage.value}%)`;
});
</script>
