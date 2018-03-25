import { Injectable } from '@angular/core';
import { HtmlService } from '@app/core/html/html.service';
import { FirestoreService } from '@app/core/firestore/firestore.service';
import { CODE_BLOCK_ID_CLASS_PREFIX, CodeBlock } from '@app/core/code/code';
import { DocumentReference } from '@firebase/firestore-types';
import { FirestoreCollection } from '@app/shared/firestore-collection.enum';
import { find as _find } from 'lodash-es';

@Injectable()
export class CodeService {

  constructor(private htmlService: HtmlService, private firestore: FirestoreService) { }

  findAndEnhanceCodeBlocks(html: string): Promise<string> {
    const $ = this.htmlService.getParser(html);

    // Finds code blocks in content.
    var nodes = $(`pre[class*="language-"]`);
    var promises = new Array<Promise<void>>();

    nodes.each((i, element) => {
      const classesArray = this.getClassesAsArray(element);
      const codeBlockIdClass = _find(classesArray, (c) => {
        return c.startsWith(CODE_BLOCK_ID_CLASS_PREFIX);
      });

      let id = "";
      if (codeBlockIdClass) {
        // already has id.
        id = codeBlockIdClass.replace(CODE_BLOCK_ID_CLASS_PREFIX, "");
      } else {
        // no id.
        id = this.firestore.generateId();
      }

      const code = this.getCodeFromElement($, element, classesArray);
      let addPromise = this.addCodeToDb(id, code)
        .then(() => {
          $(element).addClass(`${CODE_BLOCK_ID_CLASS_PREFIX}${id}`);
        });

      promises.push(addPromise);
    });

    return Promise.all(promises)
      .then(() => {
        return $("body").html();
      });
  }

  addCodeToDb(id: string, code: CodeBlock): Promise<void> {
    return this.firestore.upsert(FirestoreCollection.CodeBlocks, id, code);
  }

  private getCodeFromElement($: CheerioStatic, element: CheerioElement, classes: string[]): CodeBlock {
    let language = "csharp";

    classes.forEach(c => {
      if (c.startsWith("language-")) {
        language = c.replace("language-", "");
      }
    });

    const code = $(element).find("code").first().html();

    return {
      language: language,
      code: code
    };
  }

  private getClassesAsArray(element: CheerioElement): string[] {
    const classes = element.attribs["class"];
    return (classes) ? classes.split(" ") : [];
  }
}
