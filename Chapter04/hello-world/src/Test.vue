<script>
export default {
  data () {
    return {
      movies: [
        { title: 'Star Wars' },
        { title: 'Star Wars' }
      ]
    }
  },
  render (h) {
    const itemClass = 'movie'
    return <ul class="movies">
      {this.movies.map(movie =>
        <li class={ itemClass }>{ movie.title }</li>
      )}
    </ul>
  }
}
</script>
<style lang="scss">
.movies {
  list-style: none;
  padding: 12px;
  background: rgba(0, 0, 0, .1);
  border-radius: 3px;
}

.movie:not(:last-child) {
  padding-bottom: 6px;
  margin-bottom: 6px;
  border-bottom: 1px solid rgba(0, 0, 0, .1)
}
</style>
