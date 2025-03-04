export interface AboutOurTeam {
    id: string;
    name: string;
    title: string | null;  // Allow null values
    description: string;
    profileImage: string;
    published: boolean;
    createdAt: Date;
    updatedAt: Date;
  }