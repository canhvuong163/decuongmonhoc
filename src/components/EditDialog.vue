<template>
    <v-dialog
      v-model="dialogValue"
      :max-width="500"
    >
      <v-card>
        <v-card-title>
          <span class="text-h5">Sửa đề cương</span>
        </v-card-title>
        <v-card-text>
          <v-form ref="form" v-model="valid">
            <v-text-field
              v-model="form.title"
              :counter="50"
              :rules="titleRules"
              label="Tiêu đề"
              required
              outlined
              dense
            ></v-text-field>
            <v-textarea
              v-model="form.description"
              :counter="200"
              :rules="descriptionRules"
              label="Mô tả"
              outlined
              dense
            ></v-textarea>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" text @click="closeDialog">Huỷ</v-btn>
          <v-btn color="primary" text @click="saveItem" :disabled="!valid">Lưu</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>
  
  <script>
  export default {
    name: "EditDialog",
    props: {
      dialog: {
          type: Boolean,
          required: true
      },
      editedItem: Object,
    },
    data() {
      return {
          form: {
              title: "",
              description: "",
          },
          valid: false,
          dialogValue: this.dialog
      }
    },
    computed: {
      titleRules() {
        return [
          (v) => !!v || "Tiêu đề là bắt buộc",
          (v) => (v && v.length <= 50) || "Tiêu đề không được quá 50 ký tự",
        ];
      },
      descriptionRules() {
        return [(v) => v.length <= 200 || "Mô tả không được quá 200 ký tự"];
      },
    },
    watch: {
      editedItem(val) {
        this.form.title = val.title;
        this.form.description = val.description;
      },
    },
    methods: {
      closeDialog() {
        this.$emit("close-dialog");
        this.dialogValue = false;
      },
      saveItem() {
        const data = {
          title: this.form.title,
          description: this.form.description
        };
        this.$emit("save-item", { ...this.editedItem, ...data });
      },
      open() {
        this.dialogValue = true;
      },
      close() {
        this.dialogValue = false;
      }
    },
  };
  </script>
  