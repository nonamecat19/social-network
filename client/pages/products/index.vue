<template>
<div>
  <div class='flex gap-6 flex-wrap'>
    <!--TODO: TO GRIDS-->
    <card
      :price='23'
      title='Title'
      :id='1'
    />
    <card
      :price='24'
      title='Title'
      :id='2'
    />
    <card
      :price='25'
      title='Title'
      :id='3'
    />
    <card
      :price='26'
      title='Title'
      :id='4'
    />
    <card
      :price='27'
      title='Title'
      :id='5'
    />
  </div>
</div>
</template>
<script lang='ts' setup>
definePageMeta({
  layout: "main",
});
</script>
<style scoped>

</style>