<template>
  <h1>Home</h1>
  <div>
    {{ message }}
  </div>
</template>

<script>
import LuigiClient from "@luigi-project/client";

export default {
  name: "home",
  data: () => ({
    message: "",
  }),

  created() {
    this.luigiClient = LuigiClient;
    this.luigiClient.addInitListener((initialContext) => {
      this.message = "Luigi Client initialized.";
    });
    this.luigiClient.addContextUpdateListener((updatedContext) => {
      this.message = "Luigi Client updated.";
    });
  },
};
</script>