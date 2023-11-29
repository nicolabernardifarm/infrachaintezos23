// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

interface IToken {
    function isOwner(uint256) external view returns (bool);
}

contract FundDataNFT is ERC721{
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    mapping (uint256 => string) public metadataURI;
    mapping(uint256 => uint256) public parentFundNFTId;
    mapping(uint256 => uint) public mintDate;
    event NFTMinted(uint256 indexed _id);

    constructor() ERC721("FundDataNFT", "FDNFT") { }

    function mintNFT(address recipient, /*string memory tokenURI,*/ string calldata ipfsURI, uint256 parentId) external returns (uint256) {
        IToken fnft = IToken(0x19bB9eE5E2BBCF56efCf35a8e0e0b4cB46dA3266);
        require(fnft.isOwner(parentId), "FundDataNFT: caller is not the owner of parent FundNFT");
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _mint(recipient, newItemId);
        _setMetadata(newItemId, ipfsURI, parentId);
        emit NFTMinted(newItemId);
        return newItemId;
    }

    function _setMetadata(uint256 tokenId, string memory ipfsURI, uint256 parentId) internal {
        metadataURI[tokenId] = ipfsURI;
        parentFundNFTId[tokenId] = parentId;
        mintDate[tokenId] = block.timestamp;
    }

    function getMintDate(uint256 tokenId) external view returns (uint) {
        return mintDate[tokenId];
    }

    function getMetadataURI(uint256 tokenId) external view returns (string memory) {
        return metadataURI[tokenId];
    }

    function transferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public virtual override {
        //do nothing: do not let the token to be transferred
    }

    function getParentFundNFTId(uint256 tokenId) external view returns (uint256) {
        return parentFundNFTId[tokenId];
    }

    function getAllDataTokenIds(uint256 parentId) external view returns (string memory) {
        string memory dataNFTs = '';
        for (uint256 i = 0; i <= _tokenIds.current(); i++) {
            if (parentFundNFTId[i] == parentId) {
                dataNFTs = string.concat(dataNFTs, Strings.toString(i), ',');
            }
        }
        return dataNFTs;
    }
}