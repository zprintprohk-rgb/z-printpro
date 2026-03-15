$baseUrl = "https://z-printpro-z-printpros-projects.vercel.app"

Write-Host "`n=== 验证部署 URL ===" -ForegroundColor Cyan

$languages = @("zh-hk", "en", "ja")
foreach ($lang in $languages) {
    Write-Host "`n检查 /$lang ..." -ForegroundColor Yellow
    try {
        $response = Invoke-WebRequest -Uri "$baseUrl/$lang" -UseBasicParsing -TimeoutSec 30
        Write-Host "  HTTP 状态：$($response.StatusCode)" -ForegroundColor Green
        $hreflangCount = ([regex]::Matches($response.Content, 'hreflang="[^"]*"')).Count
        Write-Host "  hreflang 标签数量：$hreflangCount"
    } catch {
        Write-Host "  失败：$($_.Exception.Message)" -ForegroundColor Red
    }
}

Write-Host "`n=== 验证 SEO 文件 ===" -ForegroundColor Cyan
try {
    $robots = Invoke-WebRequest -Uri "$baseUrl/robots.txt" -UseBasicParsing -TimeoutSec 10
    Write-Host "robots.txt: HTTP $($robots.StatusCode)" -ForegroundColor Green
} catch {
    Write-Host "robots.txt: 失败" -ForegroundColor Red
}

try {
    $sitemap = Invoke-WebRequest -Uri "$baseUrl/sitemap.xml" -UseBasicParsing -TimeoutSec 10
    Write-Host "sitemap.xml: HTTP $($sitemap.StatusCode)" -ForegroundColor Green
} catch {
    Write-Host "sitemap.xml: 失败" -ForegroundColor Red
}

Write-Host "`n=== 检查 hreflang 详情 ===" -ForegroundColor Cyan
try {
    $response = Invoke-WebRequest -Uri "$baseUrl/zh-hk" -UseBasicParsing -TimeoutSec 30
    $hreflangs = [regex]::Matches($response.Content, 'hreflang="[^"]*"') | ForEach-Object { $_.Value }
    foreach ($href in $hreflangs) {
        Write-Host "   $href" -ForegroundColor Green
    }
} catch {
    Write-Host "  失败：$($_.Exception.Message)" -ForegroundColor Red
}