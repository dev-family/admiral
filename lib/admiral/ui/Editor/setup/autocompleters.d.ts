import { Editor as TinyEditor } from '@tinymce/tinymce-react';
import { AutocompleterConfig } from '../interfaces';
declare type TinyMCEEditor = TinyEditor['editor'];
export declare function setupAutocompleters(editor: TinyMCEEditor, config: AutocompleterConfig | AutocompleterConfig[]): void;
export {};
