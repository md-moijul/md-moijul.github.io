
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
    summery?: string;
    date?: Date;
    imageUrl?: string;
    sourceCode?: string;
    stack: string[];
}

export const projects: Project[] = [
    {
        name: 'FDC Digital',
        desc: `Delivered a digital checklist application that transformed the compliance workflow for childcare providers, now actively used by over 10 schools. As the sole front-end developer responsible for new features, I built out the user-facing product from its early stages, focusing on creating an intuitive and reliable experience. This involved developing within a scalable monorepo architecture to ensure the product's successful launch, adoption, and ongoing feature development based on client feedback.`,
        stack: ['nextjs', 'react', 'typescript', 'mongo', 'tailwind', 'shadcn', 'react-hook-form', 'zod', 'storybook', 'vitest', 'monorepo']
    },
    {
        name: 'Gym-tech',
        desc: `This was an RND venture for desiging an wearable device which could track user tranning session and visualize the data to the coach/personal trainer. I was primarily part of data collection using arduino and discplacement calculation using IMU sensors.`,
        stack: ['python', 'arduino', 'matplotlib', 'flask', 'express']
    },
    {
        name: 'Badland',
        desc: `An Ecommerce site for british electic componnets menufecture company, specialized on antennas. in this site a user is able to view list of products, filter to their need, purchace to their likings and pay for the payment right form the site. this is another website primarily build with Jixaw `,
        stack: ['jixaw', 'react', 'typescript', 'mongo', 'tailwind', 'shadcn']
    },
    {
        name: 'LCP Group',
        desc: `This Real Estate company's has multiple portfolio websites, where they promote their Estate and Units. this was an interesting project becaust we had to design 3 different websites from one data source using our internal CMS system jixaw, apart from this another challenging task was to visualize the units using google maps api`,
        stack: ['jixaw', 'react', 'typescript', 'mongo', 'tailwind', 'shadcn', 'react-goole-maps']
    },
    {
        name: 'Robertson Restoration',
        desc: `A Restoration Company website to showcase their services, previous works and testimonials. Initially build with nextjs and  gradually switched to Jixaw, our internal CMS system`,
        stack: ['jixaw', 'react', 'typescript', 'mongo', 'scss']
    },
    {
        name: 'Order Picking System',
        desc: `This was a web system for a warehouse employees for them to pick order using barcode scanner`,
        stack: ['react', 'typescript', 'mongo', 'mui']
    },
    {
        name: 'Email Editor',
        desc: `Another Internal package with primary goal being DND email building, the reasoning was this is the package capable of lifting all the heavy stuff of email building and addthing this will allow us to add the email builder to any react app. this uses dndkit for all the drag and drop functionality. and lexical for rich text editor.`,
        stack: ['reeact', 'typescript', 'tailwind', 'shadcn', 'dndkit', 'lexical']
    },

    {
        name: 'WX-Dnd',
        desc: `This was an internal Drag and drop library planned to used in Shoot my Mail. It was capable of animating drag and drop behaviour within context parent. however was depricated and used community build library instead for better support and features.`,
        stack: ['reeact', 'typescript', 'tailwind', 'redux']
    },
    {
        name: 'Shoot My Mail',
        desc: `An Email building and automation platform. It allows user to create, send and track email campains. my work was contained building some dashboard features and improving existed design.`,
        stack: ['reeact', 'typescript', 'mui']
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