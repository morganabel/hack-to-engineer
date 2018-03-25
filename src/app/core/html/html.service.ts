import { Injectable } from '@angular/core';
import * as cheerio from 'cheerio';

@Injectable()
export class HtmlService {

  constructor() { }

  getParser(input: string, options?: CheerioOptionsInterface) {
    return cheerio.load(input, options);
  }
}
