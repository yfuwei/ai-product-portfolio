/* Render-only checks; this does not execute an Agent or business workflow. */
const path = require('node:path');
const fs = require('node:fs');
const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const sha256 = file => crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
const modules = process.env.P2_BROWSER_MODULES || '/Users/frey/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules';
const { chromium } = require(path.join(modules, 'playwright'));
const base = process.env.P2_PREVIEW_URL;
if (!base) throw new Error('Set P2_PREVIEW_URL to the served round2/index.html URL.');
const output = process.env.P2_SCREENSHOT_DIR || path.resolve(__dirname, '../../screenshots/round2');
const views = [
  ['conversation', 'b04-service-conversation.png'],
  ['execution', 'b04-agent-execution.png'],
  ['insights', 'b04-case-insights.png']
];
(async () => {
  fs.mkdirSync(output, { recursive: true });
  const browser = await chromium.launch({ headless: true, executablePath: process.env.P2_CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' });
  const manifest = { kind: 'static-product-design', viewport: { width: 1600, height: 1000 }, source: 'assets/prototype/round2', sourceHashes: Object.fromEntries(['index.html','styles.css','app.js','mock-data.js','capture.cjs'].map(name=>[name,sha256(path.join(__dirname,name))])), browserVersion:browser.version(), records: [] };
  try {
    for (const [view, file] of views) {
      const page = await browser.newPage({ viewport: manifest.viewport, deviceScaleFactor: 1 });
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      page.on('console', message => { if(message.type()==='error') errors.push(message.text()); });
      page.on('response', response => { if(response.status()>=400) errors.push(`${response.status()} ${response.url()}`); });
      const url = new URL(base); url.searchParams.set('view', view);
      await page.goto(url.href);
      await page.evaluate(() => document.fonts.ready);
      const audit = await page.evaluate(() => {
        const main = document.querySelector('main');
        return {
          width: document.documentElement.scrollWidth, height: document.documentElement.scrollHeight,
          mainText: main.innerText,
          DOM: { elements:main.querySelectorAll('*').length, images:main.querySelectorAll('img').length, canvas:main.querySelectorAll('canvas').length, textNodes:[...main.querySelectorAll('h1,h2,h3,h4,p,dt,dd,strong,span,small,th,td')].length },
          badges:[...main.querySelectorAll('.badge')].map(e=>({text:e.textContent,state:e.dataset.state,color:getComputedStyle(e).color})),
          stateStrip:[...main.querySelectorAll('.business-status-strip>div')].map(e=>({state:e.dataset.state,text:e.innerText,iconColor:getComputedStyle(e.querySelector('.icon')).color})),
          timeline:[...main.querySelectorAll('.track-step')].map(e=>({state:e.dataset.state,text:e.innerText,iconColor:getComputedStyle(e.querySelector('.track-marker')).color})),
          caseStates:[...main.querySelectorAll('.case-comparison tbody tr')].map(e=>({id:e.querySelector('th').textContent,color:getComputedStyle(e.querySelector('.case-decision')).color})),
          matrix:[...main.querySelectorAll('.business-evidence-matrix tbody tr')].map(e=>({id:e.querySelector('th').textContent,cells:[...e.querySelectorAll('.evidence-cell-main')].map(c=>({state:c.dataset.state,iconColor:getComputedStyle(c.querySelector('.icon')).color,text:c.textContent}))})),
          recovery:[...main.querySelectorAll('.ai-recovery-entry')].map(e=>({state:e.dataset.state,text:e.textContent})),
          evidenceColors:[...main.querySelectorAll('.evidence-cell-detail[data-state="waiting"]')].map(e=>getComputedStyle(e).color),
          mainHeading: getComputedStyle(main.querySelector('h1')).fontSize,
          activeNavigation: document.querySelector('nav a[aria-current]').textContent,
          fontSizes: [...new Set([...document.querySelectorAll('main h2,main h3,main p,main strong')].map(e => getComputedStyle(e).fontSize))],
          overflowingText: [...main.querySelectorAll('*')].filter(e => {
            const style = getComputedStyle(e);
            return !e.classList.contains('sr-only') && !['svg','path','circle'].includes(e.tagName) && style.display !== 'inline' && e.clientWidth > 0 && e.scrollWidth > e.clientWidth + 1;
          }).map(e => e.className)
        };
      });
      assert.equal(audit.width, 1600, `${view}: horizontal overflow`);
      assert.ok(audit.height <= 1000, `${view}: vertical clipping (${audit.height}px)`);
      assert.deepEqual(audit.overflowingText, [], `${view}: truncated text`);
      assert.deepEqual(errors, []);
      assert.equal(audit.DOM.images,0,'UI must not be a raster background');
      assert.equal(audit.DOM.canvas,0,'UI must use editable DOM');
      assert.ok(audit.DOM.textNodes>50,'Expected editable text objects');
      if (view === 'conversation') {
        assert.ok(audit.mainText.includes('未找到可继续追踪的仓库核查任务'));
        assert.ok(!audit.mainText.includes('WH-201') && !audit.mainText.includes('RF-301'));
        assert.ok(audit.mainText.includes('尚未发送'));
        assert.deepEqual(audit.recovery.map(e=>e.state),['success','risk','active','active']);
        assert.ok(audit.recovery[2].text.includes('继续核实这笔退货的实际入库情况'));
        assert.ok(audit.recovery[3].text.includes('交给 Service Orchestrator'));
        assert.deepEqual(audit.stateStrip.map(e=>e.state),['success','waiting','inactive']);
        assert.deepEqual(audit.stateStrip.map(e=>e.iconColor),['rgb(35, 132, 92)','rgb(153, 101, 26)','rgb(104, 119, 140)']);
      } else if (view === 'execution') {
        for (const term of ['此前等待 · 已结束','Plan v2 · 已采用','Pending Confirmation','WH-201 · 核查完成','RF-301 · 已启动','Plan v1 → Plan v2','待 Agent 核实 → 下一节点','退款结果待跟踪','非真实发送记录','尚未发起','Not Initiated']) assert.ok(audit.mainText.includes(term), term);
              assert.deepEqual(audit.timeline.map(e=>e.state),['success','waiting','risk','success','active','active']);
        assert.equal(audit.timeline[1].iconColor,'rgb(153, 101, 26)');
        assert.equal(audit.timeline[3].iconColor,'rgb(35, 132, 92)');
        assert.ok(audit.badges.some(e=>e.text==='查询已完成'&&e.state==='success'));
      } else {
        for (const term of ['咨询时仓库未确认收货；后续核查取得有效入库记录。','已有入库记录，客服当时未见确认；时间差待核实。','具体时间差待核实']) assert.ok(audit.mainText.includes(term), term);
        assert.ok(!audit.mainText.includes('仓库确认曾滞后') && !audit.mainText.includes('入库与客服可见状态有时间差'));
        for (const term of ['Need Evidence','CASE-004','排除','尚未创建','跨 Case 业务证据对照','实际入库记录','系统确认记录','AI 提出的调查方向']) assert.ok(audit.mainText.includes(term), term);
        assert.ok(!audit.mainText.includes('Confirmed') && !audit.mainText.includes('已验收'));
        assert.ok(audit.badges.filter(e=>e.text.includes('Need Evidence')).every(e=>e.state==='waiting'&&e.color==='rgb(153, 101, 26)'));
        assert.equal(audit.caseStates[2].color,'rgb(153, 101, 26)');
        assert.equal(audit.evidenceColors.length,6);
        assert.ok(audit.evidenceColors.every(e=>e==='rgb(153, 101, 26)'));
        assert.deepEqual(audit.matrix.map(e=>e.id),['CASE-001','CASE-002','CASE-003']);
        assert.deepEqual(audit.matrix.map(e=>e.cells.map(c=>c.state)),[['success','waiting','partial'],['success','waiting','partial'],['waiting','waiting','waiting']]);
        assert.ok(audit.matrix.flatMap(e=>e.cells).filter(e=>e.state==='success').every(e=>e.iconColor==='rgb(35, 132, 92)'));
        assert.ok(audit.mainText.includes('是否存在状态更新或信息同步滞后？'));
      }
      await page.screenshot({ path: path.join(output, file), fullPage: false });
      manifest.records.push({ view, file, url:url.href, screenshotSHA256:sha256(path.join(output,file)), audit, errors });
      await page.close();
    }
    fs.writeFileSync(path.join(output, 'b04-render-manifest.json'), JSON.stringify(manifest, null, 2));
    console.log('Rendered three independent 1600 × 1000 design snapshots; no overflow or script errors.');
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
