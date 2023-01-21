jest.setTimeout(60000)
require('dotenv').config();

describe('Basic authentication e2e tests', () => {
  beforeAll( async () => {
  // Set a definite size for the page viewport so view is consistent across browsers
    await page.setViewport( {
      width: 1366,
      height: 768,
      deviceScaleFactor: 1
    } );	

    await page.goto('https://github.com');

    await page.waitForTimeout(5000);
    } );

  /*it( 'Should be truthy', async () => {
    expect(true).toBeTruthy();
  })*/

  it( 'Login', async ()  => {
    try {
      const email = process.env.EMAIL;
      const senha = process.env.PASSWORD;
      await page.goto('https://github.com');
      await page.click("[href^='/login']");
      await page.waitForTimeout(5000);
      await page.type("#login_field", email);
      await page.type("#password", senha);
      await page.click("input[type='submit']");
      await page.waitForTimeout(5000);
    }
    catch (error) {
      expect(error.message).toBe("Login Falhou")
    }
    
  });

    
  it ( 'Conferir se foi direcionado para a página correta', async () => {
    try{
      const text = await (await (await page.$('title')).getProperty('innerText')).jsonValue();
        expect(text).toBe('GitHub');
    }
    catch (error) {
      expect(error.message).toBe("Página incorreta")
    }

  });
  
  it ('Validar o nome do usuário na página', async () => {
    try{
      await page.goto('https://github.com/NairaRS')
      await page.waitForSelector("span.p-nickname.vcard-username.d-block");
      const name = await page.$eval("span.p-nickname.vcard-username.d-block", (e) => e.textContent);
        expect(name).toContain('NairaRS'); 
    }
    catch (error) {
      expect(error.message).toBe("Nome usuário inválido")
    }

  });

  
  it ('Navegar até a aba Pull Request', async () => {
    try{
      await page.click("a[href='/NairaRS?tab=repositories']");
      await page.waitForTimeout(5000);
      await page.click("a[href='/NairaRS/DesafioBase2Camp']")
      await page.waitForTimeout(5000);
      await page.click("#pull-requests-tab");
      await page.waitForTimeout(5000);
    }
    catch (error) {
      expect(error.message).toBe("Página inválida")
    }
  });

  it ('Deslogar', async() => {
    try{
      await page.click(".Header-link[aria-label='View profile and more']");
      await page.waitForTimeout(5000);
      await page.click("button[class='dropdown-item dropdown-signout']");
      await page.waitForTimeout(5000);
      const home = await (await (await page.$('title')).getProperty('innerText')).jsonValue();
          expect(home).toBe('GitHub: Let’s build from here · GitHub');
      await page.waitForTimeout(5000);
    }
    catch (error) {
      expect(error.message).toBe("Não foi possível fazer logout")
    }
  })

});
