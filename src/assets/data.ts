
interface Experience {
    company: string;
    jobTitle: string;
    desc: string;
    location: string;
    url?: string;
    startDate: Date;
    EndDate: Date | 'present';
    stack: string[];
}

export const experiences: Experience[] = [
    {
        company: 'Wilxite',
        jobTitle: 'Software Developer',
        desc: 'Returning back as full-time as a software  developer, I focused on building interactive, drag-and-drop email editor Software as a service using React, TypeScript, Tailwind, Storybook,  Lexical, and React-Email.',
        location: 'Stroud',
        startDate: new Date(),
        EndDate: new Date(),
        stack: []
    },
    {
        company: 'Wilxite',
        jobTitle: 'Software Developer',
        desc: 'Returning back as full-time as a software  developer, I focused on building interactive, drag-and-drop email editor Software as a service using React, TypeScript, Tailwind, Storybook,  Lexical, and React-Email.',
        location: 'Stroud',
        startDate: new Date(),
        EndDate: new Date(),
        stack: []
    },
    {
        company: 'Wilxite',
        jobTitle: 'Software Developer',
        desc: 'Returning back as full-time as a software  developer, I focused on building interactive, drag-and-drop email editor Software as a service using React, TypeScript, Tailwind, Storybook,  Lexical, and React-Email.',
        location: 'Stroud',
        startDate: new Date(),
        EndDate: new Date(),
        stack: []
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
        stack: []
    },
    {
        name: 'Gym-tech',
        desc: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
        stack: []
    },
    {
        name: 'SMM',
        desc: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
        stack: []
    },
    {
        name: 'FDC',
        desc: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
        stack: []
    },
    {
        name: 'LCP Group',
        desc: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
        stack: []
    },
    {
        name: 'Robertson Restoration',
        desc: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
        stack: []
    },
    {
        name: 'Sparta-Health',
        desc: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
        stack: []
    },
]