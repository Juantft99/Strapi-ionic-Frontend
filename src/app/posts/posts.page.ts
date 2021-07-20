import { Component } from '@angular/core';
import { PostService } from '../service/post.service'
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.page.html',
  styleUrls: ['./posts.page.scss'],
})
export class PostsPage {
  posts:any=[]

  constructor(
    private postService: PostService,
    private alertController:AlertController
  ) { }
  loadPost(){
    this.postService.getPosts().subscribe(res => {this.posts=res;}, err => console.log(err))

  }

  ngOnInit() {
    this.loadPost();

  }
  ionViewWillEnter(){
    this.loadPost();
  }
  async deletePost(id){
    const alert = await this.alertController.create({
      header:"Eliminar",
      subHeader:"Se eliminará esta publicación",
      message: "¿deseas eliminarla?",
      buttons:[{
        text:"ok",
        handler: () =>{
          console.log(id)
          this.postService.deletePost(id).subscribe (res=> this.loadPost(), err => console.log(err))
        }
      },"Cancelar"]
    })
    await alert.present();

  }
  editPost(id: String){
    console.log(id)

  }

}
