<template>
  <h1>{{ $route.params }}</h1>
</template>

<script>
export default {
  name: 'Angebotsdetails',
  asyncData (context) {
    console.log(context)
    return {}// $api.getCertificates()
  }
}
</script>

<style>

</style>
