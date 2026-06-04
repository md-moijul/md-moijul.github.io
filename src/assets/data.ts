
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
        desc: 'Returning back as full-time as a software developer, I focused on building an interactive, drag-and-drop email editor Software as a service using React, TypeScript, Tailwind, Storybook, Lexical, and React-Email.',
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
        projects: ['Shoot My Mail', 'WX-Dnd', 'The Turn', 'Server Usage Frontend', 'Sparta Health']
    },
]

interface Project {
    name: string;
    desc: string;
    summary?: string;
    date?: Date;
    imageUrl?: string;
    sourceCode?: string;
    liveUrl?: string;
    stack: string[];
}

export const projects: Project[] = [
    {
        name: 'FDC Digital',
        desc: `Delivered a digital checklist application that transformed the compliance workflow for childcare providers, now actively used by over 10 schools. As the sole front-end developer responsible for new features, I built out the user-facing product from its early stages, focusing on creating an intuitive and reliable experience. This involved developing within a scalable monorepo architecture to ensure the product's successful launch, adoption, and ongoing feature development based on client feedback.`,
        date: new Date("2024-01"),
        sourceCode: 'https://github.com/moijul/fdc-digital',
        liveUrl: 'https://fdcdigital.com.au/',
        stack: ['nextjs', 'react', 'typescript', 'mongo', 'tailwind', 'shadcn', 'react-hook-form', 'zod', 'storybook', 'vitest', 'monorepo']
    },
    {
        name: 'Gym-tech',
        desc: `This was an R&D venture for designing a wearable device which could track user training sessions and visualize the data to the coach/personal trainer. I was primarily part of data collection using Arduino and displacement calculation using IMU sensors.`,
        date: new Date("2024-03"),
        stack: ['python', 'arduino', 'matplotlib', 'flask', 'express']
    },
    {
        name: 'Badland',
        desc: `An Ecommerce site for a British electric components manufacturing company, specialized in antennas. In this site, a user is able to view a list of products, filter to their need, purchase to their liking and pay for the payment right from the site. This is another website primarily built with Jixaw.`,
        date: new Date("2023-11"),
        stack: ['jixaw', 'react', 'typescript', 'mongo', 'tailwind', 'shadcn']
    },
    {
        name: 'LCP Group',
        desc: `This Real Estate company has multiple portfolio websites, where they promote their Estates and Units. This was an interesting project because we had to design 3 different websites from one data source using our internal CMS system Jixaw. Apart from this, another challenging task was to visualize the units using Google Maps API.`,
        date: new Date("2023-08"),
        stack: ['jixaw', 'react', 'typescript', 'mongo', 'tailwind', 'shadcn', 'react-google-maps']
    },
    {
        name: 'Robertson Restoration',
        desc: `A Restoration Company website to showcase their services, previous works and testimonials. Initially built with Next.js and gradually switched to Jixaw, our internal CMS system.`,
        date: new Date("2023-05"),
        stack: ['jixaw', 'react', 'typescript', 'mongo', 'scss']
    },
    {
        name: 'Order Picking System',
        desc: `This was a web system for warehouse employees for them to pick orders using a barcode scanner.`,
        date: new Date("2023-12"),
        stack: ['react', 'typescript', 'mongo', 'mui']
    },
    {
        name: 'Email Editor',
        desc: `Another Internal package with the primary goal being drag-and-drop email building. The reasoning was this is the package capable of lifting all the heavy stuff of email building and adding this will allow us to add the email builder to any React app. It uses dnd-kit for all the drag and drop functionality and Lexical for the rich text editor.`,
        date: new Date("2024-02"),
        stack: ['react', 'typescript', 'tailwind', 'shadcn', 'dndkit', 'lexical']
    },
    {
        name: 'WX-Dnd',
        desc: `This was an internal drag and drop library planned to be used in Shoot My Mail. It was capable of animating drag and drop behaviour within a context parent. However, it was deprecated and we used a community-built library instead for better support and features.`,
        date: new Date("2023-02"),
        stack: ['react', 'typescript', 'tailwind', 'redux']
    },
    {
        name: 'Shoot My Mail',
        desc: `An email building and automation platform. It allows users to create, send and track email campaigns. My work involved building some dashboard features and improving existing design.`,
        date: new Date("2022-12"),
        stack: ['react', 'typescript', 'mui']
    },
    {
        name: 'The Turn',
        desc: `This is a landing site for The Turn Band, where users are able to view an image gallery of previous events and a page to view upcoming gigs. This was another project built from the ground up by me.`,
        date: new Date("2023-01"),
        stack: ['react', 'typescript', 'tailwind', 'shadcn']
    },
    {
        name: 'Server Usage Frontend',
        desc: `This was a project which was built from the ground up by me. This project takes the server APIs and visualizes the usage and other specs of the server and namespaces in a dashboard fashion. It has search and filter functionality to see details on individual clients and their usage of resources for each month.`,
        date: new Date("2022-10"),
        stack: ['react', 'typescript', 'tailwind', 'shadcn']
    },
    {
        name: 'Sparta Health',
        desc: `This was my very first project as a placement student. This was a fully functioning web app which lacked responsiveness. I worked on making it compatible with different devices and browsers, and also contributed to the animations.`,
        date: new Date("2022-09"),
        stack: ['javascript', 'jquery', 'css']
    },
]
