
export interface Experience {
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
        EndDate: new Date("2026-04"),
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
        projects: ['The Turn', 'Server Usage Frontend', 'Sparta Health']
    },
]

export interface Project {
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
        name: "FDC Digital",
        stack: ['Next.js', 'React', 'TypeScript', 'Tailwind', 'Shadcn/UI', 'Lerna', 'Feature Flags', 'React-Hook-Form', 'Storybook', 'Vitest', 'Nx'],
        date: new Date("2025-08"),
        liveUrl: '',
        desc: "FDC Digital is a compliance management platform that digitizes paper-based audit workflows for childcare providers. As the Solo Frontend Developer, I took ownership of frontend sprint delivery and stabilized complex deployment pipelines. To solve critical 'Version Drift' across environments, I implemented Trunk-Based Development and introduced Feature Flags, which significantly reduced delivery time. This shifted us to a faster release cadence where bug patches reach Production in minutes and features can be tested safely without long-lived staging branches. The architecture includes a Next.js App Router with Zod-driven Server Actions and a proprietary 'Builder Pattern' for white-labeling."
    },
    {
        name: "LCP Group / M Core Portfolio",
        stack: ['Next.js', 'React', 'TypeScript', 'Tailwind', 'Google Maps API', 'Jixaw (CMS)', 'Axios', 'React-Hook-Form', 'Shadcn/UI', 'Supercluster'],
        date: new Date("2025-08"),
        liveUrl: '',
        desc: "A multi-tenant property portfolio platform powering three major real estate brands from a single Next.js codebase. My primary challenge was visualizing thousands of property assets without degrading performance. I engineered a high-performance interactive map handling over a thousand assets using supercluster for client-side clustering, maintaining 60fps by calculating the viewport bounding box in real-time. Additionally, I architected a URL-first state management system where every filter change synchronizes with the URL query string, ensuring instant UI feedback while making complex search results bookmarkable, shareable, and SEO-friendly."
    },
    {
        name: "Badland Antennas",
        stack: ['Next.js', 'React', 'TypeScript', 'Tailwind', 'Axios', 'Google Analytics', 'Lucide React', 'Jixaw (CMS)'],
        date: new Date("2025-08"),
        liveUrl: '',
        desc: "Badland Antennas is a B2B industrial catalog where I bridged the gap between technical implementation and business strategy. I engineered a URL-driven product filtering system utilizing Next.js Server Components to ensure search results were bookmarkable and SEO-friendly. I also developed a seamless Request a Quote workflow featuring auto-filled data for authenticated trade users and implemented high-fidelity conversion tracking for Google Ads. Uniquely for a developer role, I conducted on-site client training at their manufacturing facility where I identified a gap in their marketing workflow and successfully cross-sold an internal SaaS product to the client."
    },
    {
        name: "Robertson Restoration",
        stack: ['Next.js', 'React', 'TypeScript', 'SCSS', 'Jixaw (CMS)', 'React Hooks',],
        date: new Date("2025-08"),
        liveUrl: '',
        desc: "Robertson Restoration is a regional property recovery service requiring a fast-loading digital presence. Facing a strict MVP deadline before our internal CMS was fully operational, I adopted a modular, contract-first strategy. I built the frontend components using strict TypeScript interfaces, and once the CMS became available, I configured the data models myself to match my UI props exactly, allowing for a seamless migration without requiring backend support. Technically, I leveraged the experimental React use hook to handle asynchronous data fetching without client-side waterfalls, and engineered a highly performant, pure CSS before-and-after image slider to eliminate layout shifts and maintain excellent Core Web Vitals."
    },
    {
        name: "Drag-and-Drop Email Builder",
        stack: ['React', 'TypeScript', 'Tailwind', 'dnd-kit', 'Lexical', 'Zustand', 'React-Email', 'Storybook', 'Cypress', 'Vite'],
        date: new Date("2025-08"),
        liveUrl: '',
        desc: "This project is the core framework-agnostic builder engine for the ShootMyMail SaaS platform, designed to produce table-based, email-safe HTML while offering a modern drag-and-drop experience. I architected the state using a recursive, object-oriented node structure, enabling the infinite nesting of rows and columns that standard libraries struggle to handle. To bridge this mutable class-based model with Reacts immutable lifecycle, I engineered a high-performance rendering engine using React memo and a global Zustand store, keeping drag operations under 50 milliseconds. Additionally, I solved focus-stealing conflicts by building a dedicated drag handle system for Lexical rich-text blocks, and integrated React-Email to compile the JSON state tree into responsive HTML."
    },
    {
        name: "Gym Tech - IMU Trajectory Analyzer",
        stack: ['Next.js', 'TypeScript', 'Python', 'FastAPI', 'Node.js', 'React Native', 'Docker', 'SerialPort', 'Pandas', 'SciPy', 'Arduino', 'Jupyter'],
        date: new Date("2025-08"),
        liveUrl: '',
        desc: "A distributed IoT research platform designed to capture and analyze 3D motion data from Arduino-based IMU sensors. To solve the critical issue of double integration drift in accelerometers, I prototyped Extended Kalman Filters and RK4 integration methods in Jupyter before porting them to a production Python microservice. I architected a split-brain system that decouples fragile high-frequency serial logging in Node.js from heavy mathematical processing in FastAPI, ensuring zero sensor data loss even during heavy analysis loads or algorithmic crashes. Furthermore, I built a server-driven UI engine where the Next.js frontend dynamically renders tuning controls based on JSON schemas fetched from the Python backend, allowing researchers to rapidly iterate on physics models without requiring frontend redeployments."
    },
    {
        name: "The Turn (Band Site)",
        stack: ['Next.js', 'TypeScript', 'SCSS', 'Material UI', 'Docker', 'Kubernetes', 'Next/Image'],
        date: new Date("2025-08"),
        liveUrl: '',
        desc: "The Turn is a responsive portfolio and event tracking site for a local music band, optimized for speed and visual impact. Working under a strict deadline without a dedicated CMS backend, I engineered a mock API abstraction layer to structure static data access. This decoupled the frontend components from the hardcoded data files, making the architecture future-proof for easy CMS integration later. To handle hundreds of local high-resolution assets, I built a custom masonry layout featuring a randomized image algorithm and utilized Next.js image optimization to ensure high performance across devices. The final application was containerized with Docker and deployed to an internal Kubernetes cluster."
    },
    {
        name: "Sparta Health",
        stack: ['JavaScript', 'jQuery', 'SCSS', 'PHP', 'FontAwesome', 'Sass Compiler', 'Chrome DevTools', 'Internal CMS'],
        date: new Date("2025-08"),
        liveUrl: '',
        desc: "Sparta Health is an occupational health platform where I led a complete responsive retrofit during my university placement. Tasked with modernizing a rigid, desktop-only legacy PHP monolith without modifying the underlying backend logic, I engineered a custom responsive layout system using SCSS. I resolved deep-seated UI inconsistencies and safely overrode legacy global styles to ensure cross-browser compatibility. By refactoring the styling into modular components and redesigning complex health questionnaires for smaller screens, I successfully transformed the platform into a fully mobile-accessible experience for patients and clinics."
    },
    {
        name: "Warehouse Order Picking System",
        stack: ['Next.js', 'React', 'TypeScript', 'Material UI', 'SCSS', 'Storybook', 'LocalStorage API', 'PWA', 'Barcode Integration'],
        date: new Date("2025-08"),
        liveUrl: '',
        desc: "The Order Picking System is a dedicated internal progressive web app built for warehouse employees to streamline the fulfillment of book orders. Focused on extreme reliability in a physical environment where devices frequently lose connection or enter sleep mode, I architected a persistent state layer using LocalStorage. This ensured workers never lost active filters or order selections during their shifts. I integrated hardware barcode scanner support via global event listeners for rapid data entry and designed a custom task-finding algorithm. This algorithm intelligently guides users through optimal shelf routes and manages missing stock through a snooze workflow, maintaining picking momentum despite inventory discrepancies."
    },
    {
        name: "Miniature Self-Driving Bicycle Prototype",
        stack: ['C++', 'Arduino', 'Embedded C', 'Arduino UNO', 'L298N Motor Driver', 'Ultrasonic Sensors', 'CAD modeling', '3D Printing'],
        date: new Date("2025-08"),
        liveUrl: '',
        desc: "This final-year university project explores autonomous navigation through a custom-built miniature bicycle prototype. As the sole engineer, I owned the entire lifecycle from designing and 3D printing a custom chassis to circuit assembly and embedded C++ programming. The core logic relies on a sensor fusion approach, utilizing infrared sensors for track following and an ultrasonic sensor for obstacle detection. I implemented a reactive state machine on an Arduino to process these inputs and drive the steering and propulsion motors in real time. Through rigorous testing, I successfully demonstrated autonomous track navigation and obstacle avoidance while identifying and documenting key hardware constraints around power distribution and real-time processing loops."
    }
];

export const contactData = {
    title: 'Get In Touch',
    description: "I'm currently looking for new opportunities, my inbox is always open. Whether you have a question or just want to say hi, I'll try my best to get back to you!",
    successMessage: 'Message sent successfully!',
    errorMessage: 'Failed to send message. Please try again.',
    placeholders: {
        email: 'your email *',
        message: 'Say hello...',
        name: 'Full Name *'
    },
    buttons: {
        send: 'SEND',
        sending: 'SENDING...'
    }
}
