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

    console.log(prompt,"check", req.body)//,typeof promptBody,req.body);
    
    try{
        const response = await groq.chat.completions.create({
            model: "llama-3.3-70b-versatile", // Ensure this model is available in Groq's offerings
            messages: [
              {
                role: "system",
                content: "You will explain the chess best moves according to the given FEN. This will be a JSON response."
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
      

        console.log(response.choices[0].message.content);
        // console.log(response.data);
        // console.log(response.data.choices[0].text);
        
        res.status(200).json(response.choices[0].message.content);
    } catch(err){
        res.status(400).json({error: err.message});
    }
}




// export functions
module.exports = { aiExplain };