
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
        projects: ['LCP Group', 'Robertson Restoration', 'WX-Dnd', 'Email Editor']

    },
    {
        company: 'Wilxite',
        jobTitle: 'Software Developer (Placement Student)',
        desc: 'Completed a one-year placement where I primarily worked on a web application using Next.js, TypeScript, SCSS and Material UI to create interactive, responsive websites.',
        location: 'Stroud',
        startDate: new Date("2022-09"),
        EndDate: new Date("2023-09"),
        projects: ['Shoot My Mail', 'The Turn', 'Server Usage Frontend', 'Sparta Health',]

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
        name: 'Gym-tech',
        desc: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
        stack: ['react', 'typescript', 'mongo']
    },
    {
        name: 'Gym-tech',
        desc: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
        stack: ['react', 'typescript', 'mongo']
    },
    {
        name: 'SMM',
        desc: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
        stack: ['react', 'typescript', 'mongo']
    },
    {
        name: 'FDC',
        desc: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
        stack: ['react', 'typescript', 'mongo']
    },
    {
        name: 'LCP Group',
        desc: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
        stack: ['react', 'typescript', 'mongo']
    },
    {
        name: 'Robertson Restoration',
        desc: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
        stack: ['react', 'typescript', 'mongo']
    },
    {
        name: 'Sparta-Health',
        desc: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
        stack: []
    },
]