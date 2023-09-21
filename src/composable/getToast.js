import DKToast from 'vue-dk-toast'

export function toastStyles(duration, type) {
  const typeInfo = {
    slotLeft: null,
    slotRight: null,
    backgroundColor: null
  }
  if (type === 'error') {
    typeInfo.slotLeft = `💥`,
    typeInfo.slotRight = `❗❕`,
    typeInfo.backgroundColor = 'var(--red)'
  } else if (type === 'successed') {
    typeInfo.slotLeft = `🎉`,
    typeInfo.slotRight = `🎊`,
    typeInfo.backgroundColor = 'var(--blue)'
  }
  const props = {
    duration: duration,
    slotLeft: typeInfo.slotLeft,
    slotRight: typeInfo.slotRight,
    styles: {
      backgroundColor: typeInfo.backgroundColor,
    },
  }
  return props
}