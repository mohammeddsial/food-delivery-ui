const https = require('https');
const fs = require('fs');
const path = require('path');

const FIGMA_TOKEN = process.env.FIGMA_TOKEN || 'YOUR_FIGMA_TOKEN_HERE';
const FIGMA_FILE_KEY = process.env.FIGMA_FILE_KEY || 'YOUR_FILE_KEY_HERE';

// First, let's get the file to find the page ID
async function getFigmaFile() {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.figma.com',
      path: `/v1/files/${FIGMA_FILE_KEY}?depth=2`,
      method: 'GET',
      headers: {
        'X-Figma-Token': FIGMA_TOKEN
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          resolve(json);
        } catch (e) {
          reject(e);
        }
      });
    });

    req.on('error', reject);
    req.end();
  });
}

// Create a new frame in the file
async function createFrame(pageId, name) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({
      node_type: 'FRAME',
      name: name,
      absolute_render_bounds: { x: 0, y: 0, width: 1440, height: 900 }
    });

    const options = {
      hostname: 'api.figma.com',
      path: `/v1/files/${FIGMA_FILE_KEY}/nodes?ids=${pageId}`,
      method: 'GET',
      headers: {
        'X-Figma-Token': FIGMA_TOKEN
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          resolve(json);
        } catch (e) {
          reject(e);
        }
      });
    });

    req.on('error', reject);
    req.end();
  });
}

// Upload image to Figma
async function uploadImage(filePath, fileName) {
  return new Promise((resolve, reject) => {
    const fileBuffer = fs.readFileSync(filePath);
    const boundary = '----FormBoundary' + Math.random().toString(36).substring(2);
    
    let body = '';
    body += `--${boundary}\r\n`;
    body += `Content-Disposition: form-data; name="file"; filename="${fileName}"\r\n`;
    body += `Content-Type: image/png\r\n\r\n`;
    
    const bodyStart = Buffer.from(body, 'utf-8');
    const bodyEnd = Buffer.from(`\r\n--${boundary}--\r\n`, 'utf-8');
    const fullBody = Buffer.concat([bodyStart, fileBuffer, bodyEnd]);

    const options = {
      hostname: 'api.figma.com',
      path: `/v1/images/${FIGMA_FILE_KEY}`,
      method: 'POST',
      headers: {
        'X-Figma-Token': FIGMA_TOKEN,
        'Content-Type': `multipart/form-data; boundary=${boundary}`,
        'Content-Length': fullBody.length
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          resolve(json);
        } catch (e) {
          reject(e);
        }
      });
    });

    req.on('error', reject);
    req.write(fullBody);
    req.end();
  });
}

// Main function
async function main() {
  try {
    console.log('Getting Figma file info...');
    const fileInfo = await getFigmaFile();
    
    // Find the Components page
    const pages = fileInfo.document.children;
    console.log('Pages found:');
    pages.forEach(page => {
      console.log(`  - ${page.name} (ID: ${page.id})`);
    });
    
    // Find Components page (node 127:7)
    const componentsPage = pages.find(p => p.name === 'Components' || p.id === '127:7');
    
    if (componentsPage) {
      console.log(`\nFound Components page: ${componentsPage.id}`);
      
      // Now upload the screenshot
      console.log('\nUploading screenshot...');
      const screenshotPath = path.join(__dirname, 'designs', 'full-screen-view.png');
      
      if (fs.existsSync(screenshotPath)) {
        const result = await uploadImage(screenshotPath, 'full-screen-view.png');
        console.log('Upload result:', JSON.stringify(result, null, 2));
      } else {
        console.log('Screenshot file not found at:', screenshotPath);
      }
    } else {
      console.log('Components page not found');
    }
    
  } catch (error) {
    console.error('Error:', error.message);
  }
}

main();
