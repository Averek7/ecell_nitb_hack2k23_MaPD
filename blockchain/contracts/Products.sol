// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.9;

contract Products {
    mapping(uint256 => string) public products;
    uint256 public maxProductID;

    constructor() {
        maxProductID = 0;
    }

    function addProduct(uint256 _id, string memory _ipfsLink) public {
        bytes memory templink = bytes(_ipfsLink);
        require(templink.length > 0, "IPFS Link can't be empty");
        require(_id >= 0, "ID is required");
        products[_id] = _ipfsLink;
        maxProductID = maxProductID + 1;
    }

    function updateProduct(uint256 _id, string memory _ipfsLink) public {
        bytes memory templink = bytes(_ipfsLink);
        require(templink.length > 0, "IPFS Link can't be empty");
        require(_id < maxProductID, "Product ID not found");
        products[_id] = _ipfsLink;
    }

    function getProductDetails(
        uint256 _id
    ) external view returns (string memory) {
        require(_id <= maxProductID, "Product ID not found");
        return products[_id];
    }

    function getProductId() external view returns (uint256) {
        return maxProductID;
    }
}
