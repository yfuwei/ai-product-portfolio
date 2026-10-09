/* B04 screenshot lightbox, scoped to its own native dialog. */
(() => {
  const dialog=document.getElementById('p2-interface-lightbox');
  if(!dialog)return;
  const image=dialog.querySelector('img'),zoom=dialog.querySelector('[data-p2-zoom]');
  let trigger=null;
  document.querySelectorAll('#design-interfaces .p2-shot-trigger').forEach(button=>button.addEventListener('click',()=>{
    trigger=button;const source=button.querySelector('img');image.src=source.currentSrc||source.src;image.alt=source.alt;
    dialog.querySelector('h2').textContent=button.dataset.shotTitle;
    dialog.querySelector('[data-p2-original]').href=image.src;
    dialog.classList.remove('is-native');zoom.textContent='原尺寸查看';zoom.setAttribute('aria-pressed','false');
    document.body.classList.add('p2-shot-open');dialog.showModal();
    dialog.querySelector('[data-p2-close]').focus();
  }));
  zoom.addEventListener('click',()=>{
    const native=dialog.classList.toggle('is-native');zoom.setAttribute('aria-pressed',String(native));zoom.textContent=native?'适应窗口':'原尺寸查看';
  });
  dialog.querySelector('[data-p2-close]').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('click',event=>{const r=dialog.getBoundingClientRect();if(event.target===dialog&&(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom))dialog.close();});
  dialog.addEventListener('close',()=>{document.body.classList.remove('p2-shot-open');image.removeAttribute('src');if(trigger)trigger.focus({preventScroll:true});});
})();
