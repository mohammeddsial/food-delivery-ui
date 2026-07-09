const puppeteer = require('puppeteer');
(async()=>{
  const b = await puppeteer.launch({headless:true});
  const p = await b.newPage();
  await p.goto('http://localhost:3000/index.html',{waitUntil:'networkidle0'});
  await new Promise(r=>setTimeout(r,3000));
  
  for(let vi=0;vi<3;vi++){
    const theme = ['neumorphism','glassmorphism','neubrutalism'][vi];
    await p.evaluate(t=>{window.addToCart(t,{id:'t',name:'Test',price:9.99,img:'',desc:''})},theme);
    await p.evaluate(t=>{window.navigateToPage(t,'cart-page')},theme);
  }
  await new Promise(r=>setTimeout(r,1500));
  
  for(let vi=0;vi<3;vi++){
    const text = await p.evaluate(i=>{
      const vp = document.querySelectorAll('.phone-viewport')[i];
      return vp.textContent.substring(0,600);
    },vi);
    console.log('\n--- V'+(vi+1)+' cart text ---');
    console.log(text);
    console.log('has "special notes":',text.toLowerCase().includes('special notes'));
  }
  console.log('\nDone.');
  await b.close();
})();