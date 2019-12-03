const HTML = marked('**Bold** *Italic* [link] (http://vuejs.org)')
console.log(HTML)

var app = new Vue({
    el: '#notebook',
    name: 'myApp',
    data() {
        return {
            content: 'This is note',
            notes: JSON.parse(localStorage.getItem('notes')) || [],
            // 选中笔记的id
            selectedId: null
        }
    },
    computed: {
        notePreview() {
            // Markdown 渲染为HTML
            return this.selectedNote ?  marked(this.selectedNote.content): ''
        },
        //返回与selectedId相匹配的笔记
        selectedNote() {
            return this.notes.find(note => note.id === this.selectedId)
        }
    },
    watch: {
        // 侦听 content 数据属性
        content: {
            // handler(val, oldVal) {
            //     console.log('new note:', val, 'old note:', oldVal);
            //     localStorage.setItem('content', val);
            // },
            // deep: true, 告诉Vue已递归的方式侦听嵌套对象内部值得变换
            // immediate: true, // 立即电泳处理函数，不用等到属性值第一次变化时才调用

            handler: 'saveNote'
        },
        notes: {
            handler: 'saveNotes',
            deep: true
        }

    },
    created() {
        this.content = localStorage.getItem('content') || 'You can write in **markdown** '
    },
    methods: {
        saveNote(val) {
            console.log(val);
            localStorage.setItem('content', val);
            this.reportOperation('saving');
        },
        saveNotes(val){
            
            localStorage.setItem('notes', JSON.stringify(val));
        },
        reportOperation(opName) {
            console.log('The', opName, 'operation was completed:');
        },
        
        // 用一些默认值添加一条笔记，并将其添加到笔记数组中
        addNote() {
            const time = Date.now();
            const note = {
                id: String(time),
                title: 'New note ' + (this.notes.length + 1),
                content: '**Hi** This notebook is using [markdown](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet) for formatting!',
                created: time,
                favorite: false,
            };
            // 添加到列表中
            this.notes.push(note);
        },

        selectNote (note) {
            this.selectedId = note.id;
            this.content = note.content
        }
    },
})