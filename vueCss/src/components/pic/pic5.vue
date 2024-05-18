<template>
  <svg-icon type="mdi" :path="path"></svg-icon>
</template>

<script>
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiBullseyeArrow } from '@mdi/js';

export default {
  name: "my-component",
  components: {
    SvgIcon
  },
  data() {
    return {
       path: mdiBullseyeArrow,
    }
  }
}
</script>
Sport
target-arrow
Suggest a tag
Suggest an alias