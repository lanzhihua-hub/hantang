$d = 'C:\Users\32688\Coze\Drive\Isabella\海棠英语\website'
foreach ($f in 'index','courses','about','contact') {
  $p = Join-Path $d ($f + '.html')
  $c = Get-Content $p -Raw -Encoding UTF8
  Write-Host ('== ' + $f + ' ==')
  Write-Host ('  app.js   : ' + ($c -match 'assets/app\.js'))
  Write-Host ('  menuBtn  : ' + ($c -match 'id="menuBtn"'))
  Write-Host ('  mobileMenu: ' + ($c -match 'id="mobileMenu"'))
  Write-Host ('  siteNav  : ' + ($c -match 'id="siteNav"'))
  Write-Host ('  faq items: ' + ([regex]::Matches($c, 'faq-item')).Count)
  Write-Host ('  form     : ' + ($c -match 'id="contactForm"'))
  Write-Host ('  nav links: ' + ([regex]::Matches($c, '(?:index|courses|about|contact)\.html')).Count)
  Write-Host ('  HaiTang  : ' + ($c -match 'HaiTang English'))
  Write-Host ('  HaTang(bad): ' + ($c -match '(?<!i)HaTang English'))
}
