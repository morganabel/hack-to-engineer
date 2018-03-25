/*
 * Extra typings definitions
 */

/// <reference path="../node_modules/monaco-editor/monaco.d.ts" />

// Allow .json files imports
declare module '*.json';
declare module 'tinymce/tinymce';
declare var Prism: any;

// SystemJS module definition
declare var module: NodeModule;
interface NodeModule {
  id: string;
}
