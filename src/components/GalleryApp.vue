<template>
  <div class="hello">
    <div class="header">
       <h1>{{ msg }}</h1>
    </div>
    <div class="button-content text-end">
      <button type="button" @click="showModal" class="btn btn-primary btn-lg">Add new image</button>
    </div>
     <input type="text" class="form-control mb-4 w-75 m-auto" v-model="query" placeholder="Search">
    <div v-if="searchImages.length > 0" class="w-75 m-auto row p-3">
     
        <div class="col-12 col-sm-6 col-md-3 border" v-for="(image,k) in searchImages" :key="k">
            <label for="name" class="w-100 text-start text-primary">Name: {{image.name}}</label>
            <img :src="'http://127.0.0.1:8000'+image.image_url" class="img-fluid" alt="Responsive image">
            <div class="flex container">
              <label for="date" class="w-100 text-start">Date: {{image.date}}</label>
              <button type="button" @click="deleteImage(image.id)" class="btn btn-outline-danger">Delete</button>
            </div>
        </div>
    </div>
    <div v-else class="row">
      <div class="col-12">
            <img src="/images/default.png" class="img-fluid" alt="Responsive image">
      </div>
    </div>
    <pagination class="w-75 m-auto" v-model="page" :records="count" :per-page="4" @paginate="getImages"/>
    <create-image @reload="getImages"/>
  </div>
</template>

<script>
import Pagination from 'vue-pagination-2';
import Swal from 'sweetalert2';
import CreateImage from "./CreateImage.vue";
import axios from "axios";
export default {
  components:{
    CreateImage,
    Pagination
  },
  data(){
    return{
      page: 1,
      count: 0,
      images: [],
      query: ""
    }
  },
  name: 'GalleryApp',
  props: {
    msg: String
  },
  created(){
    this.getImages();
  },
  computed:{
     searchImages(){
      return this.images.filter((el) => el.name.toLowerCase().includes(this.query.toLowerCase()) === true);
    }
  },
  methods:{
    showModal(){
      this.$modal.show("image-modal");
    },
    getImages(){
      axios.get('http://127.0.0.1:8000/api/images?page='+ this.page).then((response)=>{
            this.count = response.data.count;
        this.images = response.data.content.data;
      })
    },
    deleteImage(id){
      Swal.fire({
                title: 'Delete Image?',
                text: "Are you sure?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#D7222B',
                cancelButtonColor: '#D0D3D4',
                cancelButtonText: 'No, Back',
                confirmButtonText: 'Yes, Delete it'
            }).then((result) => {
                if (result.value) {
                    axios.delete('http://127.0.0.1:8000/api/images/'+id).then(this.getImages);
                    Swal.fire({
                      position: 'top-end',
                      icon: 'success',
                      title: 'Your image has been deleted',
                      showConfirmButton: false,
                      timer: 1500
                    });
                }
            })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.header{
  background: rgb(78 37 255);
  color:white;
  padding: 1.3rem;
}
.button-content{
  padding: 2rem;
}
body{
    background: #f3f4f6;
}
.container{
    display: flex;
    align-items: center;
    margin-bottom: 0.5rem;
}
</style>
