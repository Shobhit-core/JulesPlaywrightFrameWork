module.exports = {
  async loginViaUI(page, email, password) {
    await page.goto('https://demo.haroldwaste.com');
    await page.fill('input[name="email"]', email);
    await page.fill('input[name="password"]', password);
    await page.click('button[type="submit"]');
    await expect(page.locator('.dashboard')).toBeVisible();
  },
  
  async getAPIToken(request) {
    const response = await request.post('https://demo.api.haroldwaste.com/graphql', {
      data: {
        operationName: "login",
        variables: {
          email: "qa@julesai.com",
          password: "QaJULES2023!"
        },
        query: `
          mutation login($email: String!, $password: String!) {
            login(email: $email, password: $password) {
              token
            }
          }
        `
      }
    });
    return (await response.json()).data.login.token;
  }
};