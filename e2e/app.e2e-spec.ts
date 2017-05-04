import { NodebotPage } from './app.po';

describe('nodebot App', function() {
  let page: NodebotPage;

  beforeEach(() => {
    page = new NodebotPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
