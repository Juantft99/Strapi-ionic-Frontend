import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
 export interface Post{
  id?: string,
  title: string,
  description: string

}

@Injectable({
  providedIn: 'root'
})
  export class PostService {
  API= 'http://localhost:1337/posts'

  constructor(
    private httpClient:HttpClient
  ) { }

  getPosts(){
    return this.httpClient.get(this.API)
  }
  getPostsById(id: string){
    return this.httpClient.get<Post>(`${this.API}/${id}`)

  }
  createPost(title: string, description: string){
    return this.httpClient.post(this.API, {
      title, description
    })
  }
  deletePost(id: string){
    return this.httpClient.delete(`${this.API}/${id}`)
  }
  updatePost(id: string, post:Post){
    return this.httpClient.put(`${this.API}/${id}`,post)


  }
}
