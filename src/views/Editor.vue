<template>
    <div class="editor-container">
      <!-- <el-tiptap v-model="content" 
      :extensions="extensions"
      :editable="isEditable" /> -->
      <TittleTiptap :documentid='documentid' />
      <TiptapComponent :documentid='documentid' />
    </div>
    

  </template>
  
  <script>

import 'element-tiptap/lib/index.css';

import TiptapComponent from '@/components/TiptapComponent.vue';
import TittleTiptap from '@/components/TittleTiptap.vue';
  export default {
    components: {
      TiptapComponent,
      TittleTiptap
    },
    props:['documentid']
  };
  </script>

