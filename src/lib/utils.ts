import { HTMLNode } from "../types";

export const filterAst = (ast: HTMLNode): Partial<HTMLNode> => {
  const removeTheseKeys = new Set([
    "mode",
    "namespaceURI",
    "parentNode",
    "tagName",
  ]);

  return Object.entries(ast).reduce((accumulator, [key, value]) => {
    if (removeTheseKeys.has(key)) {
      return accumulator;
    }
    if (Array.isArray(value)) {
      return { ...accumulator, [key]: value.map(filterAst) };
    }
    return { ...accumulator, [key]: value };
  }, {} as Partial<HTMLNode>);
};

export const filterAst2 = (ast: HTMLNode): Partial<HTMLNode> => {
  const removeTheseKeys = new Set([
    "mode",
    "namespaceURI",
    "parentNode",
    "tagName",
    "rawAttrs",
    "nodeType",
    "id",
    "classList",
  ]);

  return Object.entries(ast).reduce((accumulator, [key, value]) => {
    if (removeTheseKeys.has(key)) {
      return accumulator;
    }

    if (Array.isArray(value)) {
      return { ...accumulator, [key]: value.map(filterAst2) };
    }

    return { ...accumulator, [key]: value };
  }, {} as Partial<HTMLNode>);
};

export const indentify =
  (indent: string, skipFirst: boolean) =>
  (text: string): string => {
    if (!text) return text;
    return (skipFirst ? "" : indent) + text.split("\n").join(`\n${indent}`);
  };

export const getAttribute = (
  tag: HTMLNode,
  attributeName: string,
  defaultValue: string,
): string => {
  if (!tag || !tag.attrs || !tag.attrs[0]) {
    return defaultValue;
  }
  const attribute = tag.attrs.find(
    (attribute) => attribute.name === attributeName,
  );

  if (!attribute) {
    return defaultValue;
  }

  return attribute.value;
};

export const getColorFromClass = (
  classAttribute: string = "",
): string | null => {
  if (classAttribute?.startsWith("x-cli-color-")) {
    return classAttribute?.slice(12);
  }

  return null;
};
