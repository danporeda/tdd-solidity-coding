// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract HelloWorld {

    bytes32 text;
    address public owner;

    constructor() {
        text = bytes32("Hello World!");
        owner = msg.sender;
    }

    function helloWorld() external view returns(bytes32) {
        return text;
    }

    function transferOwnership(address newOwner) external {
        require(msg.sender == owner, "You must be the owner to transfer");
        owner = newOwner;
    }

    function setText(bytes32 newText) external {
        require(msg.sender == owner, "You must be the owner to change text");
        text = newText;
    }

}