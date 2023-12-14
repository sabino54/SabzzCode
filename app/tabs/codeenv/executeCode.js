// executeCode.js
import { encode as base64Encode, decode as base64decode } from 'base-64';

export const executeCode = async (pythonCode) => {
    const submissionUrl = 'https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=true&fields=*';
    const submissionOptions = {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': 'e2f0c1c38fmsh9b745ce6fff2777p1e56eajsne60d2394d9e3',
        'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
      },
      body: JSON.stringify({
        language_id: 70,
        source_code: base64Encode(pythonCode),
        stdin: base64Encode("'ffwfwiehfwihfiwhfCwheoifhwefhweoefdqwdqHdqdqohdIdhqoidhqoiCwjqiojdAdjqwodGjfijweofO'"),
        base64_encoded: true 
      })      
    };

    try {
      const submissionResponse = await fetch(submissionUrl, submissionOptions);
      const submissionResult = await submissionResponse.json();
      if (submissionResult && submissionResult.token) {
        // We'll now enter a loop and periodically check for completion
        let result = null;
        while (true) {
          result = await checkResult(submissionResult.token);
          if (result.status.id !== 1 && result.status.id !== 2) { // Status 1 and 2 are "In Queue" and "Processing"
            break; // Exit the loop if the status is anything other than "In Queue" or "Processing"
          }
          await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for 1 second before checking again
        }
        return result; // This will be the final result object with the output
      }
    } catch (error) {
      console.error(error);
      return null; // Handle the error as needed
    }
};


  const checkResult = async (token) => {
    const url = `https://judge0-ce.p.rapidapi.com/submissions/${token}?base64_encoded=true`;
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'e2f0c1c38fmsh9b745ce6fff2777p1e56eajsne60d2394d9e3',
        'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
      }
    };
  
    try {
      const response = await fetch(url, options);
      const result = await response.json();
      console.log(result);
      return result;
      // Process the result as needed
    } catch (error) {
      console.error(error);
    }
  };