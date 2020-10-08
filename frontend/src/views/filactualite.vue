<template>
    <div id="container">
        <div id="formPost">
            <div id="feedArea">
                <div class="alert feedbackMessage" :class="{'alert-success': !isAlert, 'alert-danger': isAlert}" v-if="feedbackMessage != ''"> {{ feedbackMessage }}
                </div>
                <button class="btn btn-outline-danger active" @click.prevent="displayFormPost = !displayFormPost">Poster votre Gif</button>
                <form v-if="displayFormPost" class="titre11"><label for="msgToPost"> Votre titre :</label>
                    <input type="text" id="msgToPost" class="form-control" placeholder="Titre de votre post" v-model="messageToPost">
                    <div>
                        <br><p> Aperçu de votre Post : </P>
                        <p>{{ messageToPost }}</p>
                        <img :src="this.img.url" v-if="this.imgIsChecked" class="previewImg" alt="Preview post">
                    </div>
                    <label for="imgToPost"></label>
                    <br>
                    <input type="file" id="imgToPost" ref="file"  @change="checkImage" accept="image/*">  <button class="btn btn-outline-danger active" @click.prevent="postMessage">Poster</button>
                </form>
            </div>
            <Post @postFlagged="displayAllPosts()" v-for="(post, postIndex) in posts" :key="post.id" :authorId="post.authorId" :message="post.message" :image="post.image" :index="postIndex" :id="post.id" :isFlagged="post.isFlagged"></Post>
        </div> 
    </div>
</template>

<script>
import axios from 'axios'
import Post from '../components/post.vue'

export default {
    data() {
        return {
            displayFormPost: false,
            messageToPost: '',
            isAlert: true,
            feedbackMessage: '',
            imgIsChecked: false, 
            posts: [],
            img : {
                size: 0, 
                height: 0, 
                width: 0, 
                url:''
            }
        }
    },
    components: {
        Post
    },
    methods: {
        postMessage() {
            if(this.imgIsChecked)
            {
                let file = this.$refs.file.files[0];
                let message = this.messageToPost;
                let syntaxeMessageAllowed = /^[a-zA-Z0-9 _.,!?€'’(Ééèàû)&]{2,100}$/;  
                if(syntaxeMessageAllowed.test(message)) {
                    const formData = new FormData();
                    formData.append ("authorId", this.$store.state.userId)
                    formData.append("image", file);
                    formData.append("message", message);
                    axios.post('http://localhost:3000/fil/post/', formData, { 
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            'Authorization': `token ${this.$store.state.tokenToCheck}`
                        }
                    })
                    .then(response => {
                        this.feedbackMessage = response.data.message;
                        this.isAlert = false; 
                        this.displayFormPost = false;
                        this.img.url = '';
                        this.img.size = 0;
                        this.img.height = 0; 
                        this.img.width = 0;
                        this.messageToPost = '';
                        this.imgIsChecked = false;
                        this.displayAllPosts();
                    })
                    .catch(error => {
                        this.feedbackMessage = error.response.data.message; 
                        this.isAlert = true; 
                    })
                }
                else {
                    this.feedbackMessage = "Le message contient des caractères non autorisés ou est supérieur à 100 caractères"
                    this.isAlert = true; 
                }
            } else {
                this.feedbackMessage = "Erreur avec l'image transmise";
                this.isAlert = true;
            }
        },
        displayAllPosts(){
            axios.get('http://localhost:3000/fil/getAll/',{ headers: {
                'Authorization': `token ${this.$store.state.tokenToCheck}`
                }})
            .then(response => {
                this.posts = response.data.resultat; 
            })
            .catch(error => {
                console.log(error);
            })
        },
        checkImage() {
            let imageToCheck = this.$refs.file.files[0];
            const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];

            if(!imageToCheck || imageToCheck.type.indexOf('image/') !== 0) {
                this.feedbackMessage = "Erreur dans le type de fichier";
                this.isAlert = true; 
                this.imgIsChecked = false;
                return;
            }

            if(!allowedTypes.includes(imageToCheck.type)){
                this.feedbackMessage = "Seules sont autorisées les images jpg, jpeg, png et gif"
                this.isAlert = true; 
                this.imgIsChecked = false; 
                return;
            }

            this.img.size = imageToCheck.size / 1000;

            if(this.img.size > 5000) {
                this.feedbackMessage = "L'image transmise est trop lourde (5Mo max)";
                this.isAlert = true; 
                this.imgIsChecked = false;
                return;
            }

            let fileReader = new FileReader(); 
            fileReader.readAsDataURL(imageToCheck);
            fileReader.onload = evt => {
                let image = new Image();
                image.onload = () => {
                    this.img.height = image.height;
                    this.img.width = image.width;
                    if(this.img.height > 600 || this.img.width > 600){
                        this.feedbackMessage = "L'image doit être de taille 600x600 max";
                        this.isAlert = true; 
                        this.imgIsChecked = false;
                        return;
                    }
                }
                image.src = evt.target.result;
            }

            this.imgIsChecked = true;
            this.feedbackMessage = ''; 
            this.isAlert = false;
            this.img.url = URL.createObjectURL(imageToCheck);
            return;
        }
    }, 
   mounted() {
        this.displayAllPosts();
    },
    beforeupdated() {
        this.displayAllPosts();
    }
}
</script>

<style lang="scss" scoped>

#container 
{
    width: 100%;
    margin:auto;
    background-color: #ffffff;
}

.titre11
{
    margin-top: 20px;
}

.feedbackMessage 
{
    width: 40%;
    margin: auto;
    margin-bottom: 1rem; 
}

#formPost 
{
    padding-top:1rem;
    margin:auto; 
    input{
        margin-top:1rem;
    }
}

#feedArea 
{
    width: 40%;
    margin:auto;
    background-color: #ffffff;
    padding: 1rem; 
    background: linear-gradient(to right, rgb(255, 255, 255), rgb(255, 255, 255));
    border: 10px outset rgba(253,45,1,0.73);
    border-radius: 13px 31px 0px 40px;
    
}

.previewImg 
{
    max-width:80%;
    width: 200px;
    height: 200px;
    height:auto;
}

@media all and(max-width:1000px) 
{
    #formPost, #feedArea{
        width: 80%;
    }
}

</style>