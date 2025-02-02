/*
 * Copyright ©2025 Ewsgit <https://ewsgit.uk> and YourDash <https://yourdash.ewsgit.uk> contributors.
 * YourDash is licensed under the MIT License. (https://mit.ewsgit.uk)
 */

import { useEffect, useState } from "react";
import { ZodType } from "zod";

export default function useResource<T extends object, TReturn extends keyof T | undefined>(
  resource: () => Promise<T>,
  options: { dependencies?: unknown[]; return?: TReturn },
): (TReturn extends keyof T ? T[TReturn] : T) | undefined {
  const [data, setData] = useState(undefined);

  useEffect(() => {
    setData(undefined);
    resource().then((d) => {
      if (options.return) {
        // @ts-ignore
        setData(d[options.return]);
      } else {
        // @ts-ignore
        setData(d);
      }
    });
  }, options.dependencies || []);

  return data;
}
