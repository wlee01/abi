import { ethers, Signature } from 'ethers';
import { abi, address as contractAddress } from '../abis/DataType.json'; // Todo: 배포먼저 실행해주세요. (npm run deploy)
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env' });

const provider = new ethers.JsonRpcProvider('HTTP://127.0.0.1:7545'); // Todo: 가나슈의 RPC SERVER 주소를 입력합니다.
const privateKey = process.env.PRIVATE_KEY || '';

export const checkNetworkInfo = async () => {
  return await provider.getNetwork();
};
/*
    위의 코드들은 지우지 않습니다.
    
    getSigner와 getContract는 다음의 데이터를 이용하여 구현합니다.

    provider : JSON-RPC API를 통해 블록체인과 통신하는 역할자
    abi : DataType Contract의 ABI 데이터
    contractAddress : DataType Contract의 Address
    privateKey : .env 파일에 설정된 가나슈 계정의 프라이빗 키
*/

export const getSigner = () => {
  return new ethers.Wallet(privateKey, provider);

  // Todo: privateKey를 이용하여 Wallet 인스턴스를 리턴합니다. - new ethers.Wallet(프라이빗 키, provider)

};

export const getContract = () => {
  const signer = getSigner();
  return new ethers.Contract(contractAddress, abi, signer);
  // Todo: DataType Contract 인스턴스를 리턴합니다. - new ethers.Contract(컨트랙트 주소, ABI, signer)
  // 이 후에 구현하는 컨트랙트 호출은 구현한 getContract를 사용합니다.
  return;
};

export const positiveNumber = async () => {
  return await getContract()!.positiveNumber();
  // Todo: positiveNumber 함수는 컨트랙트의 positiveNumber 값을 리턴해야 합니다.
  return;
};

export const negativeNumber = async () => {
  // Todo: negativeNumber 함수는 컨트랙트의 negativeNumber 값을 리턴해야 합니다.
  return await getContract()!.negativeNumber();
  return;
};

export const isActive = async () => {
  return await getContract()!.isActive();
  // Todo: isActive 함수는 컨트랙트의 isActive 값을 리턴해야 합니다.
  return;
};

export const wallet = async () => {
  return await getContract()!.wallet();

  function getWallet() {
    return new ethers.Wallet(privateKey, provider);

  }
  // Todo: wallet 함수는 컨트랙트의 wallet 값을 리턴해야 합니다,
  return;
};

export const recipient = async () => {
  return await getContract()!.recipient();
  // Todo: recipient 함수는 컨트랙트를 배포한 주소를 리턴해야 합니다.
  return;
};

export const fixedData = async () => {
  return await getContract()!.fixedData();
  // Todo: fixedData 함수는 컨트랙트의 fixedData 값을 리턴해야 합니다.
  return;
};

export const dynamicData = async () => {
  return await getContract()!.dynamicData();
  // Todo: fixedData 함수는 컨트랙트의 dynamicData 값을 리턴해야 합니다.
  return;
};

export const currentState = async () => {
  return await getContract()!.currentState();
  // Todo: currentState 함수는 컨트랙트의 currentState 값을 리턴해야 합니다.
  return;
};

export const getDynamicDataLength = async () => {
  return await getContract()!.getDynamicDataLength();
  // Todo: getDynamicDataLength 함수는 컨트랙트의 getDynamicDataLength 값을 리턴해야 합니다.
  return;
};

export const getDetails = async () => {
  return await getContract()!.getDetails();
  // Todo: getDetails 함수는 컨트랙트의 getDetails 값을 리턴해야 합니다.
};

export const setPositiveNumber = async (_positive: number) => {
  return await getContract()!.setPositiveNumber(_positive);
  // Todo: setPositiveNumber 함수의 인자를 사용해 컨트랙트의 setPositiveNumber를 실행시켜 리턴해야 합니다.
  return;
};

export const setNegativeNumber = async (_negative: number) => {
  return await getContract()!.setNegativeNumber(_negative);
  // Todo: setNegativeNumber 함수의 인자를 사용해 컨트랙트의 setNegativeNumber를 실행시켜 리턴해야 합니다.
  return;
};

export const toggleActive = async () => {
  return await getContract()!.toggleActive();
  // Todo: 컨트랙트의 toggleActive를 실행시켜 리턴해야 합니다.
  return;
};

export const setState = async (_newState: number) => {
  return await getContract()!.setState(_newState);
  // Todo: setState 함수의 인자를 사용해 컨트랙트의 setState를 실행시켜 리턴해야 합니다.
  return;
};

export const setWallet = async (address: string) => {
  return await getContract()!.setWallet(address);
  // Todo: setWallet 함수의 인자를 사용해 컨트랙트의 setWallet을 실행시켜 리턴해야 합니다.
  return;
};

export const setFixedData = async (_newFixedData: string) => {
  return await getContract()!.setFixedData(_newFixedData);
  // Todo: setFixedData 함수의 인자를 사용해 컨트랙트의 setFixedData을 실행시켜 리턴해야 합니다.
  return;
};

export const setDynamicData = async (_newDynamicData: string) => {
  return await getContract()!.setDynamicData(_newDynamicData);
  // Todo: setDynamicData 함수의 인자를 사용해 컨트랙트의 setDynamicData을 실행시켜 리턴해야 합니다.
  return;
};
