
interface Experience {
    company: string;
    jobTitle: string;
    desc: string;
    location: string;
    url?: string;
    startDate: Date;
    EndDate: Date | 'present';
    projects: string[];
}

export const experiences: Experience[] = [
    {
        company: 'Wilxite',
        jobTitle: 'Software Developer',
        desc: 'Returning back as full-time as a software  developer, I focused on building interactive, drag-and-drop email editor Software as a service using React, TypeScript, Tailwind, Storybook,  Lexical, and React-Email.',
        location: 'Stroud',
        startDate: new Date("2024-05"),
        EndDate: new Date(),
        projects: ['FDC Digital', 'Gym Tech', 'LCP Group', 'Badland']

    },
    {
        company: 'Wilxite',
        jobTitle: 'Software Developer (Part-time) ',
        desc: 'Worked part-time during my final year at university, contributing to several projects, including a Book Order Picking System for a warehouse. Focused on building fully responsive web apps.',
        location: 'Stroud',
        startDate: new Date("2023-09"),
        EndDate: new Date("2024-05"),
        projects: ['Robertson Restoration', 'Order Picking System', 'Email Editor']

    },
    {
        company: 'Wilxite',
        jobTitle: 'Software Developer (Placement Student)',
        desc: 'Completed a one-year placement where I primarily worked on a web application using Next.js, TypeScript, SCSS and Material UI to create interactive, responsive websites.',
        location: 'Stroud',
        startDate: new Date("2022-09"),
        EndDate: new Date("2023-09"),
        projects: ['Shoot My Mail', 'WX-Dnd', 'The Turn', 'Server Usage Frontend', 'Sparta Health',]

    },
]


interface Project {
    name: string;
    desc: string;
    date?: Date;
    imageUrl?: string;
    sourceCode?: string;
    stack: string[];
}

export const projects: Project[] = [
    {
        name: 'FDC Digital',
        desc: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
        stack: ['nextjs', 'typescript', 'mongo', 'tailwind', 'shadcn',]
    },
    {
        name: 'Gym-tech',
        desc: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
        stack: ['python', 'arduino', 'matplotlib', 'flask', 'express']
    },
    {
        name: 'Badland',
        desc: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
        stack: ['jixaw', 'react', 'typescript', 'mongo', 'tailwind', 'shadcn']
    },
    {
        name: 'LCP Group',
        desc: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
        stack: ['jixaw', 'react', 'typescript', 'mongo', 'tailwind', 'shadcn']
    },
    {
        name: 'Robertson Restoration',
        desc: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
        stack: ['jixaw', 'react', 'typescript', 'mongo', 'scss']
    },
    {
        name: 'Order Picking System',
        desc: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
        stack: ['react', 'typescript', 'mongo', 'mui']
    },
    {
        name: 'Email Editor',
        desc: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
        stack: ['reeact', 'typescript', 'tailwind', 'shadcn']
    },
    // ['Shoot My Mail', 'WX-Dnd', 'The Turn', 'Server Usage Frontend', 'Sparta Health',]
    {
        name: 'Shoot My Mail',
        desc: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
        stack: ['reeact', 'typescript', 'tailwind', 'shadcn']
    },
    {
        name: 'WX-Dnd',
        desc: ``,
        stack: ['reeact', 'typescript', 'tailwind', 'shadcn']
    },
    {
        name: 'The Turn',
        desc: `This is a landing site for The Turn Band. where user are able to view image gallary of previous events and an page to view upcoming gigs. This was another Project build from ground up by me.`,
        stack: ['reeact', 'typescript', 'tailwind', 'shadcn']
    },
    {
        name: 'Server Usage Frontend',
        desc: `This was a project which was build on ground up by me. This project takes the Server api's and visulizes the usage and other specs of the server and namespaces in a dashboard fashion. it has search and filter functionality to see details on individual clients and their usege of resourses on each month.`,
        stack: ['reeact', 'typescript', 'tailwind', 'shadcn']
    },
    {
        name: 'Sparta Health',
        desc: `This was my very first project as a placement student. This was a fully functioning web app which lacked the responsiveness of the website. I worked on making it compatible on different devices and browsers. also contributed to the Animations`,
        stack: ['javascript', 'jquerry', 'css']
    },
]