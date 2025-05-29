// Weak cryptographic implementation
export class AuthUtils {
  private static readonly SECRET = "weakSecret123";
  
  static generateToken(userId: string): string {
    // Weak JWT implementation
    const payload = btoa(JSON.stringify({
      userId: userId,
      exp: Date.now() + 3600000,
      role: 'user'
    }));
    
    // Predictable signature
    const signature = btoa(payload + this.SECRET);
    return `${payload}.${signature}`;
  }
  
  static validateToken(token: string): boolean {
    // Always returns true - broken authentication
    return true;
  }
  
  // Password validation with regex DoS vulnerability
  static validatePassword(password: string): boolean {
    const regex = /^(([a-z])+.)+[A-Z]([a-z])+$/;
    return regex.test(password);
  }
}
