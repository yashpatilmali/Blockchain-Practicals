// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract EtherTransfer {

    address payable public owner;

    constructor() {
        owner = payable(msg.sender);
    }

    receive() external payable {}

    function getBalance()
        public
        view
        returns (uint256)
    {
        return address(this).balance;
    }

    function transferEther(
        address payable recipient,
        uint256 amount
    )
        public
    {
        require(
            msg.sender == owner,
            "Only owner can transfer Ether"
        );

        require(
            address(this).balance >= amount,
            "Insufficient contract balance"
        );

        (bool success, ) =
            recipient.call{value: amount}("");

        require(
            success,
            "Ether transfer failed"
        );
    }
}