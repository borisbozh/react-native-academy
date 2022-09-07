import { ImageType } from "expo-camera/build/Camera.types.js";
import { IdType, ImageData } from "./shared-types.js";

export enum PostStatus {
    Published = 1, Draft
}

export enum ImageStatus {
    Normal = 1, Favorite
}

export enum QuestionType{
    MultipleChoice = 1, MultipleResponse, DragAndDrop
}

export class Post {
    constructor(
        public title: string,
        public content: string,
        public tags: string[],
        public image: ImageData,
        public authorId: IdType,
        public status: PostStatus = PostStatus.Published,
        public id: IdType = undefined,
    ) {
        // super(title, content, tags, imageUrl, authorId);
    }
}

export class Image {
    constructor(
        public title: string,
        public status: ImageStatus = ImageStatus.Favorite,
        public id: IdType = undefined,
        public image: ImageData,
        public content?: string,
        public tags?: string[],
        public authorName?: string
    ) {
        // super(title, content, tags, imageUrl, authorId);
    }
}

export class Question {
    constructor(
        public id:IdType = undefined,
        public questionType: QuestionType,
        public text:string,
        public maxPoints:number,
        public answers:string[],
        public created:Date = new Date(),
        public modified:Date = new Date(),
        public picture?:ImageData
        
    ) {
        // super(title, content, tags, imageUrl, authorId);
    }
}

export class Answer {
    constructor(
        public id: IdType = undefined,
        public scorePercentage:number,
        public created:Date = new Date(),
        public modified:Date = new Date(),
        public text?: string,
        public picture?:ImageType
    ) {
        // super(title, content, tags, imageUrl, authorId);
    }
}