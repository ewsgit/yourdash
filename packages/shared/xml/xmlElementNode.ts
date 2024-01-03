/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import XmlAttributeNode from "./xmlAttributeNode";

export default class XmlElementNode {
  namespaceURI: string;
  attributes: XmlAttributeNode[];

  constructor({
    nameSpaces,
    currentNodeNamespace,
  }: {
    nameSpaces: Map<string, string>;
    currentNodeNamespace: string;
  }) {
    const currentNamespaceURI = nameSpaces.get(currentNodeNamespace);
    if (!currentNamespaceURI) throw new Error("Namespace not found");
    this.namespaceURI = currentNamespaceURI;
  }
}
