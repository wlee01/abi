// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract DataType {
    // 1. 정수형 (Integer)
    uint256 public positiveNumber = 100; // 부호 없는 정수
    int256 public negativeNumber = -50; // 부호 있는 정수

    // 2. 불리언 (Boolean)
    bool public isActive = true;

    // 3. 주소 (Address)
    address public wallet = 0x0000000000000000000000000000000000000000;
    address payable public recipient;

    // 4. 바이트 (Bytes)
    bytes32 public fixedData = "0xabcdef123456"; // 고정 크기 바이트 (32바이트)
    bytes public dynamicData; // 가변 크기 바이트

    // 5. 열거형 (Enum)
    enum State {
        Created,
        Active,
        Inactive
    }
    State public currentState = State.Active;

    // 컨트랙트 배포 시 초기값 설정
    constructor(address _recipient) {
        recipient = payable(_recipient);
    }

    // 정수 설정 함수
    function setPositiveNumber(uint256 _positive) public {
        positiveNumber = _positive;
    }
    function setNegativeNumber(int256 _negative) public {
        negativeNumber = _negative;
    }

    // 불리언 값 변경 함수
    function toggleActive() public {
        isActive = !isActive;
    }

    // 상태 변경 함수
    function setState(State _newState) public {
        currentState = _newState;
    }

    // 주소 변경 함수
    function setWallet(address _newWallet) public {
        wallet = _newWallet;
        recipient = payable(_newWallet);
    }

    // 고정 크기 바이트 (bytes32) 변경 함수
    function setFixedData(bytes32 _newFixedData) public {
        fixedData = _newFixedData;
    }

    // 가변 크기 바이트 (bytes) 설정 함수
    function setDynamicData(bytes calldata _newDynamicData) public {
        dynamicData = _newDynamicData;
    }

    // 바이트 데이터 길이 반환 함수
    function getDynamicDataLength() public view returns (uint256) {
        return dynamicData.length;
    }

    // 바이트 데이터 변환 (bytes -> string)
    function getDynamicDataAsString() public view returns (string memory) {
        return string(dynamicData);
    }

    // 데이터 조회 함수 (바이트 포함)
    function getDetails()
        public
        view
        returns (
            uint256,
            int256,
            bool,
            address,
            address,
            bytes32,
            bytes memory,
            State
        )
    {
        return (
            positiveNumber,
            negativeNumber,
            isActive,
            wallet,
            recipient,
            fixedData,
            dynamicData,
            currentState
        );
    }
}
