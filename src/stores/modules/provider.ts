import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { LoadingBarApi, MessageApi, NotificationApi, DialogApi } from 'naive-ui';

export const useProviderStore = defineStore('provider', () => {
  const loadingBar = ref<LoadingBarApi>();
  const message = ref<MessageApi>();
  const notification = ref<NotificationApi>();
  const dialog = ref<DialogApi>();

  function setLoadingBar(api: LoadingBarApi) {
    loadingBar.value = api;
  }

  function setMessage(api: MessageApi) {
    message.value = api;
  }

  function setNotification(api: NotificationApi) {
    notification.value = api;
  }

  function setDialog(api: DialogApi) {
    dialog.value = api;
  }

  return {
    loadingBar,
    message,
    notification,
    dialog,
    setLoadingBar,
    setMessage,
    setNotification,
    setDialog,
  };
});
