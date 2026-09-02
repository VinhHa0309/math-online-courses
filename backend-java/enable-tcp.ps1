# Script to enable TCP/IP for SQL Server named instance MSSQLSERVER02 and restart the service
try {
    # 1. Enable TCP/IP in Registry
    Set-ItemProperty -Path "HKLM:\SOFTWARE\Microsoft\Microsoft SQL Server\MSSQL16.MSSQLSERVER02\MSSQLServer\SuperSocketNetLib\Tcp" -Name Enabled -Value 1
    Write-Host "TCP/IP enabled in Registry." -ForegroundColor Green
    
    # 2. Restart SQL Server Service
    Restart-Service -Name "MSSQL`$MSSQLSERVER02" -Force
    Write-Host "SQL Server Service (MSSQLSERVER02) restarted successfully!" -ForegroundColor Green
} catch {
    Write-Error $_
}
