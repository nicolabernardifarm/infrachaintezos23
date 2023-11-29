// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract FundNFT is ERC721 {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    mapping (uint256 => string) public metadataURI;

    event NFTMinted(uint256 indexed _id);

    constructor() ERC721("FundNFT", "FNFT") {}

    modifier onlyOwner(uint256 tokenId) {
        require(ownerOf(tokenId) == msg.sender, "FundNFT: caller is not the owner");
        _;
    }

    function transferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public virtual override {
        //do nothing: do not let the token to be transferred
    }

    function mintNFT(address recipient, /*string memory tokenURI,*/ string calldata ipfsURI) external returns (uint256) {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _mint(recipient, newItemId);
        _setMetadata(newItemId, ipfsURI);
        emit NFTMinted(newItemId);
        return newItemId;
    }

    function _setMetadata(uint256 tokenId, string memory ipfsURI) internal {
        metadataURI[tokenId] = ipfsURI;
    }


    function isOwner(uint256 tokenId) external view returns (bool) {
        return ownerOf(tokenId) == msg.sender;
    }

    function getMetadataURI(uint256 tokenId) external view returns (string memory) {
        return metadataURI[tokenId];
    }
    

    //do not burn NFTs otherwise we'll lose history
}
