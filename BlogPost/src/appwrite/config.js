import conf from "../conf/confige";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class DatabaseService{

    client = new Client();
    databases;
    bucket;

    constructor(){
            this.client
            .setEndpoint(conf.appWriteUrl)
            .setProject(conf.appWriteProjectId);
            this.databases =new Databases(this.client)
            this.bucket =new Storage(this.client)
    }

    async createPost({title,slug,content,featuredImage,status,userId}){
        try {
            return await this.databases.createDocument(conf.appWriteDatabaseId,conf.appWriteCollectionId,slug,{
                title,
                content,
                featuredImage,
                status,
                userId
            })
        } catch (error) {
            console.log("CreatePost Error")
            return false;
        }
    }

    async updatePost(slug,{title,content,featuredImage,status}){
        try {
            return await this.databases.updateDocument(conf.appWriteDatabaseId,conf.appWriteCollectionId,slug,{
                title,
                content,
                featuredImage,
                status,
            })
        } catch (error) {
            console.log("UpdatePost Error")
            return false;
        }

    }

    async deletePost(slug){
        try {
           await this.databases.deleteDocument(
            conf.appWriteDatabaseId,
            conf.appWriteCollectionId,
            slug)
           return true;
        }   
        catch (error) {
            console.log("DeletePost Error")
            return false;
        }  
    }

    async getPost(slug){
        try {
           return await this.databases.getDocument(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                slug
            )
        } catch (error) {
            
           console.log("getPost Error")
           return false;
        }
    }
    async getPosts(queries= [Query.equal("status","active")]){
        try {
           return await this.databases.listDocuments(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                queries
            )
        } catch (error) {
            console.log("GetPosts Error")
            return false;
        }
    }

    //file upload services/methods

    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appWriteBucketId,
                ID.unique(),
                file,
            )
        } catch (error) {
            
           console.log("Upload Error")
           return false;
        }
    }
    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appWriteBucketId,
                fileId
            )
            return true;
        } catch (error) {
           console.log("DeleteFile Error")
           return false;
        }
    }
    async getPreviewFile(fileId){
        try {
            return await this.bucket.getFilePreview(
                conf.appWriteBucketId,
                fileId
            )
            
        } catch (error) {
            
           console.log("previewfile Error")
           return false;
        }
    }
}

const databaseService = new DatabaseService();

export default databaseService;