
import { ResourcesConfig } from 'aws-amplify';

const awsconfig: ResourcesConfig = {
  Auth: {
    Cognito: {
    //   region: "us-east-1",
      userPoolId: "us-east-1_24gtcmr6M",
      userPoolClientId: "3lhpljval4f8eman4qa01g0hoi",
      loginWith: {
        oauth: {
            domain: 'https://us-east-124gtcmr6m.auth.us-east-1.amazoncognito.com',
            scopes: ["email", "openid", "profile"],
            redirectSignIn: ["http://localhost:4200/"],
            redirectSignOut: ["http://localhost:4200/"],
            responseType: "code"
        }
      }
    }

  }
};


export default awsconfig;
