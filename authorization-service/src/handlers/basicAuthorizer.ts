import { ALLOW, DENY, UNAUTHORIZED, TOKEN, TOKEN_ERROR_MESSAGE } from '../constants';

const basicAuthorizer = (event: any, _, cb) => {
  console.log('Authorizer event', JSON.stringify(event, null, 2));

  const token = event.authorizationToken;

  if (event.type !== TOKEN || !token) {
    cb(UNAUTHORIZED, TOKEN_ERROR_MESSAGE);
  }

  const [userName, password] = decodeToken(token);
  console.log(`User name: ${userName} Password: ${password}`);
  const isValid = userName && password && process.env[userName] === password;

  const effect = isValid ? ALLOW : DENY;
  const policy = generatePolicy(userName, effect, event.methodArn);

  return cb(null, policy);
};

const generatePolicy = (principalId: string, effect: string, resource: string) => {
  const authResponse = {
    principalId,
    policyDocument: {
      Version: '2012-10-17',
      Statement: [
        {
          Action: 'execute-api:Invoke',
          Effect: effect,
          Resource: resource,
        },
      ],
    },
  };

  return authResponse;
};

const decodeToken = (token: string) => {
  const partToDecode = token.split(' ')[1];
  const string = Buffer.from(partToDecode, 'base64').toString('utf-8');
  console.log(`Token decoded: ${string}`);
  const [userName, password] = string.split(':');

  return [userName, password];
};

export { basicAuthorizer };
