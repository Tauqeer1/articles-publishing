import { ArticlesPublishingAppPage } from './app.po';

describe('articles-publishing-app App', function() {
  let page: ArticlesPublishingAppPage;

  beforeEach(() => {
    page = new ArticlesPublishingAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
