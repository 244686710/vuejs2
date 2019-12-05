<template>
  <main class="faq">
    <h1>Frenquently Asked Questions</h1>

    <div class="error" v-if="hasRemoteErrors">
      Can't load the questions
    </div>

    <section class="list">
      <article v-for="(question, index) of questionList" :key="index">
        <h2 v-html="question.title"></h2>
        <p v-html="question.content"></p>
      </article>
    </section>

    <Loading v-if="remoteDataBudy" />
  </main>
</template>
<script>
import RemoteData from '../minxins/RemoteData'
export default {
  name: 'FAQ',
  mixins: [
    RemoteData({
      questionList: 'questions'
    })
  ],
  data () {
    return {
      // error: null
    }
  }
  // created () {
  //   fetch('http://localhost:3000/questions').then(response => {
  //     if (response.ok) {
  //       console.log(response)
  //       return response.json() // response返回了一个新的Promise,所以需要另一个then回调函数；
  //     } else {
  //       return Promise.reject(new Error('error')) // promise.reject必须传入一个错误对象
  //     }
  //   }).then(result => {
  //     console.log(result)
  //     this.questions = result
  //   }).catch(e => {
  //     this.error = e
  //   })
  // }
  // async created () {
  //   this.loading = true
  //   try {
  //     this.questions = await this.$fetch('questions')
  //   } catch (e) {
  //     this.error = e
  //   }
  //   this.loading = false
  // }
}
</script>
