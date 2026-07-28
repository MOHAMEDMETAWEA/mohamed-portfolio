Add-Type -Path "C:\Windows\Microsoft.NET\Framework64\v4.0.30319\System.dll" -ErrorAction SilentlyContinue

# Read PDF as raw bytes, extract readable strings
$path = "d:\My info\mohamed-portfolio\public\Mohamed_Mostafa_Metawea_CV.pdf"
$content = Get-Content -Path $path -Raw -Encoding Byte -ErrorAction SilentlyContinue
if (-not $content) {
    $content = [System.IO.File]::ReadAllBytes($path)
}

# Convert to string and extract readable text
$text = [System.Text.Encoding]::UTF8.GetString($content)

# Extract text between BT and ET markers (PDF text objects)
$matches = [regex]::Matches($text, '\(([^)]+)\)')
$allText = @()
foreach ($m in $matches) {
    $val = $m.Groups[1].Value
    # Filter to lines with actual words
    if ($val -match '[a-zA-Z]{2,}' -and $val.Length -gt 2) {
        $allText += $val
    }
}
$allText -join "`n"
