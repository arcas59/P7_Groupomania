<template>
    <div class="containerPost">
        <div class="message"> {{ message }}<a href="#" @click.prevent="flagPost(id, isFlagged);$emit('postflagged', id)" v-if="this.$store.state.roleUser == 'admin'"><img class="warning" src="../assets/flag.png" alt="flag post" width="24" height="24" ></a></div>
        <img :src="image" alt="post image" class="imgPost">
        <div class="auteur">
            <img :src="avatarAuteur" width="48" height="48" alt="user Avatar" style="border-radius:100%"><span class="displayAuthor">Posté par <router-link :to="{ name: 'Users', params: { id: authorId }}">{{ Auteur }} </router-link></span>
        </div>
        <div class="arrowDisplay">
            <button class="btn btn-outline-danger btn-sm" @click.prevent="addToDisplayForm(index); displayComments(id);">Commentaires</button>
        </div>
        <div class="alert" :class="{'alert-success': !isAlert, 'alert-danger': isAlert}" v-if="feedbackMessage != ''"> {{ feedbackMessage }}</div>
        <div class="commentForm" v-if="displayPostComments.includes(index)"> 
            <div class="avatar">
                <img :src="this.$store.state.avatarUser" width="48" height="48" alt="" style="border-radius:100%">
            </div>
            <form>
                <div class="inputCommentContainer">
                <label for="comment">Votre réponse: </label>
                <input type="text" id="comment" class="form-control form-control-sm inputComment" :class="{invalid: $v.commentToPost.$error}" placeholder="Votre commentaire"  @blur="$v.commentToPost.$touch()" v-model="commentToPost">
                <small v-if="commentToPost.length > 0" id="emailHelp" class="form-text">{{ commentToPost.length }} / 100</small>
                <small v-if="!$v.commentToPost.minLength" id="emailHelp" class="form-text">Le message doit contenir au moins 2 caractères</small>
                <small v-if="!$v.commentToPost.maxLength" id="emailHelp" class="form-text">Le message doit contenir 100 caractères maximum</small>
                <small v-if="!$v.commentToPost.syntaxe && commentToPost != ''" id="nomHelp" class="form-text">Caractères non autorisés</small>
                </div>
                <div><button class="btn btn-outline-danger btn-sm active" :disabled="$v.$invalid" @click.prevent="postComment(id)">Répondre</button></div>
            </form>
        </div>
        <br><div v-if="displayPostComments.includes(index)">
        <div v-for="comment in comments" :key="comment.id" class="commentDisplayer" > 
            <div class="containerEachComment">
                <div class="avatarAuteur">
                    <img :src="comment.avatar" width="48" height="48" alt="avatar User" style="border-radius:100%" >
                </div>
                <div class="comment">
                <span>
                <strong>{{ comment.auteur }}</strong><br>
                {{ comment.message}}
                </span>
                </div>
            </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { required, maxLength, minLength } from 'vuelidate/lib/validators'

export default {
    props: ['authorId', 'message' , 'image', 'index', 'id', 'isFlagged'], 
    data() {
        return {
            Auteur: '',
            avatarAuteur: '',
            displayPostComments: [],
            commentToPost: '',
            isAlert: true,
            feedbackMessage: '',
            comments: []
        }
    },
    validations: {
        commentToPost: {
            minLength: minLength(2),
            maxLength: maxLength(100), 
            required, 
            syntaxe: (value) => {
                return /[a-zA-Z0-9 _.,!?€'’(Ééèàû)&]{1,}$/.test(value);
            }
        }
    },
    methods : {
        getInfos(authorId) {
            axios.get('http://localhost:3000/user/getInfos/' + authorId, { 
                        headers: {
                            'Authorization': `token ${this.$store.state.tokenToCheck}`
                        }
                    })
            .then(result => {
                    this.Auteur = result.data[0].pseudo;
                    this.avatarAuteur = result.data[0].avatar;
            })
            .catch(error => {
                console.log(error)
            })
        },
        addToDisplayForm(index) {
            if(this.displayPostComments.includes(index)) {
                let indexToDelete = this.displayPostComments.indexOf(index);
                this.displayPostComments.splice(indexToDelete, 1);
            } else {
                this.displayPostComments.push(index);
            }
        },
        postComment(id) {
            let syntaxe = /[a-zA-Z0-9 _.,!?€'’(Ééèàû)&]{1,}$/;
            if(syntaxe.test(this.commentToPost)) {
                let comment = {
                    message: this.commentToPost,
                    postId: id,
                    auteur: this.$store.state.pseudoUser,
                    idAuteur: this.$store.state.userId
                }
                axios.post('http://localhost:3000/fil/post/comment', comment , { 
                        headers: {
                            'Authorization': `token ${this.$store.state.tokenToCheck}`
                        }
                    })
                .then(response => {
                    this.feedbackMessage = response.data.message;
                    this.isAlert = false; 
                    this.comments.push(this.commentToPost);
                    this.commentToPost = '';
                    setTimeout(() => {
                        this.feedbackMessage = ''
                    }, 2000);
                    this.displayComments(id);
                })
                .catch(error => {
                    this.feedbackMessage = error.response.data.message; 
                    this.isAlert = true; 
                })
            } else {
                this.errorMessage = "Le message ne respecte pas la syntaxe autorisée";
                return;
            }
        },
        displayComments(id) {
            axios.get('http://localhost:3000/fil/comment/get/'+id , { 
                        headers: {
                            'Authorization': `token ${this.$store.state.tokenToCheck}`
                        }
                    })
            .then(response => {
                this.comments = response.data.resultat;
            })
            .catch(error => {
                console.log(error);
            })
        },
        flagPost(id, isFlagged)
        {
            console.log(isFlagged);
            let data = {
                idToFlag: id, 
                userId: this.$store.state.userId,
                roleUser: this.$store.state.roleUser,
                isFlagged: isFlagged
            }
            axios.put('http://localhost:3000/dashBoard/flagPost/'+id, data , { headers: {
                'Authorization': `token ${this.$store.state.tokenToCheck}`
                }})
            .then(response => {
                this.feedbackMessage = response.data.message;
                this.isAlert = false; 
                this.$emit('postFlagged');
            })
            .catch(error => {
                console.log(error.response.data.message);
            })
        }
    }, mounted() {
        this.getInfos(this.authorId);
        console.log(this.$router.currentRoute.fullPath);
    }
}
</script>

<style lang="scss" scoped>
.containerPost {
    margin-top: 2rem;
    width: 40%;
    margin-right:auto;
    margin-left: auto; 
    border-radius: 3px;
    padding: 1rem; 
    border: 1px solid black;
    background-color: #ffffff;
    border: none;
}

.warning
{
    margin-left: 10px;
}

.auteur {
    margin-top:1rem;
    font-size:0.8rem;
    display: flex; 
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-bottom: 10px;
    .displayAuthor {
        align-self: center;
        margin-left:0.4rem;
        a {
        color:#fd2d01;
        }

    }
}
.message {
    font-weight: bold;
    margin-bottom: 1rem;
    border: 10px outset rgba(253,45,1,0.73);
    border-radius: 13px 31px 0px 40px;
}
.commentForm {
    display:flex; 
    flex-direction: row;
    align-items: center;
    margin-top:1rem;
    form {
        flex:4;
        display:flex;
        flex-direction: row;
        .inputComment{
            width: 80%;
            display:inline-block;
            margin-right: 0.5rem; 
        }
        .inputCommentContainer {
            width: 80%;
        }
        button {
            max-width:100%;
        }
    }
}

.invalid {
    border:1px solid red;
    background-color: #ffc9aa;
  small {
    color:red;
  }
}

.commentDisplayer {
    display:flex;
    flex-direction: column;
    text-align:left;
}

.containerEachComment {
    display:flex;
    flex-direction: row;
    align-items:center;
    border-bottom: 1px solid lightgray;
}

.comment {
    margin-left: 1rem;
    margin-bottom: 1rem; 
}

.imgPost {
    max-width: 80%;
    height:auto;
}

@media all and(max-width:1000px) {
    .containerPost{
        width: 100%;
    }
}
</style>