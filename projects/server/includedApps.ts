import { type InstalledApplication } from "types/store/installedApplication.js"

const includedApps: InstalledApplication[] = [
  {
    author: "Ewsgit",
    copyright: "Ewsgit © 2023",
    license: "MIT",
    description: "Test yourdash server endpoints",
    displayName: "Endpoints",
    icon: "endpoints.png",
    moduleRequirements: [],
    name: "endpoints",
    path: "/app/endpoints",
    previewImages: [],
    category: "devtools",
    extensions: []
  },
  {
    author: "Ewsgit",
    copyright: "Ewsgit © 2023",
    license: "MIT",
    description: "The YourDash dashboard",
    displayName: "Dashboard",
    icon: "dash.png",
    moduleRequirements: [],
    name: "dash",
    path: "/app/dash",
    previewImages: [],
    category: "core",
    extensions: [
      {
        name: "recent_files",
        license: "MIT",
        description: "shows your recent files",
        copyright: "Ewsgit © 2023",
        displayName: "Recent Files"
      },
      {
        name: "recent_tasks",
        license: "MIT",
        description: "shows your recent tasks",
        copyright: "Ewsgit © 2023",
        displayName: "Recent Tasks"
      },
      {
        name: "recent_whiteboards",
        license: "MIT",
        description: "shows your recent whiteboards",
        copyright: "Ewsgit © 2023",
        displayName: "Recent Whiteboards"
      },
      {
        name: "recent_flows",
        license: "MIT",
        description: "shows your recent flows",
        copyright: "Ewsgit © 2023",
        displayName: "Recent Flows"
      }
    ]
  },
  {
    author: "Ewsgit",
    copyright: "Ewsgit © 2023",
    license: "MIT",
    description: "The YourDash file manager",
    displayName: "Files",
    icon: "files.png",
    moduleRequirements: [
      "files"
    ],
    name: "files",
    path: "/app/files",
    previewImages: [],
    category: "core",
    extensions: []
  },
  {
    author: "Ewsgit",
    copyright: "Ewsgit © 2023",
    license: "MIT",
    description: "The YourDash application and extension manager",
    displayName: "Store",
    icon: "store.png",
    moduleRequirements: [
      "store"
    ],
    name: "store",
    path: "/app/store",
    previewImages: [],
    category: "core",
    extensions: []
  },
  {
    author: "Ewsgit",
    copyright: "Ewsgit © 2023",
    license: "MIT",
    description: "The YourDash settings manager",
    displayName: "Settings",
    icon: "settings.png",
    moduleRequirements: [],
    name: "settings",
    path: "/app/settings",
    previewImages: [],
    category: "core",
    extensions: []
  },
  {
    author: "Ewsgit",
    copyright: "Ewsgit © 2023",
    license: "MIT",
    description: "The YourDash built-in mastodon client",
    displayName: "Mastodon",
    icon: "mastodon.png",
    moduleRequirements: [],
    name: "mastodon",
    path: "/app/mastodon",
    previewImages: [],
    category: "social",
    extensions: []
  },
  {
    author: "Ewsgit",
    copyright: "Ewsgit © 2023",
    license: "MIT",
    description: "The todo list / task organization application for YourDash",
    displayName: "Tasks",
    icon: "placeholder-icon.png",
    moduleRequirements: [
      "tasks"
    ],
    name: "tasks",
    path: "/app/tasks",
    previewImages: [],
    category: "productivity",
    extensions: []
  },
  {
    author: "Ewsgit",
    copyright: "Ewsgit © 2023",
    license: "MIT",
    description: "The YourDash code editor, edit files seamlessly with others.",
    displayName: "Code Studio",
    icon: "code-studio.png",
    moduleRequirements: [],
    name: "code-studio",
    path: "/app/code-studio",
    previewImages: [],
    category: "devtools",
    underDevelopment: true,
    extensions: []
  },
  {
    author: "Ewsgit",
    copyright: "Ewsgit © 2023",
    license: "MIT",
    description: "Build flowcharts and diagrams.",
    displayName: "Flow",
    icon: "placeholder-icon.png",
    moduleRequirements: [],
    name: "flow",
    path: "/app/flow",
    previewImages: [],
    category: "productivity",
    underDevelopment: true,
    extensions: []
  },
  {
    author: "Ewsgit",
    copyright: "Ewsgit © 2023",
    license: "MIT",
    description: "Plan and explain concepts to others in real-time.",
    displayName: "Whiteboard",
    icon: "placeholder-icon.png",
    moduleRequirements: [],
    name: "whiteboard",
    path: "/app/whiteboard",
    previewImages: [],
    category: "productivity",
    underDevelopment: true,
    extensions: []
  },
  {
    author: "Ewsgit",
    copyright: "Ewsgit © 2023",
    license: "MIT",
    description: "Write and share rich-text documents with others.",
    displayName: "Author",
    icon: "placeholder-icon.png",
    moduleRequirements: [],
    name: "author",
    path: "/app/author",
    previewImages: [],
    category: "productivity",
    underDevelopment: true,
    extensions: []
  },
  {
    author: "Ewsgit",
    copyright: "Ewsgit © 2023",
    license: "MIT",
    description: "Create and present slideshows.",
    displayName: "Presenter",
    icon: "placeholder-icon.png",
    moduleRequirements: [],
    name: "presenter",
    path: "/app/presenter",
    previewImages: [],
    category: "productivity",
    underDevelopment: true,
    extensions: []
  },
  {
    author: "Ewsgit",
    copyright: "Ewsgit © 2023",
    license: "MIT",
    description: "Create spreadsheets with others.",
    displayName: "Crunch",
    icon: "placeholder-icon.png",
    moduleRequirements: [],
    name: "crunch",
    path: "/app/crunch",
    previewImages: [],
    category: "productivity",
    underDevelopment: true,
    extensions: []
  },
  {
    author: "Ewsgit",
    copyright: "Ewsgit © 2023",
    license: "MIT",
    description: "Access the server console.",
    displayName: "Terminal",
    icon: "placeholder-icon.png",
    moduleRequirements: [],
    name: "terminal",
    path: "/app/terminal",
    previewImages: [],
    category: "devtools",
    underDevelopment: true,
    extensions: []
  },
  {
    author: "Ewsgit",
    copyright: "Ewsgit © 2023",
    license: "MIT",
    description: "Search the internet.",
    displayName: "Search",
    icon: "placeholder-icon.png",
    moduleRequirements: [],
    name: "search",
    path: "/app/search",
    previewImages: [],
    category: "productivity",
    underDevelopment: true,
    extensions: []
  },
  {
    author: "Ewsgit",
    copyright: "Ewsgit © 2023",
    license: "MIT",
    description: "Edit raw text files.",
    displayName: "Text editor",
    icon: "placeholder-icon.png",
    moduleRequirements: [],
    name: "text-editor",
    path: "/app/text-editor",
    previewImages: [],
    category: "productivity",
    underDevelopment: true,
    extensions: []
  }
]

export default includedApps

export const DEFAULT_APPS = [
  "dash",
  "files",
  "store",
  "settings"
]
