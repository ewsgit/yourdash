/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { Heading, MajorButton } from "@yourdash/web-client/src/ui/index";

const AuthorizeDiscordPage: React.FC = () => {
  return (
    <div className={"flex items-center justify-center h-full flex-col gap-16 text-center"}>
      <Heading level={1}>Authorize YourDash Chatbots</Heading>
      <p className={"-mt-16"}>To continue to YourDash Chatbots, you need to authorize your Discord account</p>
      <MajorButton
        onClick={() => {
          window.location.href = `https://discord.com/oauth2/authorize?response_type=code&client_id=157730590492196864&scope=identify%20guilds.join&state=15773059ghq9183habn&redirect_uri=https%3A%2F%2Fnicememe.website&prompt=consent
`;
        }}
      >
        Click to continue
      </MajorButton>
    </div>
  );
};

export default AuthorizeDiscordPage;
