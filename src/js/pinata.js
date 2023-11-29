let jwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIxYmE1MTU5Yi1kNWM1LTQxMzgtYTVmZS03NzI1NDE1ZmVmM2QiLCJlbWFpbCI6ImJlcm5hcmRpLm5pY29sYTAwQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiI0ZGY5ZTJmZWFhZDhiYzIwZThmZCIsInNjb3BlZEtleVNlY3JldCI6IjIyNjY3MjEzZDg2ZGU3YzNiMzM5MjI3MTMyZjIyNDhkMjcyOTQxZGJlMWJjYmYyMTRhZjFjYzEzZWQwZDhlMjUiLCJpYXQiOjE2ODY4OTY5MDZ9.-iZUmapvu7aPFRFlWCk7rOAV42jhLpohqfrt9Sjj9n4";
let apiKey = "4df9e2feaad8bc20e8fd";
let secret = "22667213d86de7c3b339227132f2248d272941dbe1bcbf214af1cc13ed0d8e25";

let url = "https://api.pinata.cloud/pinning/pinJSONToIPFS";

let ipfs_url = "http://ipfs.io/ipfs/";

function uploadJsonToIpfs(obj){
    let hash="";
    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            let response = JSON.parse(this.responseText);
            console.log(response.IpfsHash);
            hash=response.IpfsHash;
        }
    };
    xhr.open("POST", url, false);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Authorization", "Bearer "+jwt);
    xhr.send(JSON.stringify({
        //"pinataOptions": {},
        "pinataContent": obj,
        //"pinataMetadata": {}
    }));
    return hash;
}

function downloadJsonFromIpfs(hash, functionToCall){
    let xhr = new XMLHttpRequest();
    let mdata = {};

    xhr.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            console.log(this.responseText);
            let response = JSON.parse(this.responseText);
            mdata = response;
            functionToCall(mdata);
        }
    }

    xhr.open("GET", ipfs_url+hash, false);
    xhr.send();
}