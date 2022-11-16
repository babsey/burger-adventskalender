<template>
  <v-app>
    <v-layout>
      <v-main>
        <router-view />

        <v-footer
          class="no-print px-4 py-2 bg-transparent text-white text-caption"
          style="position: absolute; bottom: 0"
        >
          2022 -
          <v-btn size="x-small" to="/about" variant="text" v-text="'about'" />
        </v-footer>
      </v-main>
    </v-layout>
  </v-app>
</template>

<style>
@media print {
  .no-print,
  .no-print * {
    display: none !important;
  }
}
</style>
