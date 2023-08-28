<template>
  <div class="editor" v-if="editor">
    <menu-bar class="editor__header" :editor="editor" />
    <editor-content class="editor__content" :editor="editor" />
    <div class="editor__footer">
        <div :class="`editor__status editor__status--${status}`">
          <template v-if="status === 'connected'">
            {{ editor.storage.collaborationCursor.users.length }} user{{ editor.storage.collaborationCursor.users.length === 1 ? '' : 's' }} online in {{ room }}
          </template>
          <template v-else>

          </template>
        </div>
        <div class="editor__name">
          <!-- <button @click="setName">
            {{ currentUser.name }}
          </button> -->
          <button>
            {{ currentUser.name }}
          </button>
        </div>
      </div>
  </div>
  
</template>

<script>
import { Editor, EditorContent } from '@tiptap/vue-2'
import StarterKit from '@tiptap/starter-kit'
import Collaboration from '@tiptap/extension-collaboration'
import CollaborationCursor from '@tiptap/extension-collaboration-cursor'
import { HocuspocusProvider } from '@hocuspocus/provider'
import Highlight from '@tiptap/extension-highlight'
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'
import CharacterCount from '@tiptap/extension-character-count'
import { getToken } from '../utils/setToken.js'

import * as Y from 'yjs'
import { IndexeddbPersistence } from 'y-indexeddb'



// import { variables } from '../../variables.js'
import MenuBar from './MenuBar.vue'

  const getRandomElement = list => {
    return list[Math.floor(Math.random() * list.length)]
  }

  // const getRandomRoom = () => {
  //   const roomNumbers = (variables.collabRooms || '').trim().split(',') || [10, 11, 12]
  
  //   return getRandomElement(roomNumbers.map(number => `rooms.${number}`))
  // }

export default {
  components: {
    EditorContent,
    MenuBar,
  },
  props:['documentid'],
  // props: {
  //   value: {
  //     type: String,
  //     default: '',
  //   },
  // },

  data() {
    return {
      currentUser: JSON.parse(localStorage.getItem('currentUser')) || {
        // name: this.getRandomName(),

        name: localStorage.getItem('username'),
        color: this.getRandomColor(),
      },
      provider: null,
      editor: null,
      status: 'connecting',
      // room: getRandomRoom(),
    }
  },

  watch: {
    value(value) {
      // HTML
      const isSame = this.editor.getHTML() === value

      // JSON
      // const isSame = JSON.stringify(this.editor.getJSON()) === JSON.stringify(value)

      if (isSame) {
        return
      }

      this.editor.commands.setContent(value, false)
    },
  },

  mounted() {
    const ydoc = new Y.Doc()

    // Store the Y document in the browser
    new IndexeddbPersistence(this.documentid, ydoc)
    
    const provider = new HocuspocusProvider({
      url: 'ws://23.94.102.135:8010',
      name: this.documentid,
      // name: this.room,
      document: ydoc,
    })

    // this.provider.on('status', event => {
    //   this.status = event.status
    // })
    
    this.editor = new Editor({
      // content: this.value,
      // editorProps: {
      //   attributes: {
      //     class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none',
      //   },
      // },
      extensions: [
        StarterKit.configure({
          history: false,
        }),
        Highlight,
        TaskList,
        TaskItem,
        Collaboration.configure({
          // document: provider.document,
          document: ydoc,
          field: 'summary',
        }),
        // Register the collaboration cursor extension
        CollaborationCursor.configure({
          provider: provider,
          // user: {
          //   name: 'Cyndi Lauper',
          //   color: '#f783ac',
          // },
          user: this.currentUser,
        }),
        CharacterCount.configure({
          limit: 10000,
        }),
      ],

      onUpdate: () => {
        // HTML
        this.$emit('input', this.editor.getHTML())

        // JSON
        // this.$emit('input', this.editor.getJSON())
      },
    })

    //写好了记得在titile里也改掉
    const name = getToken(username);

    getLimit(this.documentid,name).then(res => {
      if(res.data.limit === ture)
      {
        this.editor.setEditable(true);
      }
      else{
        this.editor.setEditable(false);
      }
    })
    
    // localStorage.setItem('currentUser', JSON.stringify(this.currentUser))
  },

  methods: {
      setName() {
        const name = (window.prompt('Name') || '')
          .trim()
          .substring(0, 32)
  
        if (name) {
          return this.updateCurrentUser({
            name,
          })
        }
      },
  
      // updateCurrentUser(attributes) {
      //   this.currentUser = { ...this.currentUser, ...attributes }
      //   this.editor.chain().focus().updateUser(this.currentUser).run()
  
      //   localStorage.setItem('currentUser', JSON.stringify(this.currentUser))
      // },
  
      getRandomColor() {
        return getRandomElement([
          '#958DF1',
          '#F98181',
          '#FBBC88',
          '#FAF594',
          '#70CFF8',
          '#94FADB',
          '#B9F18D',
        ])
      },
  
      // getRandomName() {
      //   return getRandomElement([
      //     '张三', '李四', '吴浩宇', '梁坤', '王二', 'Joan Collins', 'Winona Ryder', 'Christina Applegate',  'Matthew Broderick',
      //   ])
      // },
    },
  
    beforeDestroy() {
      this.editor.destroy()
      this.provider.destroy()
    },
}
</script>


<style lang="scss">
.editor {
  background-color: #FFF;
  border: 3px solid #444242;
  border-radius: 0.75rem;
  color: #0D0D0D;
  display: flex;
  // flex: 1; /* This sets the flex property to 1 */
  flex-direction: column;
  min-height: 90%;
  // max-height: 26rem;
  // margin: 10px 10px; /* 设置上、左、右的间距 */
  background-color: hsl(0, 0%, 96%); /* 设置背景色 */
  text-align: left;

  &__header {
    align-items: center;
    background: #0d0d0d;
    border-bottom: 3px solid #0d0d0d;
    border-top-left-radius: 0.25rem;
    border-top-right-radius: 0.25rem;
    display: flex;
    flex: 0 0 auto;
    flex-wrap: wrap;
    padding: 0.25rem;
  }

  &__content {
    flex: 1 1 auto;
    overflow-x: hidden;
    overflow-y: auto;
    padding: 1.25rem 1rem;
    -webkit-overflow-scrolling: touch;
  }

  &__footer {
    align-items: center;
    border-top: 3px solid #373636;
    color: #0D0D0D;
    display: flex;
    flex: 0 0 auto;
    flex-wrap: wrap;
    font-size: 12px;
    font-weight: 600;
    justify-content: space-between;
    padding: 0.25rem 0.75rem;
    white-space: nowrap;
  }

  /* Some information about the status */
  &__status {
    align-items: center;
    border-radius: 5px;
    display: flex;

    &::before {
      background: rgba(#0D0D0D, 0.5);
      border-radius: 50%;
      content: ' ';
      display: inline-block;
      flex: 0 0 auto;
      height: 0.5rem;
      margin-right: 0.5rem;
      width: 0.5rem;
    }

    &--connecting::before {
      background: #616161;
    }

    &--connected::before {
      background: #B9F18D;
    }
  }

  &__name {
    button {
      background: none;
      border: none;
      border-radius: 0.4rem;
      color: #0D0D0D;
      font: inherit;
      font-size: 12px;
      font-weight: 600;
      padding: 0.25rem 0.5rem;

      &:hover {
        background-color: #0D0D0D;
        color: #FFF;
      }
    }
  }
}

/* Give a remote user a caret */
.collaboration-cursor__caret {
  border-left: 1px solid #0D0D0D;
  border-right: 1px solid #0D0D0D;
  margin-left: -1px;
  margin-right: -1px;
  pointer-events: none;
  position: relative;
  word-break: normal;
}

/* Render the username above the caret */
.collaboration-cursor__label {
  border-radius: 3px 3px 3px 0;
  color: #0D0D0D;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  left: -1px;
  line-height: normal;
  padding: 0.1rem 0.3rem;
  position: absolute;
  top: -1.4em;
  user-select: none;
  white-space: nowrap;
}

/* Basic editor styles */
.tiptap {
  > * + * {
    margin-top: 0.75em;
  }

  ul,
  ol {
    padding: 0 1rem;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    line-height: 1.1;
  }

  code {
    background-color: rgba(#616161, 0.1);
    color: #616161;
  }

  pre {
    background: #0D0D0D;
    border-radius: 0.5rem;
    color: #FFF;
    font-family: 'JetBrainsMono', monospace;
    padding: 0.75rem 1rem;

    code {
      background: none;
      color: inherit;
      font-size: 0.8rem;
      padding: 0;
    }
  }

  mark {
    background-color: #FAF594;
  }

  img {
    height: auto;
    max-width: 100%;
  }

  hr {
    margin: 1rem 0;
  }

  blockquote {
    border-left: 2px solid rgba(#0D0D0D, 0.1);
    padding-left: 1rem;
  }

  hr {
    border: none;
    border-top: 2px solid rgba(#0D0D0D, 0.1);
    margin: 2rem 0;
  }

  ul[data-type="taskList"] {
    list-style: none;
    padding: 0;

    li {
      align-items: center;
      display: flex;

      > label {
        flex: 0 0 auto;
        margin-right: 0.5rem;
        user-select: none;
      }

      > div {
        flex: 1 1 auto;
      }
    }
  }
}
</style>
