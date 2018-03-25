import { CollectionNamePipe } from './collection-name.pipe';

describe('CollectionNamePipe', () => {
  it('create an instance', () => {
    const pipe = new CollectionNamePipe();
    expect(pipe).toBeTruthy();
  });
});
