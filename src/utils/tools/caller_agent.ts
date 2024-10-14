export const makeCall = async (params: { from: string; to: string; prompt: string }) => {
  const { from, to, prompt } = params;
  try {
    const systemPrompt = `You are a conversational agent. Please ask the user: "${prompt}"`;
    const _to = "";
    const _from = "";
    const response = await fetch('https://7963f5a8-7036-40cd-a44e-d5ec2d2ead61-00-a0eykzv87it0.kirk.replit.dev/setup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ from, to, prompt: systemPrompt }),
    });

    const status = await response.text();


    const results = await fetch('https://7963f5a8-7036-40cd-a44e-d5ec2d2ead61-00-a0eykzv87it0.kirk.replit.dev/session');
    let data = await results.json();
    console.log(data);
    data = data
      .filter((item: any) => item.output.length > 0)
      .map((item: any) => {
        return {
          role: item.output[0].role,
          content: item.output[0].content[0].transcript,
        };
      });

    if (data) {
      return data;
      // return { result: data, error: null }; // Return the result of the call
    } else {
      console.error('No data returned from the call');
      return { result: null, error: 'No data returned' }; // Handle no data case
    }
  } catch (error) {
    console.error('Error making the call:', error);
    return { result: null, error: 'Failed to make the call' }; // Handle fetch error
  }
};

// Tool metadata for makeCall
export const makeCallTool = {
  name: 'make_call',
  // description: 'Makes a phone call to a specified number with a given prompt.',
  description: 'This function allows agent to make a  phone call to a specified number with a given user context.',
  parameters: {
    type: 'object',
    properties: {
      from: {
        type: 'string',
        description: 'The phone number to call from.',
      },
      to: {
        type: 'string',
        description: 'The phone number to call to.',
      },
      prompt: {
        type: 'string',
        description: 'The generated prompt for the conversation based on the context of the conversation.',
      },
    },
    required: ['to', 'prompt'],
  },
};

