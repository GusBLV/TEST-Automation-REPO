require('dotenv').config();
const { chromium } = require('playwright');
const os = require('os');
const path = require('path');

(async () => {
    const {
        CHROME_USER_DATA_DIR,
        CHROME_EXECUTABLE_PATH,
        CHROME_START_URL,
        usuarioDesigner,
        passwordDesigner
    } = process.env;

    // Ruta al perfil 'Default' directamente
    const userDataDir = CHROME_USER_DATA_DIR || (
        process.platform === 'darwin'
            ? path.join(os.homedir(), 'Library', 'Application Support', 'Google', 'Chrome')
            : process.platform === 'win32'
                ? path.join(os.homedir(), 'AppData', 'Local', 'Google', 'Chrome', 'User Data')
                : path.join(os.homedir(), '.config', 'google-chrome')
    );

    const defaultProfilePath = path.join(userDataDir, 'Default');
    console.log(`📁 Usando el perfil predeterminado: ${defaultProfilePath}`);

    const context = await chromium.launchPersistentContext(defaultProfilePath, {
        headless: false,
        executablePath: CHROME_EXECUTABLE_PATH,
        args: ['--no-sandbox']
    });

    const page = context.pages().length ? context.pages()[0] : await context.newPage();

    try {
        console.log(`🌐 Navegando a ${CHROME_START_URL}...`);
        await page.goto(CHROME_START_URL, { waitUntil: 'domcontentloaded', timeout: 60000 });

        await page.waitForSelector('input[type="email"], input[name="email"], input[name="username"]', { timeout: 10000 });
        await page.waitForSelector('input[type="password"], input[name="password"]', { timeout: 10000 });

        await page.fill('input[type="email"], input[name="email"], input[name="username"]', usuarioDesigner);
        await page.fill('input[type="password"], input[name="password"]', passwordDesigner);

        await page.click('button[type="submit"], button:has-text("Login"), button:has-text("Sign in")');

        console.log("✅ Login completado usando perfil predeterminado.");
    } catch (error) {
        console.error("❌ Error durante el login:", error.message);
    }

    // No cerramos ni borramos el contexto por si se necesita debugging
})();
