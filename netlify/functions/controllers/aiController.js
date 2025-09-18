// const  { Configuration, OpenAIApi } = require('openai');
// const OpenAI = require('openai');
// const config = new Configuration({
//     apiKey: process.env.OPENAI_API_KEY
// });

// const openai = new OpenAI(process.env.OPENAI_API_KEY);


const Groq = require('groq-sdk');

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const aiExplain = async (req, res) => {
    const {prompt} = req.body;

    console.log(prompt,"check", req.body)
    
    try{
        const response = await groq.chat.completions.create({
            model: "llama-3.3-70b-versatile", 
            messages: [
              {
                role: "system",
                content: `
                  You will explain the chess best moves according to the given FEN.
                  Return a JSON object **only** (no extra text) in the exact structure below:
                  {
                    "strategic_advantages": ["..."],    // up to 5 items in the list, each a brief phrase, e.g. "control of the center", it might be less than 5
                    "response": "..."                   // a single brief, informative paragraph
                  }
                `
              },
              {
                role: "user",
                content: prompt
              }
            ],
            max_completion_tokens: 150,
            temperature: 0,
            response_format: { type: "json_object" }

          });
        
        res.status(200).json(response.choices[0].message.content);
    } catch(err){
        res.status(400).json({error: err.message});
    }
}




// export functions
module.exports = { aiExplain };