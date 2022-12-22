import InstalledApplication from "../../types/store/installedApplication.js"
import { returnBase64Svg } from "../libServer.js"
import * as path from "path"

const includedApps: InstalledApplication[] = [
  {
    name: "endpoint-tester",
    displayName: "Endpoint Tester",
    description: "Test yourdash server endpoints",
    icon: returnBase64Svg(path.resolve("./data/assets/apps/endpoint-tester/icon.svg")),
    author: "Ewsgit",
    copyright: "MIT",
    moduleRequirements: [],
    previewImages: [],
    path: "/app/endpoint-tester"
  },
  {
    name: "dash",
    displayName: "Dashboard",
    description: "The YourDash dashboard",
    icon: returnBase64Svg(path.resolve("./data/assets/apps/dash/icon.svg")),
    author: "Ewsgit",
    copyright: "MIT",
    moduleRequirements: [],
    previewImages: [],
    path: "/app/dash"
  },
  {
    name: "files",
    displayName: "Files",
    description: "The YourDash file manager",
    icon: returnBase64Svg(path.resolve("./data/assets/apps/files/icon.svg")),
    author: "Ewsgit",
    copyright: "MIT",
    moduleRequirements: [],
    previewImages: [],
    path: "/app/files"
  }, {
    name: "store",
    displayName: "Store",
    description: "The YourDash application and extension manager",
    icon: returnBase64Svg(path.resolve("./data/assets/apps/store/icon.svg")),
    author: "Ewsgit",
    copyright: "MIT",
    moduleRequirements: [],
    previewImages: [],
    path: "/app/store"
  }, {
    name: "settings",
    displayName: "Settings",
    description: "The YourDash settings manager",
    icon: returnBase64Svg(path.resolve("./data/assets/apps/settings/icon.svg")),
    author: "Ewsgit",
    copyright: "MIT",
    moduleRequirements: [],
    previewImages: [],
    path: "/app/settings"
  }
]

export default includedApps