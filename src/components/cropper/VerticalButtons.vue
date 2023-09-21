<template>
  <div class="vertical-buttons">
    <slot />
  </div>
</template>

<script>
export default {

}
</script>

<style>
.vertical-buttons {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  right: 12.5%;
  bottom: 5%;
  transform: translateX(50%);
}
</style>