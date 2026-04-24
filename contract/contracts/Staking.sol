// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IERC20 {
    function transferFrom(address from, address to, uint amount) external returns (bool);
    function transfer(address to, uint amount) external returns (bool);
}

contract Staking {
    IERC20 public token;

    mapping(address => uint256) public balances;
    uint256 public totalStaked;

    event Staked(address indexed user, uint256 amount);
    event Withdrawn(address indexed user, uint256 amount);

    constructor(address _token) {
        token = IERC20(_token);
    }

    function stake(uint256 amount) external {
        require(amount > 0, "Amount = 0");

        token.transferFrom(msg.sender, address(this), amount);

        balances[msg.sender] += amount;
        totalStaked += amount;

        emit Staked(msg.sender, amount);
    }

    function withdraw(uint256 amount) external {
        require(balances[msg.sender] >= amount, "Not enough");

        balances[msg.sender] -= amount;
        totalStaked -= amount;

        token.transfer(msg.sender, amount);

        emit Withdrawn(msg.sender, amount);
    }
}