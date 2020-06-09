<template>
  <v-container class="pt-10">
    <v-banner single-line>
      <v-icon
        slot="icon"
        color="primary"
        size="36"
      >
        error
      </v-icon>
      The page you're looking could not be found.

      <template v-slot:actions>
                <router-link to="/">
                      <v-btn
          color="primary"
          text
        >
          Go to home
        </v-btn>
                    </router-link>
        
      </template>
    </v-banner>
  </v-container>
</template>

<script>
export default {};
</script>

<style>
</style>
