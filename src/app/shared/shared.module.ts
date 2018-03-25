import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoaderComponent } from './loader/loader.component';
import { CodeEditorComponent } from './code-editor/code-editor.component';
import { EditorModule } from '@tinymce/tinymce-angular';
// Import TinyMCE
import 'tinymce';

// A theme is also required
import 'tinymce/themes/modern/theme';

// Any plugins you want to use has to be imported
import 'tinymce/plugins/advlist';
import 'tinymce/plugins/anchor';
import 'tinymce/plugins/autolink';
import 'tinymce/plugins/autoresize';
import 'tinymce/plugins/charmap';
import 'tinymce/plugins/code';
import 'tinymce/plugins/codesample';
import 'tinymce/plugins/contextmenu';
import 'tinymce/plugins/fullscreen';
import 'tinymce/plugins/image';
import 'tinymce/plugins/imagetools';
import 'tinymce/plugins/insertdatetime';
import 'tinymce/plugins/link';
import 'tinymce/plugins/lists';
import 'tinymce/plugins/media';
import 'tinymce/plugins/noneditable';
import 'tinymce/plugins/paste';
import 'tinymce/plugins/preview';
import 'tinymce/plugins/print';
import 'tinymce/plugins/save';
import 'tinymce/plugins/searchreplace';
import 'tinymce/plugins/table';
import 'tinymce/plugins/template';
import 'tinymce/plugins/visualblocks';
import { EditorComponent } from './editor/editor.component';
import { NewItemComponent } from './new-item/new-item.component';
import { MaterialModule } from '@app/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LinkItemComponent } from './link-item/link-item.component';
import { LinkItemDialogComponent } from './link-item/link-item-dialog/link-item-dialog.component';
import { FusePipe } from './fuse.pipe';
import { InlineEditComponent } from './inline-edit/inline-edit.component';
import { ImportContentComponent } from './import-content/import-content.component';
import { MonacoLoaderDirective } from './code-editor/monaco-loader.directive';
import { TagsComponent } from './tags/tags.component';
import { CollectionNamePipe } from './collection-name.pipe';
import { SearchBoxComponent } from './search-box/search-box.component';
import { TextBlockRenderComponent } from './text-block-render/text-block-render.component';
import { DatalistComponent } from './datalist/datalist.component';
import { ItemStatusComponent } from './item-status/item-status.component';

@NgModule({
  imports: [
    MaterialModule,
    FlexLayoutModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    EditorModule
  ],
  providers: [
  ],
  declarations: [
    LoaderComponent,
    CodeEditorComponent,
    EditorComponent,
    NewItemComponent,
    LinkItemComponent,
    LinkItemDialogComponent,
    FusePipe,
    InlineEditComponent,
    ImportContentComponent,
    MonacoLoaderDirective,
    TagsComponent,
    CollectionNamePipe,
    SearchBoxComponent,
    TextBlockRenderComponent,
    DatalistComponent,
    ItemStatusComponent
  ],
  entryComponents: [
    LinkItemDialogComponent
  ],
  exports: [
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    LoaderComponent,
    CodeEditorComponent,
    EditorComponent,
    NewItemComponent,
    LinkItemComponent,
    LinkItemDialogComponent,
    FusePipe,
    InlineEditComponent,
    ImportContentComponent,
    MonacoLoaderDirective,
    TagsComponent,
    CollectionNamePipe,
    SearchBoxComponent,
    TextBlockRenderComponent,
    ItemStatusComponent
  ]
})
export class SharedModule { }
