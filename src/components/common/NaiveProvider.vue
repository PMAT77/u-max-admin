<script setup lang="ts">
import { NLoadingBarProvider, NNotificationProvider, NMessageProvider, NDialogProvider, useLoadingBar, useMessage, useNotification, useDialog } from 'naive-ui';
import { defineComponent, h } from 'vue';
import { useProviderStore } from '@/stores/modules/provider';

const providerStore = useProviderStore();

const NaiveProvider = defineComponent({
  name: 'NaiveProvider',
  setup() {
    providerStore.setLoadingBar(useLoadingBar());
    providerStore.setMessage(useMessage());
    providerStore.setNotification(useNotification());
    providerStore.setDialog(useDialog());
    return () => h('div', { class: 'naive-provider' });
  },
});
</script>

<template>
  <n-loading-bar-provider>
    <n-notification-provider>
      <n-message-provider>
        <n-dialog-provider>
          <NaiveProvider />
          <slot />
        </n-dialog-provider>
      </n-message-provider>
    </n-notification-provider>
  </n-loading-bar-provider>
</template>