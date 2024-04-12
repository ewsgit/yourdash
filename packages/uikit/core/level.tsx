/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { createContext, useContext } from "solid-js";

const LevelContext = createContext(0);
export default LevelContext;

export const useLevel = () => useContext(LevelContext);
