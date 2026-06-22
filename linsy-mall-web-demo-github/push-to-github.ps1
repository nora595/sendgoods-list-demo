# 推送到 GitHub（在 PowerShell 中运行）

$GH = "$env:TEMP\gh-cli\bin\gh.exe"
if (-not (Test-Path $GH)) {
  Write-Host "请先安装 GitHub CLI: winget install GitHub.cli"
  exit 1
}

# 1. 登录 GitHub（浏览器授权）
& $GH auth login -h github.com -p https -w

# 2. 创建仓库并推送（可修改仓库名）
$RepoName = "linsy-mall-web-demo"
& $GH repo create $RepoName --public --source=. --remote=origin --push --description "LINSY mall WEB trade chain interactive demo"

# 3. 开启 GitHub Pages
& $GH api repos/{owner}/$RepoName/pages -X POST -f build_type=workflow

Write-Host "完成！访问: https://<你的用户名>.github.io/$RepoName/"
