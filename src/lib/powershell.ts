import type { ParsedEmail } from './utils'

const SCRIPT_VERSION = '1.1.0'

export type RuleAction = 'copy' | 'move'
export type ConditionType = 'senderEmail' | 'from'

export function generateScript(
  emails: ParsedEmail[],
  userEmail = '',
  parentFolder = 'team',
  ruleAction: RuleAction = 'copy',
  conditionType: ConditionType = 'senderEmail',
): string {
  const valid = emails.filter((e) => e.valid)
  if (valid.length === 0) return ''

  const pf = parentFolder.trim() || 'team'
  const actionLabel = ruleAction === 'copy' ? 'Copy' : 'Move'

  const parentFolderBlockCom = generateParentFolderBlockCom(pf)
  const folderBlocksCom = valid.map((e) => generateFolderBlockCom(e.alias)).join('\n\n')
  const parentFolderBlockExo = generateParentFolderBlockExo(pf)
  const folderBlocksExo = valid.map((e) => generateFolderBlockExo(e.alias, pf)).join('\n')
  const ruleBlocksExo = valid.map((e) => generateRuleBlockExo(e.raw, e.alias, pf, ruleAction, conditionType, e.isDomainRule)).join('\n')

  const userEmailLine = userEmail.trim()
    ? `$userEmail    = "${userEmail.trim()}"  # set from UI`
    : `$userEmail    = $inbox.FolderPath.TrimStart('\\').Split('\\')[0]`

  const fallbackEmailBlock = userEmail.trim()
    ? `    $userEmail = "${userEmail.trim()}"  # set from UI`
    : `    $userEmail = (whoami /upn 2>$null).Trim()
    if (-not $userEmail -or $userEmail -notmatch '@') {
        $userEmail = Read-Host "Enter your Exchange / Microsoft 365 email address"
    }`

  return `#Requires -Version 5.1
# ============================================================
# InboxCraft - Outlook Inbox Rules Generator
# Version:      ${SCRIPT_VERSION}
# Generated:    ${new Date().toISOString()}
# Rules:        ${valid.length} (${actionLabel})
# Parent folder: ${pf}
# Source:        https://github.com/trivedi-vatsal/InboxCraft
# ============================================================
# HOW THIS SCRIPT WORKS (100% IDEMPOTENT & AUDIT READY):
#   1. Tries Outlook COM to create folders (fast, local execution without sign-in).
#   2. Falls back to Exchange Online if Outlook COM is unavailable or errors out.
#   3. Always uses Exchange Online to configure inbox rules directly on the server.
#
#   NOTE: This script is entirely safe to run multiple times.
#   It will safely skip folders and rules that already exist.
#   A browser sign-in prompt will appear only during the Exchange Online step.
# ============================================================

$ErrorActionPreference = "Stop"

Write-Host ""
Write-Host "============================================================" -ForegroundColor DarkCyan
Write-Host "  InboxCraft - Outlook Inbox Rules Generator" -ForegroundColor Cyan
Write-Host "  https://github.com/trivedi-vatsal/InboxCraft" -ForegroundColor DarkGray
Write-Host "============================================================" -ForegroundColor DarkCyan
Write-Host "  Rules to apply : ${valid.length} (${actionLabel})" -ForegroundColor White
Write-Host "  Parent folder  : ${pf}" -ForegroundColor White
Write-Host "============================================================" -ForegroundColor DarkCyan
Write-Host "  The following rules will be created:" -ForegroundColor White
Write-Host ""
Write-Host "  #   Sender / Domain                    Action   Subfolder" -ForegroundColor DarkGray
Write-Host "  --  ---------------------------------  -------  ---------------------------------" -ForegroundColor DarkGray
${valid.map((e, i) => `Write-Host "  ${String(i + 1).padStart(2, ' ')}.  ${e.raw.padEnd(33, ' ')}  ${actionLabel.padEnd(7, ' ')}  ${pf}\\${e.alias}" -ForegroundColor White`).join('\n')}
Write-Host ""

$confirm = Read-Host "Do you want to proceed? (Y/N)"
if ($confirm -notmatch '^[Yy]$') {
    Write-Host "Aborted. No changes were made." -ForegroundColor Yellow
    exit 0
}

Write-Host ""

$outlook        = $null
$namespace      = $null
$inbox          = $null
$userEmail      = $null
$comAvailable   = $false
$exoConnected   = $false

# ============================================================
# Attempt Outlook COM connection (for folder creation only)
# ============================================================

Write-Host "Trying Outlook COM for folder creation..." -ForegroundColor Cyan

try {
    $outlook      = New-Object -ComObject Outlook.Application
    $namespace    = $outlook.GetNamespace("MAPI")
    $inbox        = $namespace.GetDefaultFolder(6)  # 6 = olFolderInbox
    ${userEmailLine}
    $comAvailable = $true
    Write-Host "Connected via COM. Inbox: $($inbox.FolderPath)" -ForegroundColor Green
} catch {
    Write-Host "Outlook COM unavailable. Will use Exchange Online for folders too." -ForegroundColor Yellow
}

# ============================================================
# If COM unavailable, resolve user email for EXO
# ============================================================

if (-not $comAvailable) {
${fallbackEmailBlock}
    Write-Host "Using account: $userEmail" -ForegroundColor Cyan
}

# ============================================================
# STEP 1: Create subfolders
# ============================================================

Write-Host ""
Write-Host "--- Creating folders ---" -ForegroundColor Cyan

if ($comAvailable) {

${parentFolderBlockCom}

${folderBlocksCom}

} else {

    $exoModule = Get-Module ExchangeOnlineManagement -ListAvailable -ErrorAction SilentlyContinue
    if (-not $exoModule) {
        Write-Host "Installing ExchangeOnlineManagement module (one-time)..." -ForegroundColor Cyan
        Install-Module ExchangeOnlineManagement -Scope CurrentUser -Force -AllowClobber -ErrorAction Stop
    }
    Import-Module ExchangeOnlineManagement -ErrorAction Stop
    Write-Host "Connecting to Exchange Online as $userEmail ..." -ForegroundColor Cyan
    Write-Host "(A browser or credential window may appear)" -ForegroundColor DarkGray
    Connect-ExchangeOnline -UserPrincipalName $userEmail -ShowBanner:$false -ErrorAction Stop
    $exoConnected = $true
    Write-Host "Connected to Exchange Online." -ForegroundColor Green

${parentFolderBlockExo}

${folderBlocksExo}

}

# ============================================================
# STEP 2: Create rules (always via Exchange Online)
# ============================================================

Write-Host ""
Write-Host "--- Creating rules via Exchange Online ---" -ForegroundColor Cyan

if (-not $exoConnected) {
    $exoModule = Get-Module ExchangeOnlineManagement -ListAvailable -ErrorAction SilentlyContinue
    if (-not $exoModule) {
        Write-Host "Installing ExchangeOnlineManagement module (one-time)..." -ForegroundColor Cyan
        Install-Module ExchangeOnlineManagement -Scope CurrentUser -Force -AllowClobber -ErrorAction Stop
    }
    Import-Module ExchangeOnlineManagement -ErrorAction Stop
    Write-Host "Connecting to Exchange Online as $userEmail ..." -ForegroundColor Cyan
    Write-Host "(A browser or credential window may appear)" -ForegroundColor DarkGray
    Connect-ExchangeOnline -UserPrincipalName $userEmail -ShowBanner:$false -ErrorAction Stop
    $exoConnected = $true
    Write-Host "Connected to Exchange Online." -ForegroundColor Green
}

${ruleBlocksExo}

# ============================================================
# STEP 3: Cleanup Environment (Releasing COM objects & Disconnecting)
# ============================================================

if ($exoConnected) {
    Disconnect-ExchangeOnline -Confirm:$false -ErrorAction SilentlyContinue
    Write-Host "Disconnected from Exchange Online." -ForegroundColor DarkGray
}

if ($null -ne $inbox) {
    [System.Runtime.InteropServices.Marshal]::ReleaseComObject($inbox) | Out-Null
}
if ($null -ne $namespace) {
    [System.Runtime.InteropServices.Marshal]::ReleaseComObject($namespace) | Out-Null
}
if ($null -ne $outlook) {
    [System.Runtime.InteropServices.Marshal]::ReleaseComObject($outlook) | Out-Null
}
[System.GC]::Collect()
[System.GC]::WaitForPendingFinalizers()

Write-Host ""
Write-Host "Done! ${valid.length} folder(s) and rule(s) configured." -ForegroundColor Green
Write-Host "Open Outlook to verify rules are active." -ForegroundColor Yellow
`
}

function generateParentFolderBlockCom(parentFolder: string): string {
  return `# Parent folder: ${parentFolder}
$parentFolderCom = $null
try {
    $parentFolderCom = $inbox.Folders.Item("${parentFolder}")
    Write-Host "  Folder '${parentFolder}' already exists - skipping." -ForegroundColor Yellow
} catch {
    $parentFolderCom = $inbox.Folders.Add("${parentFolder}")
    Write-Host "  Created folder '${parentFolder}'." -ForegroundColor Green
}`
}

function generateFolderBlockCom(alias: string): string {
  const varName = `folder_${alias.replace(/[.\-@]/g, '_')}`
  return `# Folder: ${alias}
try {
    $parentFolderCom.Folders.Item("${alias}") | Out-Null
    Write-Host "  Folder '${alias}' already exists - skipping." -ForegroundColor Yellow
} catch {
    try {
        $${varName}_tmp = $inbox.Folders.Item("${alias}")
        $${varName}_tmp.MoveTo($parentFolderCom)
        Write-Host "  Moved existing '${alias}' into parent folder." -ForegroundColor Green
    } catch {
        $${varName}_new = $inbox.Folders.Add("${alias}")
        $${varName}_new.MoveTo($parentFolderCom)
        Write-Host "  Created folder '${alias}'." -ForegroundColor Green
    }
}`
}

function generateParentFolderBlockExo(parentFolder: string): string {
  return `    # Parent folder: ${parentFolder}
    try {
        Get-MailboxFolder -Identity ($userEmail + ":\\Inbox\\${parentFolder}") -ErrorAction Stop | Out-Null
        Write-Host "  Folder '${parentFolder}' already exists - skipping." -ForegroundColor Yellow
    } catch {
        New-MailboxFolder -Name "${parentFolder}" -Parent ($userEmail + ":\\Inbox") -ErrorAction Stop | Out-Null
        Write-Host "  Created folder '${parentFolder}'." -ForegroundColor Green
    }`
}

function generateFolderBlockExo(alias: string, parentFolder: string): string {
  return `    # Folder: ${alias}
    try {
        Get-MailboxFolder -Identity ($userEmail + ":\\Inbox\\${parentFolder}\\${alias}") -ErrorAction Stop | Out-Null
        Write-Host "  Folder '${alias}' already exists - skipping." -ForegroundColor Yellow
    } catch {
        New-MailboxFolder -Name "${alias}" -Parent ($userEmail + ":\\Inbox\\${parentFolder}") -ErrorAction Stop | Out-Null
        Write-Host "  Created folder '${alias}'." -ForegroundColor Green
    }`
}

function generateRuleBlockExo(
  email: string,
  alias: string,
  parentFolder: string,
  ruleAction: RuleAction,
  conditionType: ConditionType,
  isDomainRule: boolean,
): string {
  const actionLabel = ruleAction === 'copy' ? 'Copy' : 'Move'
  const ruleName = `${actionLabel} ${email} to ${alias}`
  const actionParam = ruleAction === 'copy' ? '-CopyToFolder' : '-MoveToFolder'

  // Domain rule: match anything from @domain.com
  // Regular rule: exact sender email or from-contains based on conditionType
  const fromParam = isDomainRule
    ? `-FromAddressContains "${email}"`
    : conditionType === 'from'
      ? `-FromAddressContains "${email}"`
      : `-From "${email}"`

  return `    # Rule: ${email} -> ${alias}
    try {
        $existing = Get-InboxRule -ErrorAction SilentlyContinue | Where-Object { $_.Name -eq "${ruleName}" }
        if ($existing) {
            Write-Host "  Rule for '${email}' already exists - skipping." -ForegroundColor Yellow
        } else {
            $folderIdentity = $userEmail + ":\\Inbox\\${parentFolder}\\${alias}"
            New-InboxRule -Name "${ruleName}" ${fromParam} ${actionParam} $folderIdentity -ErrorAction Stop | Out-Null
            Write-Host "  Created rule for '${email}' -> '${alias}'." -ForegroundColor Green
        }
    } catch {
        Write-Host "  WARNING: Could not create rule for '${email}': $_" -ForegroundColor Yellow
    }`
}
