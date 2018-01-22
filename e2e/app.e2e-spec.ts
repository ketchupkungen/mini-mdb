import { FrontendSamplePage } from './app.po';

describe('frontend-sample App', () => {
  let page: FrontendSamplePage;

  beforeEach(() => {
    page = new FrontendSamplePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
