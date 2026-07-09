const puppeteer = require('puppeteer');
(async()=>{
  const b = await puppeteer.launch({headless:true});
  const p = await b.newPage();
  await p.goto('http://localhost:3000/index.html',{waitUntil:'networkidle0'});
  await new Promise(r=>setTimeout(r,3000));

  const themes = ['neumorphism','glassmorphism','neubrutalism'];
  for(let vi=0;vi<3;vi++){
    const theme = themes[vi];
    // Add item to cart
    await p.evaluate(t=>{
      window.addToCart(t,{id:'test-burger',name:'Classic Burger',price:12.99,img:'',desc:'Delicious burger'});
    }, theme);
    await new Promise(r=>setTimeout(r,1000));
    // Navigate to cart
    await p.evaluate(t=>{
      window.navigateToPage(t,'cart-page');
    }, theme);
    await new Promise(r=>setTimeout(r,1500));
  }

  for(let vi=0;vi<3;vi++){
    const debug = await p.evaluate(i=>{
      const vp = document.querySelectorAll('.phone-viewport')[i];
      const textareas = vp.querySelectorAll('textarea');
      const allText = vp.textContent.substring(0,800);
      const taInfo = Array.from(textareas).map(ta=>({placeholder:ta.placeholder,tag:ta.tagName}));
      return {allText, textareas: taInfo, viewportId: vp.id};
    }, vi);
    console.log('\n--- V'+(vi+1)+' ('+themes[vi]+') ---');
    console.log('viewport id:', debug.viewportId);
    console.log('textareas found:', JSON.stringify(debug.textareas));
    console.log('text sample:', debug.allText.substring(0,400));
  }
  await b.close();
})();
