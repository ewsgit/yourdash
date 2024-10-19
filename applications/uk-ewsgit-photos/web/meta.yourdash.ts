/**
 * This file is auto-generated by backend/src/coreRequest.ts during express server startup don't edit this file for any reason
*/
import openApi from "./openapi.yourdash.ts";import {ClientServerInteraction} from "@yourdash/csi/coreCSI.js";import {useNavigate} from "react-router-dom";const applicationMeta:{$schema:string;id:string;displayName:string;category:string;authors:{name:string;url:string;bio:string;avatarUrl:string}[];maintainers:{name:string;url:string;bio:string;avatarUrl:string}[];description:string;license:string;modules:{backend:{id:string;main:string;description:string;dependencies:{moduleType:"backend"|"frontend"|"officialFrontend";id:string}[];}[];frontend:{id:string;displayName:string;iconPath:string;url:string;devUrl:string;description:string;dependencies:{moduleType:"backend"|"frontend"|"officialFrontend";id:string}[];main:string;}[];officialFrontend:{id:string;main:string;displayName:string;iconPath:string;description:string;dependencies:{moduleType:"backend"|"frontend"|"officialFrontend";id:string}[];}[];};shouldInstanceRestartOnInstall:boolean;__internal__generatedFor:"frontend"|"officialFrontend";}={"$schema":"../../packages/backend/src/core/YourDashApplicationConfigJson.json","id":"uk-ewsgit-photos","displayName":"Photos","description":"This is the default application description, you can edit this information in this application's 'application.json'","category":"core","license":"MIT","maintainers":[{"name":"Ewsgit","avatarUrl":"https://avatars.githubusercontent.com/u/69800526?v=4","bio":"The creator of YourDash","url":"https://ewsgit.uk"}],"authors":[{"name":"Ewsgit","avatarUrl":"https://avatars.githubusercontent.com/u/69800526?v=4","bio":"The creator of YourDash","url":"https://ewsgit.uk"}],"modules":{"backend":[{"dependencies":[],"description":"The backend for the Photos application","id":"uk-ewsgit-photos-backend","main":"./backend/index.ts"}],"frontend":[],"officialFrontend":[{"id":"uk-ewsgit-photos-frontend","main":"./web/index.tsx","displayName":"Photos","iconPath":"./icon.avif","description":"","dependencies":[{"moduleType":"backend","id":"uk-ewsgit-photos-backend"}]}]},"shouldInstanceRestartOnInstall":true,"__internal__generatedFor":"officialFrontend"};export default applicationMeta;const acsi=new ClientServerInteraction<openApi>("/app/uk-ewsgit-photos-backend");const useNavigateTo=()=>{const navigate=useNavigate();return (path: string)=>navigate("/app/a/uk-ewsgit-photos-frontend"+path)};const modulePath = "/app/a/uk-ewsgit-photos-frontend";export{acsi,useNavigateTo,modulePath};
