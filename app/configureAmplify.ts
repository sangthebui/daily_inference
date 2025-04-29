import { Amplify } from "aws-amplify";
// import { parseAmplifyConfig } from "aws-amplify/utils";
import outputs from "@/amplify_outputs.json";

//const amplifyConfig = parseAmplifyConfig(outputs);

Amplify.configure(outputs);

// Add existing resource to the existing configuration.
// Amplify.configure({
//   ...amplifyConfig,
//   API: {
//     ...amplifyConfig.API,
//     REST: {
//       ...amplifyConfig.API?.REST,
//       sagemakerTest: {
//         endpoint:
//           "https://54ogru7qte.execute-api.us-west-1.amazonaws.com/default/myTestFunction",
//         region: "us-west-1", // Optional
//       },
//     },
//   },
// });
