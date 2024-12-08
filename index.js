const fs = require("fs").promises;
const path = require("path");
const { chromium } = require("playwright");

async function run() {
  try {
    const browser = await chromium.launch({ headless: false }); // Launch browser
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://www.faceshape.com/face-compare");

    // Wait for buttons to appear
    await page.waitForSelector("button");

    // Handle "Accept" button if it exists
    const acceptButton = page.locator("button:has-text('Accept')");
    if ((await acceptButton.count()) > 0 && (await acceptButton.isVisible())) {
      console.log("Clicking 'Accept' button...");
      await acceptButton.click();
    } else {
      console.log("'Accept' button is not visible or doesn't exist.");
    }
    await page.addStyleTag({
      content: "* { transition: none !important; animation: none !important; }",
    });

    // Locate all buttons
    const buttons = page.locator("button");
    const buttonCount = await buttons.count();
    const secondButton = buttons.nth(1);

    // Click on the second button
    if (buttonCount >= 2) {
      const secondButton = page.locator("button").nth(1);
      console.log("click");
      await secondButton.click();
    } else {
      console.log("Second button not found.");
    }
  } catch (err) {
    console.error("Error:", err);
  }
}

// Run the script
run().catch(console.error);

// async function readImages() {
//   try {
//     const imagesDir = path.join(__dirname, "images");
//     const files = await fs.readdir(imagesDir);

//     const validImageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".bmp"];

//     for (const file of files) {
//       const filePath = path.join(imagesDir, file);
//       const fileExtension = path.extname(file).toLowerCase();

//       if (validImageExtensions.includes(fileExtension)) {
//         const data = await fs.readFile(filePath);
//         // console.log(`Read image: ${data}`);
//       }
//     }
//   } catch (err) {
//     console.error("Error reading images:", err);
//   }
// }

// readImages();
