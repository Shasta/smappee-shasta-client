const Axios = require('axios');
const config = require('config');


const login = async () => {
  const axios = Axios.create({
    baseURL: config.get('smappee_hub'),
    timeout: 2000,
    headers: {'Content-Type': 'application/json'}
  });

  const login_endpoint = '/gateway/apipublic/logon';
  const post_body = 'admin'
  try {
    await axios.post(login_endpoint, post_body);
  } catch (error) {
    console.log('smappee:api:login:error', error);
    throw new Error('login-error');
  }
}

const readPower = async () => {
  let response;
  await login();

  const axios = Axios.create({
    baseURL: config.get('smappee_hub'),
    timeout: 2000,
    headers: {'Content-Type': 'application/json'}
  });

  const kwh_endpoint = '/gateway/apipublic/reportInstantaneousValues';

  try {
    response = await axios.get(kwh_endpoint);
  } catch (error) {
    console.log('smappee:api:read:error', error);
    throw new Error('read-power-bad-request')
  }
  if (!response) {
    throw new Error('read-power-client-error')
  }

  let body = response.data.report;
  
  let ini = body.search(" activePower=");

  body = body.substring(ini + 12, body.length);

  let b2 = body.substring(1,body.search("W"));

  let linea1 =+ parseInt(b2);

  ini = body.search(" activePower=");

  body = body.substring(ini+12,body.length);

  b2 = body.substring(1,body.search("W"));

  let linea2 =+ parseInt(b2);

  ini = body.search(" activePower=");

  body = body.substring(ini+12,body.length);

  b2 = body.substring(1,body.search("W"));

  let linea3 =+ parseInt(b2);

  if (linea1 <0) linea1=0;

  if (linea2 <0) linea2=0;

  if (linea3 <0) linea3=0;

  const consumo = linea1 + linea2 + linea3;

  console.log('consumo actual', consumo);

  if (consumo < 27) consumo = 0;


  return consumo;

}

module.exports = {
  login,
  readPower
}