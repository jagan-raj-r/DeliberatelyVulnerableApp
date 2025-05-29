# VulnApp Testing Guide

## SAST (Static Application Security Testing)

### Recommended Tools
- Semgrep: `semgrep --config=auto .`
- Bandit (Python): `bandit -r backend/`
- ESLint: `eslint frontend/src/`
- SonarQube
- Checkmarx
- Veracode

### Expected Findings
- Hardcoded secrets in multiple files
- SQL injection vulnerabilities
- XSS vulnerabilities
- Command injection flaws
- Weak cryptographic implementations

## SCA (Software Composition Analysis)

### Recommended Tools
- npm audit: `npm audit`
- Snyk: `snyk test`
- OWASP Dependency Check
- WhiteSource/Mend
- Sonatype Nexus

### Expected Findings
- Vulnerable dependencies in package.json files
- Outdated library versions
- Known CVEs in dependencies

## DAST (Dynamic Application Security Testing)

### Setup
1. Start the application: `docker-compose up -d`
2. Application will be available at http://localhost:3000

### Recommended Tools
- OWASP ZAP
- Burp Suite
- Nessus
- Rapid7 InsightAppSec

## Infrastructure Security Testing

### Tools
- Checkov: `checkov -f infrastructure/`
- Terrascan: `terrascan scan`
- Trivy
- Aqua Security

## Secret Detection

### Tools
- TruffleHog: `trufflehog --regex --entropy=False .`
- detect-secrets: `detect-secrets scan --all-files .`
- GitLeaks
- Semgrep secrets rules
