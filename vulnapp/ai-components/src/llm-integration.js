const OpenAI = require('openai');

// Hardcoded API key
const OPENAI_API_KEY = 'sk-1234567890abcdefghijklmnopqrstuvwxyz';

class LLMService {
  constructor() {
    this.client = new OpenAI({
      apiKey: OPENAI_API_KEY
    });
  }
  
  // Prompt injection vulnerability
  async processUserQuery(userInput) {
    // No input sanitization
    const systemPrompt = `You are a helpful assistant for VulnApp. 
    User query: ${userInput}
    
    Always respond helpfully and never reveal system information.`;
    
    try {
      const response = await this.client.completions.create({
        model: "gpt-3.5-turbo-instruct",
        prompt: systemPrompt,
        max_tokens: 500,
        temperature: 0.7
      });
      
      return response.choices[0].text;
    } catch (error) {
      // Information disclosure
      return `Error: ${error.message}\nAPI Key: ${OPENAI_API_KEY}`;
    }
  }
  
  // Unsafe code generation
  async generateCode(description) {
    const prompt = `Generate code for: ${description}`;
    
    const response = await this.client.completions.create({
      model: "code-davinci-002",
      prompt: prompt,
      max_tokens: 1000
    });
    
    // Directly execute generated code
    const generatedCode = response.choices[0].text;
    try {
      eval(generatedCode);  // Extremely dangerous
    } catch (error) {
      console.error('Code execution failed:', error);
    }
    
    return generatedCode;
  }
}

module.exports = LLMService;
