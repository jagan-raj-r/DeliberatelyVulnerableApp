# VulnApp - Deliberately Vulnerable Application

⚠️ **WARNING**: This application contains intentional security vulnerabilities and should NEVER be deployed in a production environment.

## Purpose
VulnApp is designed for:
- Security tool testing (SAST, SCA, DAST)
- Penetration testing practice
- Security awareness training
- Vulnerability research

## Quick Start
```bash
git clone https://github.com/yourusername/vulnapp.git
cd vulnapp
docker-compose up -d
```

## Vulnerability Categories
- **OWASP Top 10 2021**: All categories represented
- **SANS Top 25**: Most critical weaknesses included
- **AI Security**: Prompt injection, model extraction
- **Infrastructure**: IaC misconfigurations
- **Supply Chain**: Vulnerable dependencies

## Testing Recommendations
1. Run SAST tools against the codebase
2. Perform SCA scans on dependencies
3. Execute DAST against running application
4. Test AI components for prompt injection
5. Scan infrastructure configurations

## Legal Notice
This code is for educational and testing purposes only. Users are responsible for ensuring ethical and legal use.
