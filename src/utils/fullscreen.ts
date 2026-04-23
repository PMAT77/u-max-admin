import { ref, type Ref } from 'vue'

export function useFullscreen(target: Ref<HTMLElement | null>) {
  const isFullscreen = ref(false)

  function getFullscreenElement(): HTMLElement | null {
    return (
      document.fullscreenElement ||
      (document as any).webkitFullscreenElement ||
      (document as any).mozFullScreenElement ||
      (document as any).msFullscreenElement
    )
  }

  function enterFullscreen(element: HTMLElement): Promise<void> {
    if (element.requestFullscreen) {
      return element.requestFullscreen()
    }
    if ((element as any).webkitRequestFullscreen) {
      return (element as any).webkitRequestFullscreen()
    }
    if ((element as any).mozRequestFullScreen) {
      return (element as any).mozRequestFullScreen()
    }
    if ((element as any).msRequestFullscreen) {
      return (element as any).msRequestFullscreen()
    }
    return Promise.reject(new Error('Fullscreen API is not supported'))
  }

  function exitFullscreen(): Promise<void> {
    if (document.exitFullscreen) {
      return document.exitFullscreen()
    }
    if ((document as any).webkitExitFullscreen) {
      return (document as any).webkitExitFullscreen()
    }
    if ((document as any).mozCancelFullScreen) {
      return (document as any).mozCancelFullScreen()
    }
    if ((document as any).msExitFullscreen) {
      return (document as any).msExitFullscreen()
    }
    return Promise.reject(new Error('Fullscreen API is not supported'))
  }

  async function toggle(): Promise<void> {
    if (!target.value) {
      if (isFullscreen.value) {
        await exitFullscreen()
        isFullscreen.value = false
      }
      return
    }

    if (isFullscreen.value) {
      await exitFullscreen()
      isFullscreen.value = false
    } else {
      await enterFullscreen(target.value)
      isFullscreen.value = true
    }
  }

  function handleFullscreenChange() {
    const fullscreenElement = getFullscreenElement()
    isFullscreen.value = fullscreenElement === target.value
  }

  document.addEventListener('fullscreenchange', handleFullscreenChange)
  document.addEventListener('webkitfullscreenchange', handleFullscreenChange)
  document.addEventListener('mozfullscreenchange', handleFullscreenChange)
  document.addEventListener('MSFullscreenChange', handleFullscreenChange)

  return {
    isFullscreen,
    toggle,
    enter: async () => {
      if (target.value && !isFullscreen.value) {
        await enterFullscreen(target.value)
        isFullscreen.value = true
      }
    },
    exit: async () => {
      if (isFullscreen.value) {
        await exitFullscreen()
        isFullscreen.value = false
      }
    }
  }
}

export function useDocumentFullscreen() {
  const isFullscreen = ref(false)

  function getFullscreenElement(): HTMLElement | null {
    return (
      document.fullscreenElement ||
      (document as any).webkitFullscreenElement ||
      (document as any).mozFullScreenElement ||
      (document as any).msFullscreenElement
    )
  }

  function enterFullscreen(): Promise<void> {
    const element = document.documentElement
    if (element.requestFullscreen) {
      return element.requestFullscreen()
    }
    if ((element as any).webkitRequestFullscreen) {
      return (element as any).webkitRequestFullscreen()
    }
    if ((element as any).mozRequestFullScreen) {
      return (element as any).mozRequestFullScreen()
    }
    if ((element as any).msRequestFullscreen) {
      return (element as any).msRequestFullscreen()
    }
    return Promise.reject(new Error('Fullscreen API is not supported'))
  }

  function exitFullscreen(): Promise<void> {
    if (document.exitFullscreen) {
      return document.exitFullscreen()
    }
    if ((document as any).webkitExitFullscreen) {
      return (document as any).webkitExitFullscreen()
    }
    if ((document as any).mozCancelFullScreen) {
      return (document as any).mozCancelFullScreen()
    }
    if ((document as any).msExitFullscreen) {
      return (document as any).msExitFullscreen()
    }
    return Promise.reject(new Error('Fullscreen API is not supported'))
  }

  async function toggle(): Promise<void> {
    if (isFullscreen.value) {
      await exitFullscreen()
    } else {
      await enterFullscreen()
    }
  }

  function handleFullscreenChange() {
    isFullscreen.value = !!getFullscreenElement()
  }

  document.addEventListener('fullscreenchange', handleFullscreenChange)
  document.addEventListener('webkitfullscreenchange', handleFullscreenChange)
  document.addEventListener('mozfullscreenchange', handleFullscreenChange)
  document.addEventListener('MSFullscreenChange', handleFullscreenChange)

  return {
    isFullscreen,
    toggle,
    enter: enterFullscreen,
    exit: exitFullscreen
  }
}
