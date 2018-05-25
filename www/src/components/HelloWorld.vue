<template>
  <div>
    <!-- The following is for the sign in sign up -->
    <div class="login" v-if="!user._id">
      <button @click="sForm=1">Sign In</button>
      <button @click="sForm=2">Sign Up</button>
      <div v-if="sForm==1">
        <form v-on:submit.prevent="getUser">
          <input type="text" name="name" placeholder="Enter User Name" v-model="tuser.name">
          <button type="submit">Submit</button>
        </form>
      </div>
      <div v-if="sForm==2">
        <form v-on:submit.prevent="addUser">
          <input type="text" name="name" placeholder="Select User Name" v-model="tuser.name">
          <button @click="showLogin=1" type="submit">Submit</button>
        </form>
      </div>
    </div>
    <!-- End of sign in sign up code -->


    <div class="post" v-else>
      <button @click="logout">Logout</button>
      <h1>Hello, {{user.name}}</h1>
    </div>
    <div>
      <button v-if="user._id" @click="postForm=1">Create Post</button>
      <div v-if="postForm==1">
        <form v-on:submit.prevent="addPost">
          <input type="text" name="title" placeholder="title" v-model="post.title" required>
          <input type="text" name="body" placeholder="body" v-model="post.body" required>
          <input type="url" name="imgUrl" placeholder="Image url" v-model="post.imgUrl">
          <button @click="postForm=0" type="submit">Submit</button>
        </form>
      </div>
    </div>
    <div v-if="user._id">
      <div v-for="post in posts">
        <post :post='post'></post>
      </div>
    </div>

  </div>
</template>

<script>
  import Post from  "./post.vue"
  export default {
    name: 'HelloWorld',
    data() {
      return {
        showLogin: 0,
        sForm: 0,
        postForm: 0,
        tuser: {
          name: ''
        },
        post: {
          title: '',
          body: '',
          imgUrl: '',
          user: '',
          rating: 0,
          parentId: ''
        }
      }
    },
    mounted() {
      this.$store.dispatch('getPosts')
      this.$store.dispatch('getUsers')
      this.$store.dispatch('getComments')
      this.$store.dispatch('getSubComments')
    },
    computed: {
      posts() {
        return this.$store.state.posts
      },
      user(){
        return this.$store.state.user
      }
    },
    methods: {
      addUser() {
        this.$store.dispatch('addUser', this.tuser)
      },
      getUser() {
        this.$store.dispatch('getUser', this.tuser)
      },
      addPost() {
        this.post.user = this.user.name
        this.post.parentId = this.user._id
        this.$store.dispatch('addPost', this.post)
      },
      logout(){
        this.$store.dispatch('logout')
      }
    },
    components: {
      Post
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>