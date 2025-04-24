import {
  SageMakerRuntimeClient,
  InvokeEndpointCommand,
} from "@aws-sdk/client-sagemaker-runtime";
import { fetchAuthSession } from "aws-amplify/auth";

type TinyLlmaaInput = {
  inputs: string;
  parameters: {
    max_new_tokens: number; // Maximum number of tokens to generate
    do_sample: boolean; // Whether to use sampling; set to False for deterministic output
    temperature: number; // Controls randomness (higher is more random)
    top_p: number; // Nucleus sampling (top-p); consider with temperature
    top_k: number; // Top-k sampling
    repetition_penalty: number; // Penalize repeated tokens
  };
};

const SAGEMAKER_ENDPOINT_NAME =
  "arn:aws:sagemaker:us-west-1:269700584262:endpoint/huggingface-pytorch-tgi-inference-2025-04-24-00-25-01-917";

export async function invokeSageMakerEndpoint(inputData: TinyLlmaaInput) {
  try {
    // Get AWS credentials from Amplify Auth using the new approach
    const { credentials } = await fetchAuthSession();

    // Initialize the SageMaker Runtime client
    const client = new SageMakerRuntimeClient({
      region: "us-west-1", // Replace with your AWS region
      credentials: credentials,
    });

    // Prepare input data according to your model's requirements
    // This example assumes JSON input, but adjust as needed
    const input = JSON.stringify(inputData);

    // Create the command to invoke the endpoint
    const command = new InvokeEndpointCommand({
      EndpointName: SAGEMAKER_ENDPOINT_NAME,
      ContentType: "application/json",
      Body: Buffer.from(input),
    });

    // Invoke the endpoint
    const response = await client.send(command);

    // Parse the response
    const responseBody = JSON.parse(Buffer.from(response.Body).toString());
    return responseBody;
  } catch (error) {
    console.error("Error invoking SageMaker endpoint:", error);
    throw error;
  }
}
