const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const generateProblems = async (
  fileContent,
  problemCount,
  questionType,
  difficultyLevel
) => {
  const prompt = `
    다음 내용을 바탕으로 ${problemCount}개의 ${questionType} 문제를 생성해주고.
    난이도는 ${difficultyLevel}로 해줘.
    각 문제는 4개의 선택지를 포함하고, 정답은 보기의 번호 (A, B, C, D)로 제공해줘.
    
    내용:
    ${fileContent}
    
    각 문제는 다음 형식으로 JSON 배열로 응답해:
    [
      {
        "question": "문제 내용",
        "options": ["보기 A", "보기 B", "보기 C", "보기 D"],
        "answer": "B"
      }
    ]
  `;

  const completion = await openai.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "gpt-3.5-turbo",
  });

  return JSON.parse(completion.choices[0].message.content);
};

module.exports = {
  generateProblems,
};
