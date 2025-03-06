import { expect } from 'chai';
import { ethers } from 'ethers';
import {
  checkNetworkInfo,
  getContract,
  getSigner,
  positiveNumber,
  negativeNumber,
  isActive,
  wallet,
  recipient,
  fixedData,
  dynamicData,
  currentState,
  setPositiveNumber,
  setNegativeNumber,
  toggleActive,
  setState,
  setWallet,
  setFixedData,
  setDynamicData,
  getDynamicDataLength,
  getDetails,
} from '../web3/ethers';

describe('Ethers 기능 검사', function () {
  let isSetWalletExcuted = false;

  it('가나슈 네트워크에 정상적으로 연결이 되어야 합니다.', async function () {
    const network = await checkNetworkInfo();
    expect(network).to.have.property('chainId');
  });

  it('getWallet은 월렛(서명자)를 리턴해야 합니다.', async function () {
    const wallet = getSigner();
    expect(wallet).to.be.instanceOf(ethers.Wallet);
  });

  it('getContract는 컨트랙트를 리턴해야 합니다.', async function () {
    const contract = getContract();
    expect(contract).to.be.instanceOf(ethers.Contract);
  });

  describe('getter 함수 기능 검사', function () {
    it('컨트랙트의 positiveNumber 호출 시 상태변수 positiveNumber의 값을 리턴해야 합니다.', async function () {
      const value = await positiveNumber();
      expect(typeof value).to.equal('bigint');
    });

    it('컨트랙트의 negativeNumber 호출 시 상태변수 negativeNumber의 값을 리턴해야 합니다.', async function () {
      const value = await negativeNumber();
      expect(typeof value).to.equal('bigint');
    });

    it('컨트랙트의 isActive 호출 시 상태변수 isActive의 값을 리턴해야 합니다.', async function () {
      const value = await isActive();
      expect(typeof value).to.equal('boolean');
    });

    it('컨트랙트의 wallet 호출 시 상태변수 wallet의 값을 리턴해야 합니다.', async function () {
      const value = await wallet();
      const isAddress = ethers.isAddress(value);
      expect(isAddress).to.equal(true);
    });

    it('컨트랙트의 wallet 호출 시 상태변수 wallet의 값을 리턴해야 합니다.', async function () {
      const value = await wallet();
      const isAddress = ethers.isAddress(value);
      expect(isAddress).to.equal(true);
    });

    it('컨트랙트의 recipient 호출 시 컨트랙트를 배포한 주소의 값을 리턴해야 합니다.', async function () {
      const value = (await recipient()).toUpperCase();
      const owner = getSigner().address.toUpperCase();

      expect(value === owner).to.equal(true);
    });

    it('컨트랙트의 fixedData 호출 시 상태변수 fixedData의 값을 리턴해야 합니다.', async function () {
      const value = await fixedData();
      expect(value).to.be.a('string');
      expect(value.length).to.equal(66);
    });

    it('컨트랙트의 dynamicData 호출 시 상태변수 dynamicData의 값을 리턴해야 합니다.', async function () {
      const value = await dynamicData();
      expect(value).to.be.a('string');
    });

    it('컨트랙트의 currentState 호출 시 상태변수 currentState의 값을 리턴해야 합니다.', async function () {
      const value = await currentState();
      expect(typeof value).to.equal('bigint');
    });

    it('컨트랙트의 currentState 호출 시 상태변수 currentState의 값을 리턴해야 합니다.', async function () {
      const value = await currentState();
      expect(typeof value).to.equal('bigint');
    });

    it('컨트랙트의 getDynamicDataLength 호출 시 상태변수 dynamicData의 길이 값을 리턴해야 합니다.', async function () {
      const value = await getDynamicDataLength();
      const dynamicDataHex = await dynamicData();
      const bytesData = ethers.getBytes(dynamicDataHex);
      expect(Number(value)).to.equal(bytesData.length);
    });

    it('컨트랙트의 getDetails 호출 시 상태변수 (positiveNumber, negativeNumber, isActive, wallet, recipient, fixedData, dynamicData, currentState)의 값을 리턴해야 합니다.', async function () {
      const value = await getDetails();
      const expectValue = [
        await positiveNumber(),
        await negativeNumber(),
        await isActive(),
        await wallet(),
        await recipient(),
        await fixedData(),
        await dynamicData(),
        await currentState(),
      ];
      expect(value).to.deep.equal(expectValue);
    });
  });

  describe('setter 함수 기능 검사', function () {
    it('컨트랙트의 setPositiveNumber 호출 시 상태변수 positiveNumber의 값이 변경되어야 합니다.', async function () {
      this.retries(3);

      const prevPositiveNumber = await positiveNumber();
      const addValue = Number(prevPositiveNumber) + 1;

      await setPositiveNumber(addValue).then((tx) => tx.wait());
      const newPositiveNumber = await positiveNumber();

      expect(prevPositiveNumber).to.not.equal(newPositiveNumber);
    });

    it('컨트랙트의 setNegativeNumber 호출 시 상태변수 negativeNumber의 값이 변경되어야 합니다.', async function () {
      this.retries(3);

      const prevValue = await negativeNumber();
      const subValue = Number(prevValue) - 1;

      await setNegativeNumber(subValue).then((tx) => tx.wait());
      const newValue = await negativeNumber();

      expect(prevValue).to.not.equal(newValue);
    });

    it('컨트랙트의 toggleActive 호출 시 상태변수 isActive의 값이 변경되어야 합니다.', async function () {
      this.retries(3);

      const prevValue = await isActive();

      await toggleActive().then((tx) => tx.wait());
      const newValue = await isActive();

      expect(prevValue).to.not.equal(newValue);
    });

    it('컨트랙트의 setState 호출 시 상태변수 currentState의 값이 변경되어야 합니다.', async function () {
      this.retries(3);

      const stateArr = [0, 1, 2];
      const prevState = Number(await getContract().currentState());
      const selectState = stateArr.filter((item) => item !== prevState)[0];

      await setState(selectState).then((tx) => tx.wait());
      const newState = Number(await getContract().currentState());

      expect(prevState).to.not.equal(newState);
    });

    it('컨트랙트의 setWallet 호출 시 상태변수 wallet과 recipient의 값이 변경되어야 합니다.', async function () {
      this.retries(3);

      const newWallet = ethers.Wallet.createRandom();

      const prevWallet = await wallet();
      const prevRecipient = await recipient();

      await setWallet(newWallet.address).then((tx) => tx.wait());
      const newRecipient = await recipient();

      expect([prevWallet, prevRecipient]).to.not.deep.equal([
        newRecipient,
        newRecipient,
      ]);

      try {
        await setWallet(getSigner().address).then((tx) => tx.wait());
      } catch (err) {
        await setWallet(getSigner().address).then((tx) => tx.wait());
      }
    });

    it('컨트랙트의 setFixedData 호출 시 상태변수 fixedData의 값이 변경되어야 합니다.', async function () {
      this.retries(3);

      const prevValue = await fixedData();
      const randomByte32 = ethers.hexlify(ethers.randomBytes(32));

      const tx = await setFixedData(randomByte32);
      await tx.wait();

      const newValue = await fixedData();
      expect(prevValue).to.not.equal(newValue);
    });

    it('컨트랙트의 setDynamicData 호출 시 상태변수 dynamicData의 값이 변경되어야 합니다.', async function () {
      this.retries(3);

      const prevValue = await dynamicData();
      const randomByte32 = ethers.hexlify(ethers.randomBytes(32));

      const tx = await setDynamicData(randomByte32);
      await tx.wait();

      const newValue = await dynamicData();
      expect(prevValue).to.not.equal(newValue);
    });
  });
});
