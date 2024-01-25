/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import CodeStudioLanguage from "./language";
import CodeStudioLanguages from "./languages";

export default async function registerLanguage(
  languageName: (typeof CodeStudioLanguages)[keyof typeof CodeStudioLanguages]["language"],
): Promise<CodeStudioLanguage | null> {
  try {
    // prettier-ignore
    // noinspection JSPotentiallyInvalidConstructorUsage
    return new // @ts-ignore
    ( await import.meta.glob(`./**/language.ts`)[`./${languageName}/language.ts`]()).default();
  } catch (e) {
    return null;
  }
}
