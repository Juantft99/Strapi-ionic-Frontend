import { Component, OnInit } from '@angular/core';
import { PostService, Post } from '../service/post.service'
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.page.html',
  styleUrls: ['./post-form.page.scss'],
})
export class PostFormPage implements OnInit {
  editing=false;
  post:Post={
    title:'',
    description:''
  }

  constructor(private postService:PostService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((paramMap)=>{
      if (paramMap.get('id')){
        this.editing=true;
        this.postService.getPostsById(paramMap.get('id')).subscribe((res)=> this.post=res)
      }
    })
  }
  savePost(){
    this.postService.createPost(this.post.title, this.post.description)
    .subscribe (res=>{{this.router.navigate(['/posts'])}}, err => console.error(err)) 

  }
  updatePost(){
    this.postService.updatePost(this.post.id,{
      title:this.post.title,
      description:this.post.description
    }).subscribe(res=>console.log(res))

  }

}
