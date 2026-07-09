const puppeteer = require('puppeteer');
(async()=>{
  const b = await puppeteer.launch({headless:true});
  const p = await b.newPage();
  await p.goto('http://localhost:3000/index.html',{waitUntil:'networkidle0'});
  await new Promise(r=>setTimeout(r,3000));

  const themes = ['neumorphism','glassmorphism','neubrutalism'];
  for(let vi=0;vi<3;vi++){
    const theme = themes[vi];
    await p.evaluate(t=>{
      window.addToCart(t,{id:'test-burger',name:'Classic Burger',price:12.99,img:'',desc:'Delicious burger'});
    }, theme);
    await new Promise(r=>setTimeout(r,1000));
    await p.evaluate(t=>{
      window.navigateToPage(t,'cart-page');
    }, theme);
    await new Promise(r=>setTimeout(r,2000));

    const debug = await p.evaluate(i=>{
      const vp = document.querySelectorAll('.phone-viewport')[i];
      const textareas = vp.querySelectorAll('textarea');
      const taInfo = Array.from(textareas).map(ta=>({placeholder:ta.placeholder}));
      return {
        textareaCount: textareas.length,
        taPlaceholders: taInfo,
        vpChildren: vp.childElementCount,
        hasSpecialNotes: taInfo.some(t => t.placeholder.toLowerCase().includes('special notes'))
      };
    }, vi);
    console.log('V'+(vi+1)+':', JSON.stringify(debug));
  }
  await b.close();
})();
