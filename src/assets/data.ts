
export interface Role {
    title: string;
    startDate: Date;
    endDate: Date | 'present';
}

export interface Experience {
    company: string;
    roles: Role[];
    desc: string[];
    location: string;
    url?: string;
}

export const experiences: Experience[] = [
    {
        company: 'Wilxite',
        location: 'Stroud',
        url: 'https://wilxite.com',
        desc: [

            "I initially joined Wilxite as a Junior Software Developer for my university placement year, where I was tasked with modernizing legacy healthcare platforms and building responsive architectures. Based on my performance, I was offered a part-time role to continue working as a software engineer while I completed my final year of university.",
            "Following my graduation, I returned full-time as a  Developer and took complete ownership of the frontend architecture and sprint delivery for this complex B2B compliance SaaS. By implementing Trunk-Based Development and Feature Flags, I successfully stabilized the deployment pipelines, resolved critical version drift, and drastically reduced our feature delivery time.",
            "Alongside my core responsibilities on FDC Digital, I worked across a diverse portfolio of high-impact projects. This included engineering a high-performance clustered map for a multi-tenant real estate platform, architecting a distributed IoT trajectory analyzer, and engineered custom tooling like recursive drag-and-drop editors."
        ],
        roles: [
            {
                title: 'Software Developer (Permanent)',
                startDate: new Date("2024-05"),
                endDate: new Date("2026-04"),
            },
            {
                title: 'Software Developer (Part-time)',
                startDate: new Date("2023-09"),
                endDate: new Date("2024-05"),
            },
            {
                title: 'Software Developer (Internship)',
                startDate: new Date("2022-09"),
                endDate: new Date("2023-09"),
            },
        ]
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
    featured?: boolean;
}

export const projects: Project[] = [
    {
        name: "FDC Digital",
        stack: ['Next.js', 'React', 'TypeScript', 'Tailwind', 'Shadcn/UI', 'Lerna', 'Feature Flags', 'React-Hook-Form', 'Storybook', 'Vitest', 'Nx'],
        date: new Date("2025-08"),
        liveUrl: 'https://fdcdigital.com/',
        desc: "FDC Digital is a compliance management platform that digitizes paper-based audit workflows for childcare providers. I took ownership of frontend sprint delivery and stabilized complex deployment pipelines. To solve critical 'Version Drift' across environments, I implemented Trunk-Based Development and introduced Feature Flags, which significantly reduced delivery time. This shifted us to a faster release cadence where bug patches reach Production in minutes and features can be tested safely without long-lived staging branches. The architecture includes a Next.js App Router with Zod-driven Server Actions and a proprietary 'Builder Pattern' for white-labeling.",
        featured: true
    },
    {
        name: "Drag-and-Drop Email Builder",
        stack: ['React', 'TypeScript', 'Tailwind', 'dnd-kit', 'Lexical', 'Zustand', 'React-Email', 'Storybook', 'Cypress', 'Vite'],
        date: new Date("2025-04"),
        liveUrl: 'https://bigcatdigital.com/products/shoot-my-mail',
        desc: "This project is the core framework-agnostic builder engine for the ShootMyMail SaaS platform, designed to produce table-based, email-safe HTML while offering a modern drag-and-drop experience. I architected the state using a recursive, object-oriented node structure, enabling the infinite nesting of rows and columns that standard libraries struggle to handle. To bridge this mutable class-based model with Reacts immutable lifecycle, I engineered a high-performance rendering engine using React memo and a global Zustand store, keeping drag operations under 150 milliseconds. Additionally, I solved focus-stealing conflicts by building a dedicated drag handle system for Lexical rich-text blocks, and integrated React-Email to compile the JSON state tree into responsive HTML.",
        featured: true
    },
    {
        name: "LCP Group / M Core Portfolio",
        stack: ['Next.js', 'React', 'TypeScript', 'Tailwind', 'Google Maps API', 'Jixaw (CMS)', 'Axios', 'React-Hook-Form', 'Shadcn/UI', 'Supercluster'],
        date: new Date("2024-04"),
        liveUrl: 'https://lcpgroup.co.uk/',
        desc: "A multi-tenant property portfolio platform powering three major real estate brands from a single Next.js codebase. My primary challenge was visualizing thousands of property assets without degrading performance. I engineered a high-performance interactive map handling over a thousand assets using supercluster for client-side clustering, maintaining 60fps by calculating the viewport bounding box in real-time. Additionally, I architected a URL-first state management system where every filter change synchronizes with the URL query string, ensuring instant UI feedback while making complex search results bookmarkable, shareable, and SEO-friendly.",
    },
    {
        name: "Badland Antennas",
        stack: ['Next.js', 'React', 'TypeScript', 'Tailwind', 'Axios', 'Google Analytics', 'Lucide React', 'Jixaw (CMS)'],
        date: new Date("2024-08"),
        liveUrl: 'https://badland.co.uk/',
        desc: "Badland Antennas is a B2B industrial catalog where I bridged the gap between technical implementation and business strategy. I engineered a URL-driven product filtering system utilizing Next.js Server Components to ensure search results were bookmarkable and SEO-friendly. I also developed a seamless Request a Quote workflow featuring auto-filled data for authenticated trade users and implemented high-fidelity conversion tracking for Google Ads. Uniquely for a developer role, I conducted on-site client training at their manufacturing facility where I identified a gap in their marketing workflow and successfully cross-sold an internal SaaS product to the client.",
    },
    {
        name: "Robertson Restoration",
        stack: ['Next.js', 'React', 'TypeScript', 'SCSS', 'Jixaw (CMS)', 'React Hooks',],
        date: new Date("2024-01"),
        liveUrl: 'https://www.robertson-restoration.com/',
        desc: "Robertson Restoration is a regional property recovery service requiring a fast-loading digital presence. Facing a strict MVP deadline before our internal CMS was fully operational, I adopted a modular, contract-first strategy. I built the frontend components using strict TypeScript interfaces, and once the CMS became available, I configured the data models myself to match my UI props exactly, allowing for a seamless migration without requiring backend support. Technically, I leveraged the experimental React use hook to handle asynchronous data fetching and engineered a highly performant, pure CSS before-and-after image slider and maintain excellent Core Web Vitals.",

    },

    {
        name: "Gym Tech - IMU Trajectory Analyzer",
        stack: ['React Native', 'Python', 'FastAPI', 'Node.js', 'Docker', 'SerialPort', 'Pandas', 'SciPy', 'Arduino', 'Jupyter'],
        date: new Date("2025-04"),
        liveUrl: '',
        desc: "A distributed IoT research platform designed to capture and analyze 3D motion data from Arduino-based IMU sensors. To solve the critical issue of double integration drift in accelerometers, I prototyped Extended Kalman Filters and RK4 integration methods in Jupyter before porting them to a production Python microservice. I architected a split-brain system that decouples fragile high-frequency serial logging in Node.js from heavy mathematical processing in FastAPI, ensuring zero sensor data loss even during heavy analysis loads or algorithmic crashes. Furthermore, I built a server-driven UI engine where the Next.js frontend dynamically renders tuning controls based on JSON schemas fetched from the Python backend, allowing researchers to rapidly iterate on physics models without requiring frontend redeployments.",
        featured: true
    },
    {
        name: "The Turn (Band Site)",
        stack: ['Next.js', 'TypeScript', 'SCSS', 'Material UI', 'Docker', 'Kubernetes', 'Next/Image'],
        date: new Date("2023-04"),
        liveUrl: 'https://theturn.uk/',
        desc: "The Turn is a responsive portfolio and event tracking site for a local music band, optimized for speed and visual impact. Working under a strict deadline without a dedicated CMS backend, I engineered a mock API abstraction layer to structure static data access. This decoupled the frontend components from the hardcoded data files, making the architecture future-proof for easy CMS integration later. To handle hundreds of local high-resolution assets, I built a custom masonry layout featuring a randomized image algorithm and utilized Next.js image optimization to ensure high performance across devices. The final application was containerized with Docker and deployed to an internal Kubernetes cluster.",

    },
    {
        name: "Sparta Health",
        stack: ['JavaScript', 'jQuery', 'SCSS', 'PHP', 'FontAwesome', 'Sass Compiler', 'Chrome DevTools', 'Internal CMS'],
        date: new Date("2022-10"),
        liveUrl: 'https://www.sparta-health.co.uk/',
        desc: "Sparta Health is an occupational health platform where I led a complete responsive retrofit during my university placement. Tasked with modernizing a rigid, desktop-only legacy PHP platform without modifying the underlying backend logic, I engineered a custom responsive layout system using SCSS. I resolved deep-seated UI inconsistencies and safely overrode legacy global styles to ensure cross-browser compatibility. By refactoring the styling into modular components and redesigning complex health questionnaires for smaller screens, I successfully transformed the platform into a fully mobile-accessible experience for patients and clinics.",

    },
    {
        name: "Warehouse Order Picking System",
        stack: ['Next.js', 'React', 'TypeScript', 'Material UI', 'SCSS', 'Storybook', 'LocalStorage API', 'PWA', 'Barcode Integration'],
        date: new Date("2024-01"),
        liveUrl: 'https://peters.co.uk/',
        desc: "The Order Picking System is a dedicated internal progressive web app built for warehouse employees to streamline the fulfillment of book orders. Focused on extreme reliability in a physical environment where devices frequently lose connection or enter sleep mode, I architected a persistent state layer using LocalStorage. This ensured workers never lost active filters or order selections during their shifts. I integrated hardware barcode scanner support via global event listeners for easy and accurate data entry.",

    },
    {
        name: "Miniature Self-Driving Bicycle Prototype",
        stack: ['C++', 'Arduino', 'Embedded C', 'Arduino UNO', 'L298N Motor Driver', 'Ultrasonic Sensors', 'CAD modeling', '3D Printing'],
        date: new Date("2024-03"),
        liveUrl: '',
        desc: "This final-year university project explores autonomous navigation through a custom-built miniature bicycle prototype. As the sole engineer, I owned the entire lifecycle from designing and 3D printing a custom chassis to circuit assembly and embedded C++ programming. The core logic relies on a sensor fusion approach, utilizing infrared sensors for track following and an ultrasonic sensor for obstacle detection. I implemented a reactive state machine on an Arduino to process these inputs and drive the steering and propulsion motors in real time. Through rigorous testing, I successfully demonstrated autonomous track navigation and obstacle avoidance while identifying and documenting key hardware constraints around power distribution and real-time processing loops.",

    },
    {
        name: "Geospatial Route Optimization",
        stack: ['Python', 'Pandas', 'Dijkstra', 'A* Search'],
        date: new Date("2022-01"),
        desc: "Engineered a geospatial route optimization program utilizing real-world UK train station data to compute the shortest and most efficient travel routes. I modeled the national rail network as a complex weighted graph and implemented advanced pathfinding algorithms, heavily utilizing trees and advanced data structures. A core focus of the project was benchmarking algorithmic time and space complexities, comparing the efficiency of various sorting, greedy, pattern matching, and streaming algorithms against large datasets to ensure optimal performance.",

    },
    {
        name: "Student Accommodation Management System",
        stack: ['Python', 'Tkinter', 'SQLite', 'UML', 'OOP'],
        date: new Date("2021-11"),
        desc: "Led the frontend architecture for a multi-functional Student Accommodation Management system developed within an agile team environment. I built a unified graphical user interface using Tkinter that featured strict role-based access control, allowing managers full data manipulation rights, restricting wardens to updating cleaning statuses, and limiting students to read-only queries. The system was underpinned by a robust SQLite database for secure state management and was rigorously engineered by translating UML designs into functional code using SOLID principles.",

    },
    {
        name: "Unicorn Company Valuation Predictor",
        stack: ['Python', 'Scikit-learn', 'Pandas', 'NumPy', 'SVM', 'ANN', 'Jupyter'],
        date: new Date("2022-04"),
        desc: "Conducted predictive modeling on a Kaggle dataset to forecast the financial valuation of Unicorn Companies. I engineered a data pipeline to train, evaluate, and benchmark multiple machine learning algorithms, exploring both regression and classification algorithms. By analyzing the underlying mathematical architectures and performance metrics of Linear Regression, Support Vector Machines, and Artificial Neural Networks, I quantitatively determined that the ANN yielded the highest predictive accuracy for real-world company valuations.",

    },
    {
        name: "Custom Linux Command-Line Shell",
        stack: ['C', 'Linux/Unix', 'POSIX APIs'],
        date: new Date("2022-03"),
        desc: "Developed a custom Linux command-line shell capable of handling background processes, pipes, and standard I/O redirection. I engineered low-level system interactions from the ground up by implementing argument passing and custom system calls to securely interface with hardware resources. This project required a deep understanding of CPU instruction cycles, preemptive process scheduling, advanced memory management, and system security techniques, specifically mitigating buffer overflows via address space randomization.",

    },
    {
        name: "Full-Stack E-Commerce Store",
        stack: ['Python', 'Flask', 'JavaScript', 'CSS', 'SQLite', 'HTML', 'Agile/Scrum'],
        date: new Date("2022-05"),
        desc: "Co-developed a comprehensive, full-stack web-based e-commerce platform within a five-person agile team. I engineered the backend architecture using Python and Flask, paired with a custom frontend built using vanilla JavaScript and CSS. A major focus of my work was designing and integrating an advanced SQLite database schema to manage local inventory dynamically while seamlessly handling edge cases for external, off-platform item sales. The project emphasized professional project planning, systematic testing standards, and UI/UX design methodologies.",

    },
    {
        name: "Genetic Algorithm Optimizer",
        stack: ['Python', 'Matplotlib', 'Pandas', 'NumPy'],
        date: new Date("2021-11"),
        desc: "Engineered a Genetic Algorithm entirely from scratch in pure Python to solve complex mathematical optimization problems. I simulated evolutionary mechanics including random population generation, tournament selection, mutation steps, and elitism replacement to successfully locate the global minima of highly non-linear benchmark functions like Styblinski-Tang and Dixon-Price. The project required rigorous hyperparameter tuning of mutation rates, population sizes, and life cycles, utilizing Matplotlib to visualize algorithmic convergence and fitness improvements over thousands of generations.",

    },
    {
        name: "LSTM Weather Forecasting Model",
        stack: ['Python', 'TensorFlow', 'Keras', 'Pandas', 'NumPy'],
        date: new Date("2024-04"),
        desc: "Engineered a deep learning predictive model utilizing a Long Short-Term Memory (LSTM) network to forecast precipitation levels based on temporal weather data. I leveraged TensorFlow and Keras to process complex sequential datasets and mitigate vanishing gradient problems using Backpropagation Through Time. The project heavily focused on the core principles of time-series forecasting and training Recurrent Neural Networks to achieve highly accurate data regression on real-world inputs.",

    },
    {
        name: "Distributed AI Model Hosting Platform",
        stack: ['Python', 'Django', 'PostgreSQL'],
        desc: "Engineered a distributed, multi-role enterprise web platform using Python and Django to host, manage, and execute AI models. Working within an Agile framework, I implemented secure role-based access control dashboards with distinct workflows for customers, AI engineers, and finance managers. The platform featured dynamic AI model uploading by Model-View-Template design patterns and asynchronous data pipelines.",

    },
    {
        name: "SpiceMunch Native Android App",
        stack: ['Kotlin', 'Android Studio', 'Git', 'XML', 'JUnit'],
        desc: "Co-developed a native Android food ordering application named SpiceMunch within a collaborative team. I engineered the foundational activity flow and implemented complex UI features utilizing View Binding and Fragments for maximum modularity. By rigorously applying the MVVM architectural pattern, I successfully separated application logic from the user interface. Furthermore, I managed state via in-object data storage, utilized Intents for seamless data passing between activities, and conducted comprehensive unit testing for all models and ViewModels to ensure a highly robust application lifecycle.",

    },
    {
        name: "Security Threat Intelligence Visualizer",
        stack: ['Python', 'Pandas', 'Matplotlib', 'Seaborn', 'Jupyter'],
        desc: "Analyzed raw network traffic and system log datasets to identify and visualize anomalous behavior and potential cyber threats. Leveraging Python, Pandas, Matplotlib, and Seaborn within Jupyter Notebooks, I engineered a data pipeline to clean, process, and visually represent high-volume security event data. The project focused heavily on big data analytics principles and anomaly detection methodologies, successfully translating complex, high-velocity network logs into actionable visual threat intelligence.",

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
