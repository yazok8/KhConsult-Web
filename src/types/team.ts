export interface AboutOurTeam{
    id: string;
    name:string
    title: string;
    description: string;
    profileImage?: string; // URL or identifier for the image
    createdAt: string; // or Date (if you convert it)
    updatedAt: string;
}